import { useQuery } from "@tanstack/react-query";
import { fetchLapTimes } from "@/lib/api";

export function useLapTimes(driverNumber: number) {
    return useQuery({
        queryKey: ["LapTimes", driverNumber], // 👈 Passa driverNumber come parte della queryKey
        queryFn: () => fetchLapTimes(driverNumber), // 👈 Usa una funzione anonima per passare il parametro
        staleTime: 1000,
        enabled: !!driverNumber, // 👈 Evita chiamate con driverNumber undefined/null
    });
}
