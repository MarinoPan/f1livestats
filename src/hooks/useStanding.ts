import { useQuery } from "@tanstack/react-query";
import { fetchStanding } from "src/lib/api";

export function useStanding() {
    return useQuery({
        queryKey: ["standing"],
        queryFn: fetchStanding,
        staleTime: 60000,
        refetchInterval: 1000,
    });
}
