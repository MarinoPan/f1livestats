import { useDataStore } from "@store/dataStore";

type GapProps = {
    racingNumber: string;
};

const Gap = ({ racingNumber }: GapProps) => {
    const gap = useDataStore((state) => state.TimingData);

    return (
        <div>
            <p className="font-bold">
                {
                    gap?.Lines?.[racingNumber]?.Stats?.at(-1)
                        ?.TimeDifftoPositionAhead
                }
            </p>
            <p className="text-xs">
                {gap?.Lines?.[racingNumber]?.Stats?.at(-1)?.TimeDiffToFastest}
            </p>
        </div>
    );
};

export default Gap;
