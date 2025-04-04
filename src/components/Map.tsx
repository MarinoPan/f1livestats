import { useEffect, useState } from "react";
import { useDataStore } from "@store/dataStore";
import { LoaderCircle } from "lucide-react";
import { useCircuitData } from "src/hooks/useCircuitData";
import CarDot from "@components/CarDot";
import { rotate, rad } from "../lib/map";

const SPACE = 1000;

type Corner = {
    number: number;
    pos: { x: number; y: number };
    labelPos: { x: number; y: number };
};

export default function Map() {
    const dataSession = useDataStore((state) => state.SessionInfo);
    const positions = useDataStore((state) => state.Positions);
    const drivers = useDataStore((state) => state.DriverList);
    const circuit = dataSession?.Meeting?.Circuit?.Key;

    console.log("Circuit from session:", circuit);

    const orderedDrivers = Object.values(drivers ?? {})
        .filter((driver) => driver.RacingNumber)
        .sort((a, b) => {
            return parseInt(a.RacingNumber) - parseInt(b.RacingNumber);
        });

    console.log("Ordered Drivers:", orderedDrivers);
    console.log("Positions:", positions);
    console.log("Session:", dataSession);

    const [[minX, minY, widthX, widthY], setBounds] = useState<
        (null | number)[]
    >([null, null, null, null]);
    const [[centerX, centerY], setCenter] = useState<(null | number)[]>([
        null,
        null,
    ]);
    const [points, setPoints] = useState<null | { x: number; y: number }[]>(
        null
    );
    const [corners, setCorners] = useState<Corner[]>([]);
    const [rotation, setRotation] = useState<number>(0);

    const {
        data: circuitData,
        isLoading: circuitLoading,
        error: circuitError,
    } = useCircuitData(circuit ?? 0);

    useEffect(() => {
        if (!circuitData) return;

        // Estraggo i dati
        const { x, y, rotation } = circuitData;

        // Aggiungiamo il ROTATION_FIX per allineare correttamente
        const finalAngle = rotation;
        // Calcolo del centro
        const minX = Math.min(...x);
        const maxX = Math.max(...x);
        const minY = Math.min(...y);
        const maxY = Math.max(...y);
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        // Trasformo i punti
        const rotatedPoints = x.map((xi, index) => {
            const { x: rx, y: ry } = rotate(
                xi,
                y[index],
                finalAngle,
                centerX,
                centerY
            );
            // Invertiamo l'asse Y per il sistema di coordinate SVG
            return { x: rx, y: -ry };
        });

        const cornerPositions: Corner[] = circuitData.corners.map((corner) => {
            // Ruotiamo la posizione del corner
            const { x: rx, y: ry } = rotate(
                corner.trackPosition.x,
                corner.trackPosition.y,
                finalAngle,
                centerX,
                centerY
            );

            // Calcoliamo la posizione del label considerando l'angolo del corner
            const labelDistance = 540; // Distanza del label dal corner
            const { x: lx, y: ly } = rotate(
                corner.trackPosition.x +
                    labelDistance * Math.cos(rad(corner.angle)),
                corner.trackPosition.y +
                    labelDistance * Math.sin(rad(corner.angle)),
                finalAngle,
                centerX,
                centerY
            );

            return {
                number: corner.number,
                pos: { x: rx, y: -ry },
                labelPos: { x: lx, y: -ly },
            };
        });

        const pointsX = rotatedPoints.map((item) => item.x);
        const pointsY = rotatedPoints.map((item) => item.y);
        const cMinX = Math.min(...pointsX) - SPACE;
        const cMinY = Math.min(...pointsY) - SPACE;
        const cWidthX = Math.max(...pointsX) - cMinX + SPACE * 2;
        const cWidthY = Math.max(...pointsY) - cMinY + SPACE * 2;

        setCenter([centerX, centerY]);
        setBounds([cMinX, cMinY, cWidthX, cWidthY]);
        setPoints(rotatedPoints);
        setRotation(finalAngle);
        setCorners(cornerPositions);
    }, [circuitData]);

    if (circuitLoading) {
        return (
            <div className="styleCard h-96 w-full mx-auto overflow-hidden p-6 col-span-4 content-center justify-items-center">
                <LoaderCircle className="animate-spin" />
            </div>
        );
    }

    if (circuitError) return <div>Errore nel caricamento dei dati</div>;
    if (!points || !minX || !minY || !widthX || !widthY) return null;

    return (
        <svg
            viewBox={`${minX} ${minY} ${widthX} ${widthY}`}
            className="styleCard w-full mx-auto overflow-hidden p-6"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className="white"
                stroke="white"
                strokeWidth={100}
                strokeLinejoin="round"
                fill="transparent"
                d={`M${points[0].x},${points[0].y} ${points
                    .map((point) => `L${point.x},${point.y}`)
                    .join(" ")}`}
            />
            {corners.map((corner) => (
                <text
                    key={`corner.${corner.number}`}
                    x={corner.labelPos.x}
                    y={corner.labelPos.y}
                    className="fill-zinc-700"
                    fontSize={300}
                    fontWeight="semibold"
                >
                    {corner.number}
                </text>
            ))}
            {centerX &&
                centerY &&
                orderedDrivers &&
                orderedDrivers.length > 0 && (
                    <>
                        {orderedDrivers.map((driver) => {
                            const pos = positions?.[driver.RacingNumber];
                            if (!pos?.X || !pos?.Y) return null;

                            const { x: rx, y: ry } = rotate(
                                pos.X,
                                pos.Y,
                                rotation,
                                centerX,
                                centerY
                            );
                            return (
                                <CarDot
                                    key={`map.driver.${driver.RacingNumber}`}
                                    driver={driver}
                                    driverNumber={driver.RacingNumber}
                                    x={rx}
                                    y={-ry}
                                />
                            );
                        })}
                    </>
                )}
        </svg>
    );
}
