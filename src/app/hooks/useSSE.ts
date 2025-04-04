// useSSE.ts
import { useEffect, useCallback, useState, useRef } from "react";
import { useDataStore, type StoreState } from "@store/dataStore";
import type {
    TimingStats,
    TimingAppData,
    WeatherData,
    TrackStatus,
    DriverList,
    RaceControlMessages,
    SessionInfo,
    SessionData,
    LapCount,
    TimingData,
    TeamRadio,
    CarData,
} from "@/types/state.type";

type DataChannel = {
    TimingStats: TimingStats;
    TimingAppData: TimingAppData;
    WeatherData: WeatherData;
    TrackStatus: TrackStatus;
    DriverList: DriverList;
    RaceControlMessages: RaceControlMessages;
    SessionInfo: SessionInfo;
    SessionData: SessionData;
    LapCount: LapCount;
    TimingData: TimingData;
    TeamRadio: TeamRadio;
    "CarData.z": CarData;
};

type ChannelKey = keyof DataChannel;

interface SSEEvent {
    channel: ChannelKey;
    payload: DataChannel[ChannelKey];
    eventId: number;
    timestamp: number;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
//const API_URL = "http://localhost:4000";
console.log("🌐 API URL:", API_URL);

export function useSSE() {
    const updateStore = useDataStore((state) => state.update);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [lastReceivedData, setLastReceivedData] = useState<string>("");
    const lastEventId = useRef<number>(0);
    const eventSourceRef = useRef<EventSource | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const connectionAttemptsRef = useRef<number>(0);

    const loadInitialState = useCallback(async () => {
        try {
            const url = `${API_URL}/latest-state`;
            console.log("🔄 Caricamento stato iniziale da:", url);
            const response = await fetch(url);
            console.log("📥 Risposta ricevuta:", response.status);
            const { data } = await response.json();

            if (!data) {
                throw new Error("Nessun dato ricevuto dal server");
            }

            Object.entries(data).forEach(([channel, payload]) => {
                if (payload && typeof payload === "object") {
                    updateStore({
                        [channel]: {
                            ...payload,
                            _timestamp: Date.now(),
                            _source: "initial_load",
                        },
                    });
                }
            });

            setIsInitialized(true);
            console.log("✅ Stato iniziale caricato");
        } catch (error) {
            console.error(
                "❌ Errore nel caricamento dello stato iniziale:",
                error
            );
            throw error;
        }
    }, [updateStore]);

    const processSSEData = useCallback(
        (event: SSEEvent) => {
            console.log(
                "📥 Evento SSE ricevuto:",
                JSON.stringify(event, null, 2)
            );

            const { channel, payload, eventId, timestamp } = event;

            if (!channel || !payload) {
                console.warn("⚠️ Formato dati non valido:", event);
                return;
            }

            if (eventId <= lastEventId.current) {
                console.log(
                    `🔄 Dato ignorato (${channel}): ID evento obsoleto`
                );
                return;
            }

            lastEventId.current = eventId;

            // Aggiorna lo store con i nuovi dati
            if (payload && typeof payload === "object") {
                updateStore({
                    [channel]: {
                        ...payload,
                        _timestamp: timestamp,
                        _source: "sse_update",
                    },
                });
            }

            setLastReceivedData(JSON.stringify(payload));
        },
        [updateStore]
    );

    const fetchMissingData = useCallback(async () => {
        if (lastEventId.current === 0) return;

        try {
            console.log("🔍 Recupero dati mancanti...");
            const response = await fetch(
                `${API_URL}/missing-data?after=${lastEventId.current}`
            );
            const missingData = await response.json();

            if (missingData.length > 0) {
                console.log(`📦 Trovati ${missingData.length} eventi mancanti`);
                missingData
                    .sort((a: SSEEvent, b: SSEEvent) => a.eventId - b.eventId)
                    .forEach(processSSEData);
            }
        } catch (error) {
            console.error("❌ Errore nel recupero dei dati mancanti:", error);
        }
    }, [processSSEData]);

    const setupEventSource = useCallback(() => {
        if (eventSourceRef.current) {
            console.log("🔌 Chiusura connessione SSE esistente");
            eventSourceRef.current.close();
        }

        connectionAttemptsRef.current++;
        console.log(
            `🔄 Tentativo di connessione #${connectionAttemptsRef.current}`
        );

        const eventSource = new EventSource(`${API_URL}/events`, {
            withCredentials: true,
        });

        eventSource.onopen = () => {
            console.log("✅ Connessione SSE stabilita");
            setIsConnected(true);
            connectionAttemptsRef.current = 0;
            if (isInitialized) {
                fetchMissingData();
            }
        };

        eventSource.onmessage = (event: MessageEvent) => {
            try {
                console.log(
                    "📥 Messaggio SSE ricevuto:",
                    event.data.substring(0, 100) + "..."
                );
                const data = JSON.parse(event.data);

                // Gestione speciale per CarData.z e Position.z
                if (
                    data.channel === "CarData.z" ||
                    data.channel === "Position.z"
                ) {
                    console.log(
                        `🔍 Dati speciali ricevuti per il canale ${data.channel}`
                    );

                    // Se il payload ha una proprietà decoded, potrebbe essere binario
                    if (data.payload && data.payload.decoded) {
                        try {
                            // Converti la stringa binaria in un array di byte
                            const binaryString = data.payload.decoded;
                            const bytes = new Uint8Array(binaryString.length);
                            for (let i = 0; i < binaryString.length; i++) {
                                bytes[i] = binaryString.charCodeAt(i);
                            }

                            // Crea un oggetto DataView per leggere i dati binari
                            const dataView = new DataView(bytes.buffer);

                            // Leggi i dati in base al tipo di canale
                            let decodedData = {};
                            if (data.channel === "CarData.z") {
                                // Esempio di decodifica per CarData.z
                                decodedData = {
                                    speed: dataView.getFloat32(0, true),
                                    throttle: dataView.getFloat32(4, true),
                                    brake: dataView.getFloat32(8, true),
                                    gear: dataView.getInt8(12),
                                    // Aggiungi altri campi in base alla struttura dei dati
                                };
                            } else if (data.channel === "Position.z") {
                                // Esempio di decodifica per Position.z
                                decodedData = {
                                    x: dataView.getFloat32(0, true),
                                    y: dataView.getFloat32(4, true),
                                    z: dataView.getFloat32(8, true),
                                    // Aggiungi altri campi in base alla struttura dei dati
                                };
                            }

                            console.log(
                                `✅ Dati decodificati per ${data.channel}:`,
                                decodedData
                            );

                            // Sostituisci il payload con i dati decodificati
                            data.payload = decodedData;
                        } catch (e) {
                            console.error(
                                `❌ Errore nella decodifica dei dati per ${data.channel}:`,
                                e
                            );
                            // Se la decodifica fallisce, mantieni il valore originale
                        }
                    }
                }

                processSSEData(data);
            } catch (error) {
                console.error("❌ Errore nel parsing dei dati SSE:", error);
            }
        };

        // Aggiungiamo un handler per i messaggi di ping
        eventSource.addEventListener("ping", () => {
            console.log("🔄 Ping ricevuto dal server");
        });

        // Aggiungiamo un handler per i messaggi di heartbeat
        eventSource.addEventListener("heartbeat", () => {
            console.log("💓 Heartbeat ricevuto dal server");
        });

        eventSource.onerror = (error) => {
            console.error("❌ Errore nella connessione SSE:", error);
            setIsConnected(false);
            eventSource.close();

            // Backoff esponenziale per i tentativi di riconnessione
            const delay = Math.min(
                1000 * Math.pow(2, connectionAttemptsRef.current),
                30000
            );
            console.log(`🔄 Riconnessione tra ${delay / 1000} secondi...`);

            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }

            reconnectTimeoutRef.current = setTimeout(setupEventSource, delay);
        };

        eventSourceRef.current = eventSource;
    }, [fetchMissingData, processSSEData, isInitialized]);

