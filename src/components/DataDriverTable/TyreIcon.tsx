import { useStints } from "@/hooks/useStints";
import { TyreStint } from "@/types/type";

const TyreIcon: React.FC<TyreStint> = ({ driver_number = 0 }) => {
    const {
        data: latestStints = [],
        isLoading,
        error,
    } = useStints(driver_number);

    if (isLoading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error.message}</p>;

    // Creiamo una mappa per tenere solo l'ultimo stint di ogni pilota
    const latestStintsMap = new Map<number, TyreStint>(); // driver_number -> compound

    latestStints.forEach((stint) => {
        const existing = latestStintsMap.get(stint.driver_number);
        if (!existing || stint.lap_start > existing.lap_start) {
            latestStintsMap.set(stint.driver_number, stint); // 👈 Salviamo tutto lo stint
        }
    });

    // Ora recuperiamo l'oggetto stint più recente
    const latestStint = latestStintsMap.get(driver_number);
    const compound = latestStint ? latestStint.compound : "UNKNOWN";

    // Mappiamo i compound ai file delle icone
    const icons: Record<string, string> = {
        HARD: "/tyres/hard.svg",
        SOFT: "/tyres/soft.svg",
        MEDIUM: "/tyres/medium.svg",
        WET: "/tyres/wet.svg",
        INTERMEDIATE: "/tyres/intermediate.svg",
        UNKNOWN: "/tyres/unknown.svg",
    };

    const tyreAge =
        Number(latestStint?.lap_end) - Number(latestStint?.lap_start);

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <div className="flex flex-row gap-2 items-center">
            <img
                src={icons[compound] || icons["UNKNOWN"]}
                alt={`${compound} tyre`}
                width={24}
                height={24}
            />
            <p>L {tyreAge}</p>
        </div>
    );
};

export default TyreIcon;
