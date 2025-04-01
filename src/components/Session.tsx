import Flags from "./Flags";
import { useDataStore } from "@store/dataStore";

const track: Record<string, string> = {
    AllClear: "Track Clear",
    Yellow: "Flag Yellow",
    Red: "Flag Red",
};

const colorTrack: Record<string, string> = {
    AllClear: "var(--f1-green)",
    Yellow: "var(--f1-yellow)",
    Red: "var(--f1-red)",
};

export default function Session() {
    const sessionInfo = useDataStore((state) => state.SessionInfo);
    const lapCount = useDataStore((state) => state.LapCount);
    const trackStatus = useDataStore((state) => state.TrackStatus);

    const messageTrack = trackStatus?.Message || "No Data";

    return (
        <section className="p-3 gap-6 bg-f1-bgLight rounded-xl w-full grid grid-cols-2 lg:grid-cols-3 items-center border border-f1-border">
            <div className="flex flex-row gap-4">
                <Flags country={sessionInfo?.Meeting.Country.Code || "NA"} />
                <h1 className="text-sm ">
                    {sessionInfo?.Meeting.OfficialName},{" "}
                    {sessionInfo?.Meeting.Location}
                </h1>
            </div>

            <h2 className="text-sm">Session: {sessionInfo?.Meeting.Name}</h2>
            <div className="flex flex-row gap-6 items-center justify-end">
                <h3 className="font-bold text-2xl">
                    {lapCount?.CurrentLap} / {lapCount?.TotalLaps}
                </h3>
                <div
                    style={{ backgroundColor: colorTrack[messageTrack] }}
                    className="rounded-lg p-2 font-semibold"
                >
                    <h3>{track[messageTrack]}</h3>
                </div>
            </div>
        </section>
    );
}
