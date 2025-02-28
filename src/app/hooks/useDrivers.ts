import { useQuery } from "@tanstack/react-query";
import { fetchDrivers } from "@/lib/api";

export function useDrivers() {
    return useQuery({
        queryKey: ["drivers"],
        queryFn: fetchDrivers,
        staleTime: 10000,
    });
}
