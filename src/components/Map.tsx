import React, { useMemo } from "react";
import { useCircuitData } from "@/hooks/useCircuitData";
import { useDrivers } from "@/hooks/useDrivers";
import { LoaderCircle } from "lucide-react";

const rad = (deg: number) => deg * (Math.PI / 180);
const rotate = (
    x: number,
    y: number,
    angle: number,
    px: number,
    py: number
): [number, number] => {
    const c = Math.cos(rad(angle));
    const s = Math.sin(rad(angle));
    const xRel = x - px;
    const yRel = y - py;
    const newX = xRel * c - yRel * s;
    const newY = xRel * s + yRel * c;
    return [newX + px, newY + py];
};

const Map: React.FC<{ circuit: string }> = ({ circuit }) => {
    const {
        data: circuitData,
        isLoading: circuitLoading,
        error: circuitError,
    } = useCircuitData(circuit);
    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data: drivers,
        isLoading: driversLoading,
        error: driversError,
    } = useDrivers();

    const { transformedPoints, viewBox, stroke } = useMemo(() => {
        if (!circuitData) {
            // Valori di default se i dati non sono pronti
            return {
                transformedPoints: [] as number[][],
                viewBox: "0 0 2000 2000",
                stroke: 1,
            };
        }

        // Estraggo i dati
        const { x, y, rotation } = circuitData;

        // Se la rotazione non combacia con l'API, prova a invertire segno o fare 360 - rotation
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const finalAngle = rotation; // Oppure 360 - rotation, o -rotation, a seconda dei casi

        // Calcolo del centro
        const minX = Math.min(...x);
        const maxX = Math.max(...x);
        const minY = Math.min(...y);
        const maxY = Math.max(...y);
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        // Trasformo i punti
        const points = x.map((xi, index) => {
            const [rx, ry] = rotate(xi, y[index], rotation, centerX, centerY);
            // Inverti l’asse Y
            return [rx, -ry];
        });

        // Calcolo bounding box per il viewBox
        const xs = points.map(([px]) => px);
        const ys = points.map(([, py]) => py);
        const vbMinX = Math.min(...xs) - 100;
        const vbMinY = Math.min(...ys) - 100;
        const vbWidth = Math.max(...xs) - vbMinX + 100;
        const vbHeight = Math.max(...ys) - vbMinY + 100;

        const newViewBox = `${vbMinX} ${vbMinY} ${vbWidth} ${vbHeight}`;
        const newStroke = (vbWidth + vbHeight) / 225;

        return {
            transformedPoints: points,
            viewBox: newViewBox,
            stroke: newStroke,
        };
    }, [circuitData]);

    if (circuitLoading || driversLoading)
        return (
            <div className="h-96 w-full mx-auto rounded-xl bg-f1-bgLight overflow-hidden p-6 col-span-4 border border-f1-border content-center justify-items-center">
                <LoaderCircle className="animate-spin" />
            </div>
        );
    if (circuitError || driversError)
        return <div>Errore nel caricamento dei dati</div>;

    return (
        <svg
            viewBox={viewBox}
            width="100%"
            height="500px"
            className="w-full mx-auto rounded-xl bg-f1-bgLight overflow-hidden p-6  border border-f1-border"
        >
            {transformedPoints.length > 0 && (
                <path
                    d={
                        "M" +
                        transformedPoints
                            .map(([x, y]) => `${x},${y}`)
                            .join(" L")
                    }
                    stroke="white"
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeLinejoin="round"
                />
            )}
            {/*  <MapPositions drivers={drivers as Driver[]} /> */}
            {/* Qui puoi aggiungere la logica per disegnare i driver, corner, ecc. */}
        </svg>
    );
};

export default Map;
