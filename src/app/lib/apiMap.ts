// api.ts

import { CircuitData, PositionData } from "@/types/mapType";

export const fetchCircuitData = async (
    circuit: string
): Promise<CircuitData> => {
    const res = await fetch(
        `https://api.multiviewer.app/api/v1/circuits/${circuit}/${new Date().getFullYear()}`
    );
    if (!res.ok) throw new Error("Errore nel recupero dei dati del circuito");
    return res.json();
};

export const fetchPosition = async (
    driverNumber: number
): Promise<PositionData[]> => {
    const res = await fetch(
        `https://api.openf1.org/v1/location?session_key=latest&meeting_key=latest&driver_number=${driverNumber}`
    );
    if (!res.ok) throw new Error("Errore nel recupero della posizione");
    return res.json();
};
