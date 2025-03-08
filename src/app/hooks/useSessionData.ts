import { useQuery } from "@tanstack/react-query";

const fetchSessionData = async () => {
    const response = await fetch("/static/SessionData.json");
    if (!response.ok) throw new Error("Errore nel caricamento dei dati");
    return response.json();
};

export const useSessionData = () => {
    return useQuery({
        queryKey: ["sessionData"],
        queryFn: fetchSessionData,
        staleTime: 1000 * 60 * 5,
    });
};
