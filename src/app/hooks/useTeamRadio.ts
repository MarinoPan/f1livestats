import { useQuery } from "@tanstack/react-query";
import { fetchTeamRadio } from "@/lib/api";

export function useTeamRadio() {
    return useQuery({
        queryKey: ["TeamRadioInfo"],
        queryFn: fetchTeamRadio,
        staleTime: 1000, // Aggiorna ogni secondo
        refetchInterval: 100,
    });
}
