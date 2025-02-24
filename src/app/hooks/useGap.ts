import { useQuery } from "@tanstack/react-query";
import { fetchGap } from "@/lib/api";

export function useGap() {
    return useQuery({
        queryKey: ["gap"],
        queryFn: fetchGap,
        staleTime: 1000,
    });
}
