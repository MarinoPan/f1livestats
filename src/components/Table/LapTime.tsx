import { useDataStore } from "@store/dataStore";

type LapTimeProps = {
  racingNumber: string;
};

const LapTime = ({ racingNumber }: LapTimeProps) => {
  const lapTime = useDataStore((state) => state.TimingData);
  const lastLapTime = lapTime?.Lines?.[racingNumber]?.LastLapTime;

  if (!lastLapTime) return <p className="font-bold">--:--</p>;

  return <p className="font-bold">{lastLapTime.Value}</p>;
};

export default LapTime;
