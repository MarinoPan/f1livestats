import { useQuery } from "@tanstack/react-query";
import { fetchStints } from "@/lib/api"; // Funzione per chiamare l'API
import { TyreStint } from "@/types/type";

export function useStints() {
    return useQuery<TyreStint[]>({
        queryKey: ["Stints"],
        queryFn: fetchStints,
        staleTime: 5000,
    });
}
