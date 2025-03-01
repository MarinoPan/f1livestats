import { DriverData, fetchDrivers } from "@/services/api";
import React from "react";
import { useEffect, useState } from "react";

const TableDrivers: React.FC = () => {
    const [driversData, setDriversData] = useState<DriverData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("🚀 useEffect() eseguito - Recupero dati...");
        fetchDrivers()
            .then((data) => {
                console.log("✅ Dati ottenuti in Dashboard:", data);
                setDriversData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("❌ Errore nel recupero dati:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []); // 🔥 L'array vuoto [] evita il loop infinito!

    if (loading) return <div>⏳ Caricamento...</div>;
    if (error) return <div>❌ Errore: {error}</div>;

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
                    {driversData.map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item.position ? item.position.position : "N/A"}
                            </td>
                            <td>{item.driver ? item.driver.name : "N/A"}</td>
                            <td>{item.driver ? item.driver.team : "N/A"}</td>
                            <td>
                                {item.carData
                                    ? `${item.carData.speed} km/h`
                                    : "N/A"}
                            </td>
                            <td>
                                {item.carData
                                    ? `${item.carData.throttle}%`
                                    : "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableDrivers;
