import type { Driver } from "src/types/state.type";

interface CarDotProps {
    driver: Driver;
    driverNumber: string;
    x: number;
    y: number;
}

export default function CarDot({ driver, driverNumber, x, y }: CarDotProps) {
    return (
        <g
            key={`map.driver.${driverNumber}`}
            className="fill-zinc-700"
            style={{
                transition: "all 1s linear",
                transform: `translateX(${x}px) translateY(${y}px)`,
                fill: `#${driver.TeamColour}`,
            }}
        >
            <circle r={120} />
            <text
                fontWeight="bold"
                fontSize={120 * 3}
                style={{
                    transform: "translateX(150px) translateY(-120px)",
                }}
            >
                {driver.Tla}
            </text>
        </g>
    );
}
