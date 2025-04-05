import { useDataStore } from "@store/dataStore";
import ProgressCircle from "./ProgressCircle";

type CarSpeedProps = {
    racingNumber: string;
};

const CarSpeed = ({ racingNumber }: CarSpeedProps) => {
    const carData = useDataStore((state) => state.CarData);

    const speed =
        carData?.Entries?.[0]?.Cars?.[racingNumber]?.Channels?.[2] ?? 0;

    return (
        <div className="flex flex-col items-center font-number">
            <ProgressCircle progress={speed} />
            <p className="text-xxs text-gray-500">km/h</p>
        </div>
    );
};

export default CarSpeed;
