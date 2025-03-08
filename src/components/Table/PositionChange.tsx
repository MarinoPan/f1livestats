import { useLapSeries } from "@/hooks/useLapSeries";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

type PositionChangeProps = {
    racingNumber: string;
};

const PositionChange = ({ racingNumber }: PositionChangeProps) => {
    const { data: lapSeries, isLoading, error } = useLapSeries();

    if (isLoading) return <p>...</p>;
    if (error) return <p>err</p>;

    const positionDiff =
        lapSeries[racingNumber]?.LapPosition[0] -
        lapSeries[racingNumber]?.LapPosition[
            lapSeries[racingNumber].LapPosition.length - 1
        ];

    const positionStatus =
        positionDiff > 0
            ? "text-green-500"
            : positionDiff < 0
            ? "text-red-500"
            : "text-gray-500";
    const Icon =
        positionDiff > 0 ? ArrowUp : positionDiff < 0 ? ArrowDown : Minus;
    return (
        <div className={`flex items-center gap-1 ${positionStatus}`}>
            <Icon size={16} />
            <p>{positionDiff}</p>
        </div>
    );
};

export default PositionChange;
