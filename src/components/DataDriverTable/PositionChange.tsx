import { ArrowUp, ArrowDown, Minus } from "lucide-react";

type PositionChangeProps = {
    positionDiff: number;
};

const PositionChange = ({ positionDiff }: PositionChangeProps) => {
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
            <span>{positionDiff}</span>
        </div>
    );
};

export default PositionChange;
