type PositionDriverProps = {
    position: number;
    color: string;
    acronym: string;
};

const PositionDriver = ({ position, color, acronym }: PositionDriverProps) => {
    const positionOne = position == 1 ? " bg-f1-red" : "";
    return (
        <div className="flex flex-row gap-4 items-center">
            <p className={`font-bold w-3 ${positionOne}`}>{position ?? "-"}</p>
            <div
                className="w-1 h-5"
                style={{
                    backgroundColor: `#${color}`,
                }}
            />
            <p className="">{acronym}</p>
        </div>
    );
};

export default PositionDriver;
