import { useQuery } from "@tanstack/react-query";

const fetchTimingData = async () => {
    const response = await fetch("/static/TimingData.json");
    if (!response.ok) throw new Error("Errore nel caricamento dei dati");
    return response.json();
};

export const useTimingData = () => {
    return useQuery({
        queryKey: ["sector"],
        queryFn: fetchTimingData,
        staleTime: 1000 * 60 * 5,
    });
};
