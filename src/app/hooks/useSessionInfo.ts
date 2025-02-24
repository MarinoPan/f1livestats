import { useQuery } from "@tanstack/react-query";
import { fetchSessionInfo } from "@/lib/api";

export function useSessionInfo() {
    return useQuery({
        queryKey: ["sessionInfo"],
        queryFn: fetchSessionInfo,
    });
}
