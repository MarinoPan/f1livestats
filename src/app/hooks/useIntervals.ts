import { useQuery } from "@tanstack/react-query";
import { fetchIntervals } from "@/lib/api";

export function useIntervals(driverNumber: number) {
    return useQuery({
        queryKey: ["intervals", driverNumber],
        queryFn: () => fetchIntervals(driverNumber),
        staleTime: 1000,
        enabled: !!driverNumber,
    });
}
