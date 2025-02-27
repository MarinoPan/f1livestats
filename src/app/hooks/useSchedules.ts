import { useQuery } from "@tanstack/react-query";
import { fetchSchedules } from "@/lib/api";

export function useSchedules() {
    return useQuery({
        queryKey: ["schedules"],
        queryFn: fetchSchedules,
        staleTime: 60000,
        refetchInterval: 100,
    });
}
