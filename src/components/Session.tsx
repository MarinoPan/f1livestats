import Flags from "./Flags";
import { useDataStore } from "@store/dataStore";
import Skeleton from "./ui/Skeleton";

const track: Record<string, string> = {
    AllClear: "Track Clear",
    Yellow: "Yellow Flag",
    Red: "Red Flag",
    SafetyCar: "Safety Car",
    VirtualSafetyCar: "Virtual Safety Car",
    SessionSuspended: "Session Suspended",
    SessionCancelled: "Session Cancelled",
    SessionRestarted: "Session Restarted",
    SessionResumed: "Session Resumed",
    SessionPaused: "Session Paused",
    SessionStarted: "Session Started",
    SessionFinished: "Session Finished",
};

const colorTrack: Record<string, string> = {
    AllClear: "var(--f1-green)",
    Yellow: "var(--f1-yellow)",
    Red: "var(--f1-red)",
    SafetyCar: "var(--f1-orange)",
    VirtualSafetyCar: "var(--f1-orange)",
};

export default function Session() {
    const sessionInfo = useDataStore((state) => state.SessionInfo);
    const lapCount = useDataStore((state) => state.LapCount);
    const trackStatus = useDataStore((state) => state.TrackStatus);
    const extrapolatedClock = useDataStore((state) => state.ExtrapolatedClock);

    const formatTime = (milliseconds: number) => {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const timeRemaining =
        extrapolatedClock?.Remaining && extrapolatedClock?.Utc
            ? extrapolatedClock.Extrapolating
                ? formatTime(
                      Number(extrapolatedClock.Remaining) -
                          (Date.now() -
                              new Date(extrapolatedClock.Utc).getTime())
                  )
                : extrapolatedClock.Remaining
            : undefined;

    const messageTrack = trackStatus?.Message || "No Data";

    if (!sessionInfo) {
        return (
            <section className="styleCard w-full p-3 gap-6 flex">
                <Skeleton width="h-4" />
                <Skeleton width="h-10" />
            </section>
        );
    }

    return (
        <section className="styleCard p-3 gap-6 w-full grid grid-cols-12 items-center">
            <div className="flex flex-col items-left lg:flex-row gap-4 col-span-8">
                <Flags country={sessionInfo?.Meeting.Country.Code || "NA"} />
                <div className="flex flex-col">
                    <h1 className="text-md font-semibold">
                        {sessionInfo?.Meeting.Circuit.ShortName}{" "}
                        {sessionInfo?.Meeting.Name}
                    </h1>
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-lg font-bold">{timeRemaining}</p>
                        <p>-</p>
                        <h2 className="text-sm font-italic">
                            Session: {sessionInfo?.Name}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-end col-span-4">
                <h3 className="font-bold text-xl">
                    {lapCount &&
                        `${lapCount.CurrentLap} / ${lapCount.TotalLaps}`}
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
