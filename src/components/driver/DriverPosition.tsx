import LogoTeam from "./LogoTeam";

type PositionDriverProps = {
    position?: string;
    color: string;
    acronym: string;
    teamName: string;
};

const PositionDriver = ({
    position,
    acronym,
    teamName,
}: PositionDriverProps) => {
    return (
        <div className="flex flex-row gap-2 items-center font-number">
            <p className={`font-bold text-sm w-3`}>{position || "-"}</p>
            <LogoTeam TeamName={teamName} />
            <p className="font-bold text-sm">{acronym}</p>
        </div>
    );
};

export default PositionDriver;
