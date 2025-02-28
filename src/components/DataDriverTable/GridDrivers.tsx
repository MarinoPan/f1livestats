import TyreIcon from "./TyreIcon";
import PositionChange from "./PositionChange";
import { useRaceTable } from "@/hooks/useRaceTable";
import Interval from "./Gap";

export default function TableDrivers() {
    const { data: raceTable, isLoading, error } = useRaceTable();

    if (isLoading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error.message}</p>;

    // ✅ Controlliamo che `raceTable` sia definito prima di usare `.map()`
    if (!raceTable || raceTable.length === 0) {
        return <p>Nessun dato disponibile</p>;
    }

    return (
        <div className="w-full mx-auto rounded-xl bg-f1-bgLight col-span-12 lg:col-span-8 border border-f1-border block overflow-auto">
            <table className="table-auto w-full text-white text-xs text-left border-collapse">
                <thead className="border-b border-f1-border">
                    <tr>
                        <th className="p-3">Position</th>
                        <th className="p-3">Info</th>
                        <th className="p-3">DRS</th>
                        <th className="p-3">Tyre</th>
                        <th className="p-3">Gap</th>
                        <th className="p-3">Lap Time</th>
                        <th className="p-3">Settore 1</th>
                        <th className="p-3">Settore 2</th>
                        <th className="p-3">Settore 3</th>
                    </tr>
                </thead>
                <tbody>
                    {raceTable
                        .filter(({ driver }) => driver !== null)
                        .map(({ position, driver, positionDiff }) => (
                            <tr
                                className="border-b border-f1-border text-f1-white"
                                key={position}
                            >
                                <td className="px-3">
                                    <div className="flex flex-row gap-4 items-center">
                                        <p className="font-bold w-3">
                                            {position ?? "-"}
                                        </p>
                                        <div
                                            className="w-1 h-5"
                                            style={{
                                                backgroundColor: `#${driver?.team_colour}`,
                                            }}
                                        />
                                        <p className="">{driver?.last_name}</p>
                                    </div>
                                </td>
                                <td className="px-3">
                                    <PositionChange
                                        positionDiff={positionDiff}
                                    />
                                </td>
                                <td className="px-3">
                                    <TyreIcon
                                        driver_number={driver?.driver_number}
                                    />
                                </td>
                                <td className="px-3">
                                    <Interval
                                        driver_number={driver?.driver_number}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
                {/*    
                                <td className="px-3 py-1">
                                    <p className="font-bold">{driver.gap}</p>
                                    <p>{driver.gapLeader}</p>
                                </td>
                                <td className="px-3 font-bold">
                                    {driver.sector1
                                        ? `${driver.lapTime}`
                                        : "N/A"}
                                </td>
                                <td className="px-3">
                                    <div className="flex flex-col gap-1">
                                        {driver.sector1
                                            ? `${driver.sector1}`
                                            : "N/A"}
                                        <SegmentsSectors
                                            segment={driver.segmentSector1}
                                        />
                                    </div>
                                </td>
                                <td className="px-3 ">
                                    <div className="flex flex-col gap-1">
                                        {driver.sector2
                                            ? `${driver.sector2}`
                                            : "N/A"}
                                        <SegmentsSectors
                                            segment={driver.segmentSector2}
                                        />
                                    </div>
                                </td>
                                <td className="px-3 ">
                                    <div className="flex flex-col gap-1">
                                        {driver.sector3
                                            ? `${driver.sector3}`
                                            : "N/A"}
                                        <SegmentsSectors
                                            segment={driver.segmentSector3}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))

                           
                    )}
                </tbody> */}
            </table>
        </div>
    );
}
