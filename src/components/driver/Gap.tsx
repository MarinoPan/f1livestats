import { useDataStore } from "@store/dataStore";

type GapProps = {
    racingNumber: string;
};

const Gap = ({ racingNumber }: GapProps) => {
    const timingData = useDataStore((state) => state.TimingData);
    const gap = timingData?.Lines?.[racingNumber];

    const gapToPositionAhead =
        gap?.IntervalToPositionAhead?.Value ??
        gap?.Stats?.[timingData?.SessionPart ? timingData.SessionPart - 1 : 0]
            ?.TimeDifftoPositionAhead ??
        undefined ??
        gap?.TimeDiffToPositionAhead ??
        "-- --";

    const gapToLeader =
        gap?.GapToLeader ??
        gap?.Stats?.[timingData?.SessionPart ? timingData.SessionPart - 1 : 0]
            ?.TimeDiffToFastest ??
        undefined ??
        gap?.TimeDiffToFastest ??
        "-- --";

    return (
        <div className="font-number min-w-14">
            <p className="font-bold">{gapToPositionAhead || "-- ---"}</p>
            <p className="text-xs">{gapToLeader || "-- ---"}</p>
        </div>
    );
};

export default Gap;