    const cleanupStore = useCallback(() => {
        const currentState = useDataStore.getState();
        const threshold = Date.now() - 5 * 60 * 1000; // 5 minuti

        const cleanedState = Object.entries(currentState).reduce<
            Partial<StoreState>
        >((acc, [key, value]) => {
            if (key === "lastUpdateTime" || key === "update") return acc;
            if (
                value &&
                typeof value === "object" &&
                "_timestamp" in value &&
                value._timestamp < threshold
            ) {
                console.log(`🧹 Pulizia dati obsoleti per: ${key}`);
                return { ...acc, [key]: null };
            }
            return { ...acc, [key]: value };
        }, {});

        updateStore(cleanedState);
    }, [updateStore]);

    // Inizializzazione
    useEffect(() => {
        console.log("🚀 Inizializzazione SSE...");
        loadInitialState()
            .then(setupEventSource)
            .catch((error) => {
                console.error("❌ Errore durante l'inizializzazione:", error);
            });

        return () => {
            console.log("🔌 Pulizia connessione SSE");
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, [loadInitialState, setupEventSource]);

    // Polling di sicurezza
    useEffect(() => {
        const pollInterval = setInterval(() => {
            if (isConnected && isInitialized) {
                console.log("🔄 Polling di sicurezza...");
                fetchMissingData();
            }
        }, 10000);

        return () => clearInterval(pollInterval);
    }, [isConnected, isInitialized, fetchMissingData]);

    // Cleanup periodico
    useEffect(() => {
        const cleanupInterval = setInterval(() => {
            console.log("🧹 Esecuzione cleanup periodico...");
            cleanupStore();
        }, 1000); // Ogni minuto

        return () => clearInterval(cleanupInterval);
    }, [cleanupStore]);

    const refreshData = useCallback(() => {
        console.log("🔄 Aggiornamento dati forzato");
        if (isConnected) {
            fetchMissingData();
        } else {
            loadInitialState();
        }
    }, [isConnected, fetchMissingData, loadInitialState]);

    return {
        isConnected,
        isInitialized,
        lastEventId: lastEventId.current,
        lastReceivedData,
        refreshData,
    };
}
