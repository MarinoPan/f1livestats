// api.ts

import { CircuitData } from "src/types/map.type";

export const fetchCircuitData = async (
    circuit: number
): Promise<CircuitData> => {
    const res = await fetch(
        `https://api.multiviewer.app/api/v1/circuits/${circuit}/${new Date().getFullYear()}`
    );
    if (!res.ok) throw new Error("Errore nel recupero dei dati del circuito");
    return res.json();
};
