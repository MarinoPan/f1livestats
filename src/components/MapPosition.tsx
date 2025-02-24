// MapPositions.tsx
import React from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchPosition } from "@/lib/apiMap";
import { PositionData } from "@/types/mapType";
import { Driver } from "@/types/type";

type MapPositionsProps = {
    drivers: Driver[];
};

const MapPositions: React.FC<MapPositionsProps> = ({ drivers }) => {
    const positionsQueries = useQueries({
        queries: drivers.map((driver: Driver) => ({
            queryKey: ["location", driver.driver_number],
            queryFn: () => fetchPosition(driver.driver_number),
            refetchInterval: 1000,
            // Utilizziamo "select" per restituire l'ultima posizione in base alla data
            select: (positions: PositionData[]) => {
                if (!positions || positions.length === 0) return undefined;
                return positions.reduce((latest, current) =>
                    new Date(current.date) > new Date(latest.date)
                        ? current
                        : latest
                );
            },
        })),
    }) as Array<{ data?: PositionData }>;

    return (
        <>
            {drivers.map((driver, index) => {
                const posData = positionsQueries[index].data;
                if (!posData) return null;
                const { x, y } = posData;
                return (
                    <g key={driver.driver_number}>
                        <circle
                            cx={x}
                            cy={y}
                            r={10}
                            fill={
                                driver.team_colour
                                    ? `#${driver.team_colour}`
                                    : "#FFF"
                            }
                            className="transition-all duration-1000"
                        />
                        <text
                            x={x + 15}
                            y={y}
                            className="text-2xl text-f1-white"
                        >
                            {driver.name_acronym}
                        </text>
                    </g>
                );
            })}
        </>
    );
};

export default MapPositions;
