import { useQuery } from "@tanstack/react-query";
import { fetchStints } from "@/lib/api";
import { TyreStint } from "@/types/type";

export function useStints(driverNumber: number) {
    return useQuery<TyreStint[]>({
        queryKey: ["Stints", driverNumber],
        queryFn: () => fetchStints(driverNumber),
        staleTime: 1000,
        enabled: !!driverNumber,
    });
}
