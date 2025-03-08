import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SegmentsSectors: React.FC<{ segment?: number[] }> = ({
    segment = [],
}) => {
    const segments: Record<number, string> = {
        0: "",
        2048: "var(--f1-yellow",
        2049: "var(--f1-green",
        2050: "var(--f1-black",
        2051: "var(--f1-blue",
        2052: "var(--f1-red)",
        2064: "var(--f1-purple",
        2068: "white",
    };

    const [segmentsWithKeys, setSegmentsWithKeys] = useState<
        { id: string; color: string }[]
    >([]);

    useEffect(() => {
        if (!segment || !Array.isArray(segment)) return;

        const newSegments = segment.map((seg) => ({
            id: uuidv4(),
            color: segments[seg] || "bg-gray-500",
        }));
        setSegmentsWithKeys(newSegments);
    }, [segment]);

    return (
        <div className="flex space-x-1">
            {segmentsWithKeys.map((seg) => (
                <div
                    key={seg.id}
                    style={{ backgroundColor: seg.color }}
                    className="w-2 h-1 rounded-md bg-f1"
                ></div>
            ))}
        </div>
    );
};

export default SegmentsSectors;
