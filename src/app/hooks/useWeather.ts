import { useQuery } from "@tanstack/react-query";

const fetchWeather = async () => {
    const response = await fetch("/static/WeatherData.json");
    if (!response.ok) throw new Error("Errore nel caricamento dei dati");
    return response.json();
};

export const useWeather = () => {
    return useQuery({
        queryKey: ["weather"],
        queryFn: fetchWeather,
        staleTime: 1000 * 60 * 5,
    });
};
