import { useWeather } from "@/hooks/useWeather";
import {
    CircleGauge,
    CloudHail,
    Droplet,
    Thermometer,
    Wind,
    WindArrowDown,
} from "lucide-react";

export default function Weather() {
    const {
        data: weather,
        isLoading: LoadingWeather,
        error: errorWeather,
    } = useWeather();

    if (LoadingWeather) return <p>Loading session...</p>;
    if (errorWeather) return <p>Error loading session.</p>;

    return (
        <section className="p-3 gap-4 bg-f1-bgLight rounded-xl w-full grid grid-cols-2 lg:grid-cols-3 items-center border border-f1-border text-xs">
            <div className="flex flex-row items-center gap-2">
                <Thermometer size={24} />
                <div className="flex flex-col items-left gap-1">
                    <p className="opacity-50">Temperatura</p>
                    <p className="font-bold text-sm">{weather.AirTemp}</p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-2">
                <Droplet size={24} />
                <div className="flex flex-col items-left gap-1">
                    <p className="opacity-50">Umidity</p>
                    <p className="font-bold text-sm">{weather.Humidity}</p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-2">
                <CloudHail size={24} />
                <div className="flex flex-col items-left gap-1">
                    <p className="opacity-50">Rainfall</p>
                    <p className="font-bold text-sm">{weather.Rainfall}</p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-2">
                <CircleGauge size={24} />
                <div className="flex flex-col items-left gap-1">
                    <p className="opacity-50">Pressure</p>
                    <p className="font-bold text-sm">{weather.Pressure}</p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-2">
                <WindArrowDown size={24} />
                <div className="flex flex-col items-left gap-1">
                    <p className="opacity-50">Wind Direction</p>
                    <p className="font-bold text-sm">{weather.WindDirection}</p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-2">
                <Wind size={24} />
                <div className="flex flex-col items-left gap-1">
                    <p className="opacity-50">Wind Speed</p>
                    <p className="font-bold text-sm">{weather.WindSpeed}</p>
                </div>
            </div>
        </section>
    );
}
