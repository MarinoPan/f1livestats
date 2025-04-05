import { useEffect, useState } from "react";
import { useDataStore } from "@store/dataStore";

// Move colorMapping outside the component
const colorMapping: Record<number, string> = {
    0: "var(--f1-gray)",
    2048: "var(--f1-yellow)",
    2049: "var(--f1-green)",
    2050: "var(--f1-black)",
    2051: "var(--f1-blue)",
    2052: "var(--f1-red)",
    2064: "var(--f1-purple)",
    2068: "white",
};

type SegmentsSectorsProps = {
    racingNumber: string;
    numberSector: number;
};

const SegmentsSectors: React.FC<SegmentsSectorsProps> = ({
    racingNumber,
    numberSector,
}) => {
    const segment = useDataStore((state) => state.TimingData);
    const timingStats = useDataStore((state) => state.TimingStats);

    const [segmentsWithKeys, setSegmentsWithKeys] = useState<
        { id: string; color: string }[]
    >([]);

    useEffect(() => {
        const driver = segment?.Lines[racingNumber];
        const sectors = driver?.Sectors?.[numberSector];
        const segments = sectors?.Segments;

        // Create a fixed array of 10 segments (typical F1 sector has 8-10 segments)
        const defaultSegments = Array(10)
            .fill(null)
            .map((_, index) => ({
                id: index.toString(),
                color: colorMapping[2050], // Default to black
            }));

        if (!segments) {
            setSegmentsWithKeys(defaultSegments);
            return;
        }

        // Update only the segments that exist in the data
        Object.entries(segments).forEach(([index, segmentData]) => {
            const segmentIndex = parseInt(index);
            if (segmentIndex < defaultSegments.length) {
                defaultSegments[segmentIndex] = {
                    id: index,
                    color: colorMapping[segmentData.Status] || "bg-gray-500",
                };
            }
        });

        setSegmentsWithKeys(defaultSegments);
    }, [racingNumber, numberSector, segment]);

    // Get Value and PreviousValue separately
    const value = segment?.Lines[racingNumber]?.Sectors?.[numberSector]?.Value;
    const previousValue =
        segment?.Lines[racingNumber]?.Sectors?.[numberSector]?.PreviousValue;

    // Show previousValue if value is empty string or null/undefined
    const valueSector = value || previousValue || "-";

    // Add class if we're using previousValue (when value is empty)
    const classValueSector = !value || value === "" ? "text-gray-400" : "";

    return (
        <div className="flex flex-col gap-1 font-number font-bold">
            <div className="flex flex-row items-center gap-2">
                <p className={`${classValueSector}`}>{valueSector}</p>
                <p className="text-xs text-f1-gray font-normal">
                    {timingStats?.Lines[racingNumber]?.BestSectors?.[
                        numberSector
                    ]?.Value || "-"}
                </p>
            </div>
            <div className="flex space-x-1">
                {segmentsWithKeys.map((seg) => (
                    <div
                        key={seg.id}
                        style={{ backgroundColor: seg.color }}
                        className="w-2 h-1 rounded-md"
                    />
                ))}
            </div>
        </div>
    );
};

export default SegmentsSectors;
