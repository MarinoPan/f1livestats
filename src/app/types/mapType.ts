// types.ts

export interface CircuitData {
    x: number[];
    y: number[];
    rotation: number;
    corners: Array<{
        trackPosition: { x: number; y: number };
        angle: number;
        number: number;
        letter?: string;
    }>;
    // Aggiungi altri campi se necessario
}

export interface PositionData {
    meeting_key: number;
    session_key: number;
    driver_number: number;
    date: string;
    x: number;
    y: number;
    z: number;
}
