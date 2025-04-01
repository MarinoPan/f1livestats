import { useDataStore } from "@store/dataStore";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

type PositionChangeProps = {
    racingNumber: string;
};

const PositionChange = ({ racingNumber }: PositionChangeProps) => {
    const timingAppData = useDataStore((state) => state.TimingAppData);
    const timingData = useDataStore((state) => state.TimingData);

    // Ottieni la posizione attuale
    const previousPosition = parseInt(
        timingAppData?.Lines[racingNumber]?.GridPos ?? "0"
    );

    // Ottieni la posizione precedente dall'ultimo giro
    const currentPosition = parseInt(
        timingData?.Lines[racingNumber]?.Position ?? "0"
    );

    // Calcola la differenza
    const positionDiff = previousPosition - currentPosition;

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
            <p>{Math.abs(positionDiff)}</p>
        </div>
    );
};

export default PositionChange;
