const Flags: React.FC<{ country: string }> = ({ country }) => {
    const flags: Record<string, string> = {
        BRN: "/flags/brn.svg",
    };

    return flags[country] ? (
        <div className="flex flex-row gap-2 items-center">
            <img
                src={flags[country]}
                alt={`${country} tyre`}
                width={24}
                height={24}
            />
        </div>
    ) : (
        <span>{country}</span>
    );
};

export default Flags;
