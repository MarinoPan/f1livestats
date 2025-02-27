import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "@/lib/api";

export function useMessages() {
    return useQuery({
        queryKey: ["messagesInfo"],
        queryFn: fetchMessages,
        staleTime: 100, // Aggiorna ogni secondo
        select: (data) =>
            [...data].sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            ), // Ordina tutto l'array
    });
}
