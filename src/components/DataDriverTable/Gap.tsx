import { useIntervals } from "@/hooks/useIntervals";
import { Gap } from "@/types/type";

const Interval: React.FC<Gap> = ({ driver_number = 0 }) => {
    const { data: intervals, isLoading, error } = useIntervals(driver_number);

    if (isLoading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error.message}</p>;

    // Mappa del GAP
    const gapMap = new Map<number, Gap>();

    intervals.forEach((gap: Gap) => {
        const existing = gapMap.get(gap.driver_number);
        if (!existing || new Date(gap.date) > new Date(existing.date)) {
            gapMap.set(gap.driver_number, gap); // 👈 Salviamo tutto lo stint
        }
    });

    const gap = gapMap.get(driver_number);

    const gapLeader = gap?.gap_to_leader ?? "-- ---";
    const interval = gap?.interval ?? "-- ---";

    return (
        <div>
            <p className="font-bold">{interval}</p>
            <p>{gapLeader}</p>
        </div>
    );
};

export default Interval;
