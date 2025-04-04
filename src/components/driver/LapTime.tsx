import { useDataStore } from "@store/dataStore";

type LapTimeProps = {
    racingNumber: string;
};

const LapTime = ({ racingNumber }: LapTimeProps) => {
    const lapTime = useDataStore((state) => state.TimingData);
    const lastLapTime = lapTime?.Lines?.[racingNumber]?.LastLapTime;
    const bestLapTime = lapTime?.Lines?.[racingNumber]?.BestLapTime;

    return (
        <div className="font-number">
            <p className="font-bold">{lastLapTime?.Value || "--:--"}</p>
            <p className="text-xs font-normal">
                {bestLapTime?.Value || "--:--"}
            </p>
        </div>
    );
};

export default LapTime;
