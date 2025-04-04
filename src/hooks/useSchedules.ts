import { useQuery } from "@tanstack/react-query";
import { fetchSchedules } from "src/lib/api";

export function useSchedules() {
    return useQuery({
        queryKey: ["schedules"],
        queryFn: fetchSchedules,
        staleTime: 60000,
        refetchInterval: 1000,
    });
}
