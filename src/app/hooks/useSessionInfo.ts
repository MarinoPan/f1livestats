import { useQuery } from "@tanstack/react-query";

const fetchSessionInfo = async () => {
    const response = await fetch("/static/SessionInfo.json");
    if (!response.ok) throw new Error("Errore nel caricamento dei dati");
    return response.json();
};

export const useSessionInfo = () => {
    return useQuery({
        queryKey: ["sessionInfo"],
        queryFn: fetchSessionInfo,
        staleTime: 1000 * 60 * 5,
    });
};
