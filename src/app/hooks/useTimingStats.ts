import { useQuery } from "@tanstack/react-query";

const fetchTimingStats = async () => {
    const response = await fetch("/static/TimingStats.json");
    if (!response.ok) throw new Error("Errore nel caricamento dei dati");
    return response.json();
};

export const useTimingStats = () => {
    return useQuery({
        queryKey: ["timingStats"],
        queryFn: fetchTimingStats,
        staleTime: 1000 * 60 * 5,
    });
};
