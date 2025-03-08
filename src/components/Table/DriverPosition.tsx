import LogoTeam from "./LogoTeam";

type PositionDriverProps = {
    position: number;
    color: string;
    acronym: string;
    teamName: string;
};

const PositionDriver = ({
    position,
    color,
    acronym,
    teamName,
}: PositionDriverProps) => {
    const positionOne = position == 1 ? " bg-f1-red" : "";
    return (
        <div className="flex flex-row gap-2 items-center">
            <p className={`font-bold text-sm w-3`}>{position ?? "-"}</p>
            {/* <div
                className="w-1 h-5"
                style={{
                    backgroundColor: `#${color}`,
                }}
            /> */}
            <LogoTeam TeamName={teamName} />
            <p className="font-bold text-sm">{acronym}</p>
        </div>
    );
};

export default PositionDriver;
