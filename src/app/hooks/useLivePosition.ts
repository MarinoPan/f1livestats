import { useQuery } from "@tanstack/react-query";
import { fetchLivePositions } from "@/lib/api";

export function useLivePositions() {
    return useQuery({
        queryKey: ["livePositions"],
        queryFn: fetchLivePositions,
        staleTime: 1000, // Aggiorna ogni secondo
    });
}
