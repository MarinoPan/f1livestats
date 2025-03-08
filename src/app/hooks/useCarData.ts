import { useQuery } from "@tanstack/react-query";

const fetchCarData = async () => {
    const response = await fetch("/static/CarData.json");
    if (!response.ok) throw new Error("Errore nel caricamento dei dati");
    return response.json();
};

export const useCarData = () => {
    return useQuery({
        queryKey: ["carData"],
        queryFn: fetchCarData,
        staleTime: 1000,
    });
};
