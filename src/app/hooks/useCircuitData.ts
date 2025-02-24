// hooks/useCircuitData.ts
import { useQuery } from "@tanstack/react-query";
import { fetchCircuitData } from "@/lib/apiMap";
import { CircuitData } from "@/types/mapType";

export const useCircuitData = (circuit: string) => {
    return useQuery<CircuitData>({
        queryKey: ["circuit", circuit],
        queryFn: () => fetchCircuitData(circuit),
        staleTime: 60 * 1000,
    });
};
