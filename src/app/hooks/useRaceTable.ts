import { fetchDrivers, fetchLivePositions } from "@/lib/api";
import { Driver, LivePosition } from "@/types/type";
import { useQuery } from "@tanstack/react-query";

export interface RaceRow {
    driver_number: number; // Numero del pilota
    position: number; // Posizione attuale in gara
    positionDiff: number; // Differenza rispetto alla posizione iniziale
    date: string; // Data dell'ultimo aggiornamento della posizione
    driver: Driver | null; // Dati del pilota (può essere null se non trovato)
}
export function useRaceTable() {
    return useQuery<RaceRow[]>({
        queryKey: ["raceTable"],
        queryFn: async () => {
            const [drivers, livePositions] = await Promise.all([
                fetchDrivers(),
                fetchLivePositions(),
            ]);

            if (!drivers.length || !livePositions.length) return [];

            // Mappa della posizione iniziale
            const initialPositionsMap = new Map<
                number,
                { position: number; date: string }
            >();

            // Mappa delle posizioni più recenti
            const latestPositionsMap = new Map<
                number,
                { position: number; date: string; positionDiff: number }
            >();

            livePositions.forEach((pos: LivePosition) => {
                const existingInitial = initialPositionsMap.get(
                    pos.driver_number
                );
                const existingLatest = latestPositionsMap.get(
                    pos.driver_number
                );

                // Memorizza la posizione iniziale solo la prima volta
                if (!existingInitial) {
                    initialPositionsMap.set(pos.driver_number, {
                        position: pos.position,
                        date: pos.date,
                    });
                }

                // Aggiorna la posizione più recente se necessario
                if (
                    !existingLatest ||
                    new Date(pos.date) > new Date(existingLatest.date)
                ) {
                    const initialPosition =
                        initialPositionsMap.get(pos.driver_number)?.position ??
                        pos.position;
                    latestPositionsMap.set(pos.driver_number, {
                        position: pos.position,
                        date: pos.date,
                        positionDiff: initialPosition - pos.position, // Calcolo della differenza
                    });
                }
            });

            return Array.from(latestPositionsMap.entries())
                .map(
                    ([driverNumber, latestPos]): RaceRow => ({
                        driver_number: driverNumber,
                        position: latestPos.position,
                        positionDiff: latestPos.positionDiff,
                        date: latestPos.date,
                        driver:
                            drivers.find(
                                (d) => d.driver_number === driverNumber
                            ) || null,
                    })
                )
                .sort((a, b) => a.position - b.position); // ✅ Ora ordiniamo per posizione
        },
        staleTime: 1000,
    });
}
