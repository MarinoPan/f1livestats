import { Map, TrackPosition } from "@/types/map.type";

export const rad = (deg: number) => deg * (Math.PI / 180);

export const rotate = (
    x: number,
    y: number,
    a: number,
    px: number,
    py: number
) => {
    const c = Math.cos(rad(a));
    const s = Math.sin(rad(a));

    // Trasliamo il punto all'origine
    const dx = x - px;
    const dy = y - py;

    // Ruotiamo
    const newX = dx * c - dy * s;
    const newY = dx * s + dy * c;

    // Ritrasliamo al punto originale e invertiamo Y
    return {
        x: newX + px,
        y: newY + py,
    };
};

export const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const findMinDistance = (
    point: TrackPosition,
    points: TrackPosition[]
) => {
    let min = Infinity;
    let minIndex = -1;
    for (let i = 0; i < points.length; i++) {
        const distance = calculateDistance(
            point.x,
            point.y,
            points[i].x,
            points[i].y
        );
        if (distance < min) {
            min = distance;
            minIndex = i;
        }
    }
    return minIndex;
};

export type MapSector = {
    number: number;
    start: TrackPosition;
    end: TrackPosition;
    points: TrackPosition[];
};

export const createSectors = (map: Map): MapSector[] => {
    const sectors: MapSector[] = [];
    const points: TrackPosition[] = map.x.map((x, index) => ({
        x,
        y: map.y[index],
    }));

    for (let i = 0; i < map.marshalSectors.length; i++) {
        sectors.push({
            number: i + 1,
            start: map.marshalSectors[i].trackPosition,
            end: map.marshalSectors[i + 1]
                ? map.marshalSectors[i + 1].trackPosition
                : map.marshalSectors[0].trackPosition,
            points: [],
        });
    }

    const dividers: number[] = sectors.map((s) =>
        findMinDistance(s.start, points)
    );
    for (let i = 0; i < dividers.length; i++) {
        const start = dividers[i];
        const end = dividers[i + 1] ? dividers[i + 1] : dividers[0];
        if (start < end) {
            sectors[i].points = points.slice(start, end + 1);
        } else {
            sectors[i].points = points
                .slice(start)
                .concat(points.slice(0, end + 1));
        }
    }

    return sectors;
};

type RenderedSector = {
    number: number;
    d: string;
    color: string;
    strokeWidth: number;
    pulse?: number;
};

export const prioritizeColoredSectors = (
    a: RenderedSector,
    b: RenderedSector
) => {
    if (a.color === "stroke-white" && b.color !== "stroke-white") {
        return -1;
    }
    if (a.color !== "stroke-white" && b.color === "stroke-white") {
        return 1;
    }
    return a.number - b.number;
};

export const getSectorColor = (
    sector: MapSector,
    bySector: boolean | undefined,
    trackColor: string | undefined = "stroke-white",
    yellowSectors: Set<number>
) =>
    bySector
        ? yellowSectors.has(sector.number)
            ? trackColor
            : "stroke-white"
        : trackColor;
