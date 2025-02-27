"use client";

import { useF1LiveTiming } from "@/hooks/useF1LiveTiming";

export default function Home() {
    const liveData = useF1LiveTiming();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-2xl font-bold">Live Timing - Formula 1</h1>
            {liveData ? (
                <pre className="mt-4 p-4 bg-gray-800 rounded-lg">
                    {liveData}
                </pre>
            ) : (
                <p>⏳ In attesa dei dati...</p>
            )}
        </div>
    );
}
