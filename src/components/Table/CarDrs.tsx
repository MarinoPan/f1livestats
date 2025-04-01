import { useDataStore } from "@store/dataStore";

type CarDrsProps = {
    racingNumber: string;
};

const CarDrs = ({ racingNumber }: CarDrsProps) => {
    const getValueDrs = (value: number): string => {
        if (value === 0) return "opacity-20";
        if (value === 8) return "opacity-70";
        if (value > 9) return "bg-green-600 border-green-900";
        return "";
    };
    const carData = useDataStore((state) => state.CarData?.Entries[3].Cars);

    const drsClass = getValueDrs(carData?.[racingNumber]?.Channels?.[45] || 0)
        ? getValueDrs(carData?.[racingNumber]?.Channels?.[45] || 0)
        : "";

    return drsClass ? (
        <div className={`p-2 border-2 rounded-md border-grey-800 ${drsClass}`}>
            <p className="text-white font-bold text-center">DRS</p>
        </div>
    ) : (
        <span>{""}</span>
    );
};

export default CarDrs;
