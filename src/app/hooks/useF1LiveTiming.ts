import { useEffect, useState } from "react";

const AUTH_TOKEN =
    "zpoZV4E5LxYajSIqb42UpL36l8iMUZ7SSULcdRum7/RkY4tRhcmC09Me8/G/xpaTpoGwRJHotCqBZvkJ4YGSowYIJ8fZ0uyUWK/H1C7xR23WoT8Sr2vxLsKUk9fO0/z2";
const CONN_ID = "f4d7ab7a-b923-4129-989c-1986bac8f6a7";

export function useF1LiveTiming() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(
            `wss://livetiming.formula1.com/signalrcore?connectionToken=${AUTH_TOKEN}&connectionId=${CONN_ID}`
        );

        ws.onopen = () => {
            console.log("✅ WebSocket F1 connesso!");
        };

        ws.onmessage = (event) => {
            console.log("📩 Messaggio ricevuto:", event.data);

            try {
                // Verifica se il messaggio è un JSON valido
                if (
                    typeof event.data === "string" &&
                    event.data.trim().startsWith("{")
                ) {
                    const message = JSON.parse(event.data);
                    setData(message);
                } else {
                    console.warn("⚠️ Dati non JSON ricevuti:", event.data);
                }
            } catch (error) {
                console.error(
                    "❌ Errore nel parsing JSON:",
                    error,
                    "Messaggio ricevuto:",
                    event.data
                );
            }
        };

        ws.onerror = (error) => {
            console.error("❌ Errore WebSocket:", error);
        };

        ws.onclose = () => {
            console.log("🔴 WebSocket disconnesso.");
        };

        return () => ws.close();
    }, []);

    return data;
}
