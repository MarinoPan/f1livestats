"use client";

import { useSchedules } from "src/hooks/useSchedules";

interface RaceTable {
    season: string;
    round: string;
    url: string;
    raceName: string;
    date: string;
    time: string;
    Circuit: Circuit;
    FirstPractice: Session;
    SecondPractice: Session;
    ThirdPractice?: Session;
    Qualifying: Session;
    Sprint?: Session;
}

interface Circuit {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: Location;
}

interface Location {
    lat: string;
    long: string;
    locality: string;
    country: string;
}

interface Session {
    date: string;
    time: string;
}

const formatDate = (date?: string, time?: string) => {
    if (!date || !time) return "TBA";
    try {
        return new Date(`${date}T${time}`).toLocaleString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return "Invalid Date";
    }
};

export default function Schedules() {
    const { data: schedules, isLoading, isError } = useSchedules();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p className="text-red-500">Error loading data</p>;

    return (
        <div className="flex flex-col p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Race Calendar</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schedules.map((races: RaceTable) => (
                    <div
                        key={races.round}
                        className="bg-f1-bgLight border border-f1-border rounded-xl overflow-hidden hover:border-f1-primary transition-colors duration-200"
                    >
                        <div className="p-4 border-b border-f1-border bg-opacity-50 bg-black">
                            <h2 className="text-xl font-bold">
                                {races.Circuit.Location.country}
                            </h2>
                            <p className="text-sm text-gray-400">
                                {races.Circuit.circuitName}
                            </p>
                        </div>
                        <div className="p-4 space-y-3">
                            <SessionTime
                                label="FP1"
                                date={races.FirstPractice?.date}
                                time={races.FirstPractice?.time}
                            />
                            <SessionTime
                                label="FP2"
                                date={races.SecondPractice?.date}
                                time={races.SecondPractice?.time}
                            />
                            {races.ThirdPractice && (
                                <SessionTime
                                    label="FP3"
                                    date={races.ThirdPractice.date}
                                    time={races.ThirdPractice.time}
                                />
                            )}
                            {races.Sprint && (
                                <SessionTime
                                    label="Sprint"
                                    date={races.Sprint.date}
                                    time={races.Sprint.time}
                                />
                            )}
                            <SessionTime
                                label="Qualifying"
                                date={races.Qualifying?.date}
                                time={races.Qualifying?.time}
                            />
                            <SessionTime
                                label="Race"
                                date={races.date}
                                time={races.time}
                                isMain
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const SessionTime = ({
    label,
    date,
    time,
    isMain,
}: {
    label: string;
    date?: string;
    time?: string;
    isMain?: boolean;
}) => (
    <div className="flex justify-between items-center">
        <span
            className={`text-sm ${
                isMain ? "font-bold text-f1-primary" : "text-gray-400"
            }`}
        >
            {label}
        </span>
        <span className="text-sm">{formatDate(date, time)}</span>
    </div>
);
