import { useEffect, useState } from "react";
import { useDataStore } from "@store/dataStore";

type SegmentsSectorsProps = {
    racingNumber: string;
    numberSector: number;
};

const SegmentsSectors: React.FC<SegmentsSectorsProps> = ({
    racingNumber,
    numberSector,
}) => {
    const colorMapping: Record<number, string> = {
        0: "",
        2048: "var(--f1-yellow)",
        2049: "var(--f1-green)",
        2050: "var(--f1-black)",
        2051: "var(--f1-blue)",
        2052: "var(--f1-red)",
        2064: "var(--f1-purple)",
        2068: "white",
    };

    const segment = useDataStore((state) => state.TimingData);

    const [segmentsWithKeys, setSegmentsWithKeys] = useState<
        { id: string; color: string }[]
    >([]);

    useEffect(() => {
        const driver = segment?.Lines[racingNumber];
        const sectors = driver?.Sectors?.[numberSector];
        const segments = sectors?.Segments;

        console.log("Dati settori:", {
            driver,
            sectors,
            segments,
            isArray: Array.isArray(segments),
        });

        if (!segments || !Array.isArray(segments)) {
            setSegmentsWithKeys([]);
            return;
        }

        const newSegments = segments.map((seg, index) => ({
            id: index.toString(),
            color: colorMapping[seg.Status] || "bg-gray-500",
        }));

        setSegmentsWithKeys(newSegments);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [racingNumber, numberSector, segment]);

    return (
        <div className="flex flex-col gap-1">
            <p>
                {segment?.Lines[racingNumber]?.Sectors?.[numberSector]?.Value ||
                    "-"}
            </p>
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
