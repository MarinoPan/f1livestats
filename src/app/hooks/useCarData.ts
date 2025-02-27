import { useQuery } from "@tanstack/react-query";
import { fetchCarData } from "@/lib/api";

export function useCarData(driverNumber: number) {
    return useQuery({
        queryKey: ["CarData", driverNumber],
        queryFn: () => fetchCarData(driverNumber),
        staleTime: 1000,
        enabled: !!driverNumber,
    });
}
