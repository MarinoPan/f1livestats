"use client";

import { useSchedules } from "src/hooks/useSchedules";

interface RaceTable {
    season: string;
    round: string;
    url: string;
    raceName: string;
    Circuit: Circuit;
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

export default function Schedules() {
    const { data: schedules, isLoading, isError } = useSchedules();

    if (isLoading) return <p className="text-white">Caricamento...</p>;
    if (isError)
        return <p className="text-red-500">Errore nel caricamento dati</p>;

    return (
        <div className="flex flex-col  justify-center p-6">
            <h1 className="text-2xl font-bold mb-6">Classifica Piloti</h1>

            <div className="w-full mx-auto grid grid-cols-3 gap-6 ">
                {schedules.map((races: RaceTable) => (
                    <div
                        key={races.round}
                        className="p-4 rounded-xl bg-f1-bgLight border border-f1-border"
                    >
                        <h2>{races.Circuit.Location.country}</h2>
                        <div></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
