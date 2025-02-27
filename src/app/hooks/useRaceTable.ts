import { fetchDrivers, fetchLivePositions } from "@/lib/api";
import { Driver, LivePosition } from "@/types/type";
import { useQuery } from "@tanstack/react-query";

interface RaceRow extends LivePosition {
    driver: Driver | null;
}

export function useRaceTable() {
    return useQuery<RaceRow[]>({
        queryKey: ["raceTable"],
        queryFn: async () => {
            const [drivers, positions] = await Promise.all([
                fetchDrivers(),
                fetchLivePositions(),
            ]);

            // Creiamo una mappa per tenere solo UNA posizione per ogni pilota
            const uniquePositions = new Map<number, LivePosition>();

            positions.forEach((pos) => {
                // Se il pilota non è già nella mappa, lo aggiungiamo
                if (!uniquePositions.has(pos.driver_number)) {
                    uniquePositions.set(pos.driver_number, pos);
                }
            });

            return Array.from(uniquePositions.values())
                .map(
                    (pos): RaceRow => ({
                        ...pos,
                        driver:
                            drivers.find(
                                (d) => d.driver_number === pos.driver_number
                            ) || null,
                    })
                )
                .sort((a, b) => a.position - b.position); // Ordiniamo per posizione
        },
        staleTime: 1000,
    });
}
