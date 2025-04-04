import { useDataStore } from "@store/dataStore";

type GapProps = {
    racingNumber: string;
};

const Gap = ({ racingNumber }: GapProps) => {
    const gap = useDataStore((state) => state.TimingData);

    return (
        <div className="font-number">
            <p className="font-bold">
                {gap?.Lines?.[racingNumber]?.TimeDiffToPositionAhead || "-- --"}
            </p>
            <p className="text-xs">
                {gap?.Lines?.[racingNumber]?.TimeDiffToFastest || "-- --"}
            </p>
        </div>
    );
};

export default Gap;
