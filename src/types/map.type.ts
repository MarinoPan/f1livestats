export type TrackPosition = {
    x: number;
    y: number;
};

export type MarshalSector = {
    trackPosition: TrackPosition;
};

export type Map = {
    x: number[];
    y: number[];
    rotation: number;
    corners: {
        number: number;
        trackPosition: TrackPosition;
        angle: number;
    }[];
    marshalSectors: MarshalSector[];
};

export interface CircuitData {
    x: number[];
    y: number[];
    rotation: number;
    corners: Array<{
        trackPosition: TrackPosition;
        angle: number;
        number: number;
        letter?: string;
    }>;
    marshalSectors: Array<{
        trackPosition: TrackPosition;
    }>;
}
