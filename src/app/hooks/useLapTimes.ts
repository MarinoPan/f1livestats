import { useQuery } from "@tanstack/react-query";
import { fetchLapTimes } from "@/lib/api";

export function useLapTimes() {
    return useQuery({
        queryKey: ["lapTimes"],
        queryFn: fetchLapTimes,
        staleTime: 1000, // Aggiorna ogni secondo
        refetchInterval: 1000,
    });
}
