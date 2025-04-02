"use client";

import { useStanding } from "@/hooks/useStanding";

interface DriverStanding {
    position: string;
    positionText: string;
    points: string;
    wins: string;
    Driver: Driver;
    Constructors: Constructor[];
}

interface Constructor {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
}

interface Driver {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
}

export default function Ranking() {
    const { data: standings, isLoading, isError } = useStanding();

    if (isLoading) return <p className="text-white">Caricamento...</p>;
    if (isError)
        return <p className="text-red-500">Errore nel caricamento dati</p>;

    return (
        <div className="flex flex-col  justify-center p-6">
            <h1 className="text-2xl font-bold mb-6">Classifica Piloti</h1>

            <div className="w-full mx-auto rounded-xl bg-f1-bgLight overflow-hidden col-span-8 border border-f1-border">
                <table className="w-full text-white text-xs text-left border-collapse">
                    <thead className="border-b border-f1-border">
                        <tr>
                            <th className="p-3">Pos</th>
                            <th className="p-3">Driver</th>
                            <th className="p-3">Team</th>
                            <th className="p-3 text-center">Pts.</th>
                        </tr>
                    </thead>

                    <tbody className="text-primary text-sm font-medium ">
                        {standings.map((driver: DriverStanding) => (
                            <tr
                                key={driver.Driver.driverId}
                                className="border-b border-f1-border text-f1-white"
                            >
                                {/* Posizione con linea colorata */}
                                <td className="p-3 flex flex-row">
                                    <div>{driver.position}</div>
                                </td>
                                <td className="p-3 flex-row">
                                    <span>{driver.Driver.givenName} </span>
                                    <span>{driver.Driver.familyName}</span>
                                </td>
                                <td className="p-3 flex-row">
                                    <span>{driver.Constructors[0].name} </span>
                                </td>
                                <td className="p-3 text-center flex-row">
                                    <span>{driver.points} </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
