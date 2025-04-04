/* eslint-disable @next/next/no-img-element */
const Flags: React.FC<{ country: string }> = ({ country }) => {
    const flags: Record<string, string> = {
        AUS: "/flags/aus.svg",
        AUT: "/flags/aut.svg",
        AZE: "/flags/aze.svg",
        BEL: "/flags/bel.svg",
        BRA: "/flags/bra.svg",
        BRN: "/flags/brn.svg",
        CAN: "/flags/can.svg",
        CHN: "/flags/chn.svg",
        ESP: "/flags/esp.svg",
        FRA: "/flags/fra.svg",
        GBR: "/flags/gbr.svg",
        GER: "/flags/ger.svg",
        HUN: "/flags/hun.svg",
        ITA: "/flags/ita.svg",
        JPN: "/flags/jpn.svg",
        KSA: "/flags/ksa.svg",
        MEX: "/flags/mex.svg",
        MON: "/flags/mon.svg",
        NED: "/flags/ned.svg",
        POR: "/flags/por.svg",
        QAT: "/flags/qat.svg",
        RUS: "/flags/rus.svg",
        SGP: "/flags/sgp.svg",
        UAE: "/flags/uae.svg",
        USA: "/flags/usa.svg",
    };

    return flags[country] ? (
        <div className="flex flex-row gap-2 items-center ">
            <img
                src={flags[country]}
                alt={`${country} tyre`}
                width={64}
                height={64}
                className="rounded-lg"
            />
        </div>
    ) : (
        <span>{country}</span>
    );
};

export default Flags;
