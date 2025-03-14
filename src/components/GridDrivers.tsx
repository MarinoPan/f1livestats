import TyreIcon from "./Table/TyreIcon";
import SegmentsSectors from "./Table/SegmentsSectors";
import PositionChange from "./Table/PositionChange";
import PositionDriver from "./Table/DriverPosition";
import { useDrivers } from "@/hooks/useDriver";
import { useTimingStats } from "@/hooks/useTimingStats";
import { useTimingData } from "@/hooks/useTimingData";
import useCalculatePosition from "@/hooks/useCalculatePosition";
import CarSpeed from "./Table/CarSpeed";
import CarDrs from "./Table/CarDrs";

export default function TableDrivers() {
    const { data: position } = useTimingStats();

    const CalculatePosition = useCalculatePosition(position);

    const { data: driver, isLoading, error } = useDrivers();

    const {
        data: sector,
        isLoading: LoadingTimingData,
        error: errorTimingData,
    } = useTimingData();

    if (isLoading || LoadingTimingData) return <p>Loading drivers...</p>;
    if (error || errorTimingData) return <p>Error loading drivers.</p>;

    return (
        <div className="w-full mx-auto rounded-xl bg-f1-bgLight col-span-12 lg:col-span-8 border border-f1-border block overflow-auto">
            <table className="table-auto w-full text-white text-xs text-left border-collapse">
                <thead className="border-b border-f1-border">
                    <tr className="">
                        <th className="px-5 py-2 font-normal">Driver</th>
                        <th className="px-5 text-center font-normal">Info</th>
                        <th className="px-6 text-center font-normal">Speed</th>
                        <th className="px-3 py-2 font-normal">DRS</th>
                        <th className="px-3 py-2 font-normal">Tyre</th>
                        <th className="px-5 py-2 font-normal">Gap</th>
                        <th className="px-3 py-2 font-normal">Lap Time</th>
                        <th className="px-3 py-2 font-normal">Settore 1</th>
                        <th className="px-3 py-2 font-normal">Settore 2</th>
                        <th className="px-3 py-2 font-normal">Settore 3</th>
                    </tr>
                </thead>
                <tbody className="">
                    {CalculatePosition.map((entry) => (
                        <tr
                            key={entry.RacingNumber}
                            className="border-b border-f1-border text-f1-white text-sm"
                        >
                            <td className="px-5">
                                <PositionDriver
                                    position={
                                        entry.PersonalBestLapTime.Position
                                    }
                                    color={
                                        driver[entry.RacingNumber]?.TeamColour
                                    }
                                    teamName={
                                        driver[entry.RacingNumber].TeamName
                                    }
                                    acronym={driver[entry.RacingNumber]?.Tla}
                                />
                            </td>
                            <td className="px-5">
                                <PositionChange
                                    racingNumber={entry.RacingNumber}
                                />
                            </td>
                            <td className="px-6">
                                {" "}
                                <CarSpeed racingNumber={entry.RacingNumber} />
                            </td>
                            <td className="px-3">
                                {" "}
                                <CarDrs racingNumber={entry.RacingNumber} />
                            </td>

                            <td className="px-3">
                                <TyreIcon racingNumber={entry.RacingNumber} />
                            </td>
                            <td className="px-5 py-1">
                                <p className="font-bold">
                                    {
                                        sector.Lines[entry.RacingNumber]
                                            ?.TimeDiffToPositionAhead
                                    }
                                </p>
                                <p className="text-xs">
                                    {
                                        sector.Lines[entry.RacingNumber]
                                            ?.TimeDiffToFastest
                                    }
                                </p>
                            </td>
                            <td className="px-3 font-bold">
                                {
                                    sector.Lines[entry.RacingNumber]
                                        ?.LastLapTime.Value
                                }
                            </td>
                            <td className="px-3">
                                <div className="flex flex-col gap-1">
                                    {
                                        sector.Lines[entry.RacingNumber]
                                            ?.Sectors[0].Value
                                    }
                                    <SegmentsSectors
                                        segment={sector.Lines[
                                            entry.RacingNumber
                                        ]?.Sectors[0].Segments.map(
                                            (s) => s.Status
                                        )}
                                    />
                                </div>
                            </td>
                            <td className="px-3 ">
                                <div className="flex flex-col gap-1">
                                    {
                                        sector.Lines[entry.RacingNumber]
                                            ?.Sectors[1].Value
                                    }
                                    <SegmentsSectors
                                        segment={sector.Lines[
                                            entry.RacingNumber
                                        ]?.Sectors[1].Segments.map(
                                            (s) => s.Status
                                        )}
                                    />
                                </div>
                            </td>
                            <td className="px-3 ">
                                <div className="flex flex-col gap-1">
                                    {
                                        sector.Lines[entry.RacingNumber]
                                            ?.Sectors[2].Value
                                    }
                                    <SegmentsSectors
                                        segment={sector.Lines[
                                            entry.RacingNumber
                                        ]?.Sectors[2].Segments.map(
                                            (s) => s.Status
                                        )}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
