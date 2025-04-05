import { useDataStore } from "@store/dataStore";
import { useMemo } from "react";
import { Message } from "../types/state.type";

function isRaceControlMessage(msg: unknown): msg is Message {
    if (!msg || typeof msg !== "object") return false;

    const requiredFields = ["Utc", "Category", "Message"];
    return requiredFields.every((field) => field in msg);
}

export default function Messages() {
    const raceControlMessages = useDataStore(
        (state) => state.RaceControlMessages?.Messages
    );

    const formattedMessages = useMemo(() => {
        if (!raceControlMessages || typeof raceControlMessages !== "object") {
            return [];
        }

        const messages = Object.values(raceControlMessages)
            .filter(isRaceControlMessage)
            .sort(
                (a, b) => new Date(b.Utc).getTime() - new Date(a.Utc).getTime()
            )
            .map((msg) => {
                const date = new Date(msg.Utc);
                const formattedDate = isNaN(date.getTime())
                    ? "Data non valida"
                    : date.toLocaleString("it-IT", {
                          timeZone: "Europe/Rome",
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                      });

                return {
                    category: msg.Category,
                    date: formattedDate,
                    message: msg.Message,
                    flag: msg.Flag,
                };
            });

        return messages;
    }, [raceControlMessages]);

    if (!formattedMessages.length) {
        return (
            <div className="bg-f1-bgLight rounded-xl w-full p-4 text-center text-gray-500">
                Nessun messaggio disponibile
            </div>
        );
    }

    return (
        <section className="bg-f1-bgLight rounded-xl w-full flex flex-col border border-f1-border max-h-96 overflow-hidden">
            <div className="overflow-auto p-3">
                {formattedMessages.map((msg, index) => (
                    <div
                        className="items-start p-2 grid"
                        key={`${msg.date}-${index}`}
                    >
                        <div className="flex flex-row gap-4 opacity-50">
                            <p className="text-sm">{msg.category}</p>
                            {msg.flag && (
                                <p className="text-sm">FLAG: {msg.flag}</p>
                            )}
                            <p className="text-sm">{msg.date}</p>
                        </div>
                        <p className="text-sm font-semibold font-inter">
                            {msg.message}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
