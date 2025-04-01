import { useDataStore } from "@store/dataStore";
import {
    CircleGauge,
    CloudHail,
    Droplet,
    Thermometer,
    Wind,
    WindArrowDown,
} from "lucide-react";

export default function Weather() {
    const weatherData = useDataStore((state) => state.WeatherData);

    return (
        <section className="p-3 gap-4 bg-f1-bgLight rounded-xl w-full grid grid-cols-2 lg:grid-cols-3 items-center border border-f1-border text-xs">
            <div className="flex flex-row items-center gap-2">
                <Thermometer size={24} />
                <div className="flex flex-col items-left gap-1">
                    <p className="opacity-50">Temperatura</p>
                    <p className="font-bold text-sm">
                        {weatherData?.AirTemp ?? "N/A"}
                    </p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-2">
                <Droplet size={24} />
                <div className="flex flex-col items-left gap-1">
                    <p className="opacity-50">Umidity</p>
                    <p className="font-bold text-sm">{weatherData?.Humidity}</p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-2">
                <CloudHail size={24} />
                <div className="flex flex-col items-left gap-1">
                    <p className="opacity-50">Rainfall</p>
                    <p className="font-bold text-sm">{weatherData?.Rainfall}</p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-2">
                <CircleGauge size={24} />
                <div className="flex flex-col items-left gap-1">
                    <p className="opacity-50">Pressure</p>
                    <p className="font-bold text-sm">{weatherData?.Pressure}</p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-2">
                <WindArrowDown size={24} />
                <div className="flex flex-col items-left gap-1">
                    <p className="opacity-50">Wind Direction</p>
                    <p className="font-bold text-sm">
                        {weatherData?.WindDirection}
                    </p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-2">
                <Wind size={24} />
                <div className="flex flex-col items-left gap-1">
                    <p className="opacity-50">Wind Speed</p>
                    <p className="font-bold text-sm">
                        {weatherData?.WindSpeed}
                    </p>
                </div>
            </div>
        </section>
    );
}
