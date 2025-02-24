import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/api";

export function useWeather() {
    return useQuery({
        queryKey: ["WeatherInfo"],
        queryFn: fetchWeather,
        staleTime: 1000, // Aggiorna ogni secondo
    });
}
