const LogoTeam: React.FC<{ TeamName: string }> = ({ TeamName }) => {
    const logo: Record<string, string> = {
        "Red Bull Racing": "/logo-team/redbull.svg",
        McLaren: "/logo-team/mclaren.svg",
        "Kick Sauber": "/logo-team/kicksauber.svg",
        "Racing Bulls": "/logo-team/vcarb.svg",
        Alpine: "/logo-team/alpine.svg",
        Williams: "/logo-team/williams.svg",
        "Aston Martin": "/logo-team/aston-martin.svg",
        Ferrari: "/logo-team/ferrari.svg",
        "Haas F1 Team": "/logo-team/haas.svg",
        Mercedes: "/logo-team/mercedes.svg",
    };

    return logo[TeamName] ? (
        <img src={logo[TeamName]} alt={`${TeamName}`} width={24} height={24} />
    ) : (
        <span>{TeamName}</span>
    );
};

export default LogoTeam;
