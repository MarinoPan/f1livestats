import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/api";

export function useWeather() {
    return useQuery({
        queryKey: ["WeatherInfo"],
        queryFn: fetchWeather,
        staleTime: 100, // Aggiorna ogni secondo
        refetchInterval: 1000,
    });
}
