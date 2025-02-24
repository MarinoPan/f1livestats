const TyreIcon: React.FC<{ compound: string }> = ({ compound }) => {
    const icons: Record<string, string> = {
        H: "/tyres/hard.svg",
        S: "/tyres/soft.svg",
        M: "/tyres/medium.svg",
        W: "/tyres/wet.svg",
        I: "/tyres/intermediate.svg",
        N: "/tyres/unknown.svg",
    };

    return icons[compound] ? (
        <img
            src={icons[compound]}
            alt={`${compound} tyre`}
            width={24}
            height={24}
        />
    ) : (
        <span>{compound}</span>
    );
};

export default TyreIcon;
