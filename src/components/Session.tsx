import { useSessionInfo } from "@/hooks/useSessionInfo";
import { useWeather } from "@/hooks/useWeather";
import { LoaderCircle } from "lucide-react";

export default function Session() {
    const {
        data: sessionInfo,
        isLoading: loadingSession,
        error: errorSession,
    } = useSessionInfo();

    const {
        data: weatherInfo,
        isLoading: loadingWeather,
        error: errorWeather,
    } = useWeather();

    if (loadingSession || loadingWeather)
        return (
            <section className="p-3 bg-f1-bgLight rounded-xl w-full border border-f1-border content-center justify-items-center">
                <LoaderCircle className="animate-spin" />
            </section>
        );
    if (errorSession || errorWeather)
        return (
            <p className="text-center text-red-400">Errore nel caricamento</p>
        );
    console.log(sessionInfo.circuit_short_name);

    const session = sessionInfo[0];
    const weather = weatherInfo[0];

    return (
        <section className="p-3 gap-6 bg-f1-bgLight rounded-xl w-full grid grid-cols-2 lg:grid-cols-3 items-center border border-f1-border">
            <h1 className="text-sm ">
                Formula 1 - {session.circuit_short_name}, {session.country_name}
            </h1>
            <h2 className="text-sm">Session: {session.session_type}</h2>
            <div className="col-span-2 lg:col-span-1 grid grid-cols-3 grid-rows-2 text-xs gap-2">
                <p>Temperatura: {weather.air_temperature}</p>
                <p>Umidity: {weather.humidity}</p>
                <p>Rainfall: {weather.rainfall}</p>
                <p>Pressure: {weather.pressure}</p>
                <p>Wind Direction: {weather.wind_direction}</p>
                <p>Wind Speed: {weather.wind_speed}</p>
            </div>
        </section>
    );
}
