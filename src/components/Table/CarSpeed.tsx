import ProgressCircle from "./ProgressCircle";
import { useCarData } from "@/hooks/useCarData";

type CarSpeedProps = {
    racingNumber: string;
};

const CarSpeed = ({ racingNumber }: CarSpeedProps) => {
    const { data: carData, isLoading, error } = useCarData();

    if (isLoading) return <p>...</p>;
    if (error) return <p>...</p>;

    const speed = carData.Entries[0].Cars[racingNumber]?.Channels["2"];

    return (
        <div className="flex flex-col items-center">
            <ProgressCircle progress={speed} />
            <p className="text-xxs text-gray-500">km/h</p>
        </div>
    );
};

export default CarSpeed;
