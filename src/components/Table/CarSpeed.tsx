import ProgressCircle from "./ProgressCircle";

interface Speed {
    speed: number;
}

const CarSpeed = ({ speed }: Speed) => {
    return (
        <div className="flex flex-col items-center">
            <ProgressCircle progress={speed} />
            <p className="text-xxs text-gray-500">km/h</p>
        </div>
    );
};

export default CarSpeed;
