import { useDataStore } from "@store/dataStore";

type LapTimeProps = {
    racingNumber: string;
};

const LapTime = ({ racingNumber }: LapTimeProps) => {
    const lapTime = useDataStore((state) => state.TimingData);

    return (
        <p className="font-bold">
            {lapTime?.Lines?.[racingNumber]?.LastLapTime.Value}
        </p>
    );
};

export default LapTime;
