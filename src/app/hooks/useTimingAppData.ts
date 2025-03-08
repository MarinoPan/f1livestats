import { useQuery } from "@tanstack/react-query";

const fetchTimingAppData = async () => {
    const response = await fetch("/static/TimingAppData.json");
    if (!response.ok) throw new Error("Errore nel caricamento dei dati");
    return response.json();
};

export const useTimingAppData = () => {
    return useQuery({
        queryKey: ["timingAppData"],
        queryFn: fetchTimingAppData,
        staleTime: 1000 * 60 * 5,
    });
};
