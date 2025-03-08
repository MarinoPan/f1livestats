import { useQuery } from "@tanstack/react-query";

const fetchDrivers = async () => {
    const response = await fetch("/static/driverList.json");
    if (!response.ok) throw new Error("Errore nel caricamento dei dati");
    return response.json();
};

export const useDrivers = () => {
    return useQuery({
        queryKey: ["driver"],
        queryFn: fetchDrivers,
        staleTime: 1000 * 60 * 5, // I dati rimangono validi per 5 minuti
        retry: 2, // Riprova due volte in caso di errore
    });
};
