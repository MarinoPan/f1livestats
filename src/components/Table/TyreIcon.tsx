import { useTimingAppData } from "@/hooks/useTimingAppData";

type TyreIconProps = {
    racingNumber: string;
};

const TyreIcon = ({ racingNumber }: TyreIconProps) => {
    const { data: stint, isLoading, error } = useTimingAppData();

    if (isLoading) return <p>...</p>;
    if (error) return <p>...</p>;

    const icons: Record<string, string> = {
        HARD: "/tyres/hard.svg",
        SOFT: "/tyres/soft.svg",
        MEDIUM: "/tyres/medium.svg",
        WET: "/tyres/wet.svg",
        INTERMEDIATE: "/tyres/intermediate.svg",
        UNKNOW: "/tyres/unknown.svg",
    };

    const compound =
        stint.Lines[racingNumber]?.Stints?.[
            stint.Lines[racingNumber]?.Stints.length - 1
        ]?.Compound;

    const totalLaps =
        stint.Lines[racingNumber]?.Stints?.[
            stint.Lines[racingNumber]?.Stints.length - 1
        ]?.TotalLaps;

    return icons[compound] ? (
        <div className="flex flex-row gap-2 items-center">
            <img
                src={icons[compound]}
                alt={`${compound} tyre`}
                width={24}
                height={24}
            />
            <p>L {totalLaps}</p>
        </div>
    ) : (
        <span>{compound}</span>
    );
};

export default TyreIcon;
