/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useDataStore } from "@store/dataStore";

type TyreIconProps = {
    racingNumber: string;
};

const TyreIcon = ({ racingNumber }: TyreIconProps) => {
    const timingAppData = useDataStore((state) => state.TimingAppData);
    if (!timingAppData) return <div>No data available</div>;

    const icons: Record<string, string> = {
        HARD: "/tyres/hard.svg",
        SOFT: "/tyres/soft.svg",
        MEDIUM: "/tyres/medium.svg",
        WET: "/tyres/wet.svg",
        INTERMEDIATE: "/tyres/intermediate.svg",
        UNKNOWN: "/tyres/unknown.svg",
    };

    const driverData = timingAppData?.Lines?.[racingNumber];
    if (!driverData || !driverData.Stints) {
        return <div>No stint data available for driver {racingNumber}</div>;
    }

    // Ottieni tutti gli stint come array
    const stintArray = Object.values(driverData.Stints);

    // Prendi l'ultimo stint disponibile
    const lastStint = stintArray[stintArray.length - 1];

    // Estrai i valori necessari con fallback
    const compound = lastStint?.Compound || "UNKNOWN";
    const totalLaps = lastStint?.TotalLaps ?? 0;

    return (
        <div className="inline-flex items-center gap-2 font-number">
            <div className="w-6 h-6">
                <img
                    src={icons[compound] || icons["UNKNOWN"]}
                    alt={`${compound || "Unknown"} tyre`}
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                />
            </div>
            <span className="text-sm whitespace-nowrap">L {totalLaps}</span>
        </div>
    );
};

export default TyreIcon;
