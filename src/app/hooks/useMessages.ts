import { useQuery } from "@tanstack/react-query";

const fetchMessages = async () => {
    const response = await fetch("/static/messages.json");
    if (!response.ok) throw new Error("Errore nel caricamento dei dati");
    return response.json();
};

export const useMessages = () => {
    return useQuery({
        queryKey: ["messages"],
        queryFn: fetchMessages,
        staleTime: 1000 * 60 * 5,
    });
};
