import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SegmentsSectors: React.FC<{ segment?: number[] }> = ({
    segment = [],
}) => {
    const segments: Record<number, string> = {
        0: "white",
        2048: "yellow",
        2049: "green",
        2050: "black",
        2051: "purple",
        2052: "red",
        2064: "blue",
        2068: "white",
    };

    // Stato per memorizzare i segmenti con ID unici
    const [segmentsWithKeys, setSegmentsWithKeys] = useState<
        { id: string; color: string }[]
    >([]);

    useEffect(() => {
        if (!segment || !Array.isArray(segment)) return; // Evita errori se segment è null o undefined

        // Genera una lista con ID unici per ogni valore del segmento
        const newSegments = segment.map((seg) => ({
            id: uuidv4(),
            color: segments[seg] || "gray", // Default a "gray" se il valore non è trovato
        }));
        setSegmentsWithKeys(newSegments);
    }, [segment]); // Si aggiorna solo quando il segmento cambia

    return (
        <div className="flex space-x-1">
            {segmentsWithKeys.map((seg) => (
                <div
                    key={seg.id}
                    style={{ backgroundColor: seg.color }}
                    className="w-2 h-1 rounded-md"
                ></div>
            ))}
        </div>
    );
};

export default SegmentsSectors;
