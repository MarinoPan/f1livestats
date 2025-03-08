import { useQuery } from "@tanstack/react-query";

const fetchLapSeries = async () => {
    const response = await fetch("/static/LapSeries.json");
    if (!response.ok) throw new Error("Errore nel caricamento dei dati");
    return response.json();
};

export const useLapSeries = () => {
    return useQuery({
        queryKey: ["lapSeries"],
        queryFn: fetchLapSeries,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    });
};
