const TyreIcon: React.FC<{ compound: string; totalLaps: string }> = ({
    compound,
    totalLaps,
}) => {
    const icons: Record<string, string> = {
        HARD: "/tyres/hard.svg",
        SOFT: "/tyres/soft.svg",
        MEDIUM: "/tyres/medium.svg",
        WET: "/tyres/wet.svg",
        INTERMEDIATE: "/tyres/intermediate.svg",
        UNKNOW: "/tyres/unknown.svg",
    };

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
