// hooks/useCircuitData.ts
import { useQuery } from "@tanstack/react-query";
import { fetchCircuitData } from "src/lib/apiMap";
import { CircuitData } from "src/types/map.type";

export const useCircuitData = (circuit: number) => {
    return useQuery<CircuitData>({
        queryKey: ["circuit", circuit],
        queryFn: () => fetchCircuitData(circuit),
        staleTime: 60 * 1000,
        refetchInterval: 10000,
    });
};
