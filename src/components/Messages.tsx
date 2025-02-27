import { useEffect, useState } from "react";
import { useMessages } from "@/hooks/useMessages";
import { RaceControl } from "@/types/type";
import { v4 as uuidv4 } from "uuid";

export default function Messages() {
    const {
        data: messagesInfo,
        isLoading: loadingMessages,
        error: errorMessages,
    } = useMessages();

    const [messagesWithKeys, setMessagesWithKeys] = useState<
        { id: string } & RaceControl[]
    >([]);

    useEffect(() => {
        if (!messagesInfo || !Array.isArray(messagesInfo)) return;

        // Generiamo un ID univoco per ogni messaggio
        const newMessages = messagesInfo.map((message) => ({
            ...message,
            id: `${message.date}-${message.driver_number}` || uuidv4(),
        }));
        setMessagesWithKeys(newMessages);
    }, [messagesInfo]); // Si aggiorna solo quando cambiano i dati

    if (loadingMessages)
        return <p className="text-center text-gray-400">Caricamento dati...</p>;
    if (errorMessages)
        return (
            <p className="text-center text-red-400">Errore nel caricamento</p>
        );
    if (!messagesInfo) return <p>Caricamento...</p>;

    return (
        <section className="bg-f1-bgLight rounded-xl w-full flex flex-col border border-f1-border max-h-96 overflow-hidden">
            <div className="overflow-auto p-3">
                {messagesWithKeys.map((message) => {
                    // Creiamo la data in modo sicuro
                    const date = new Date(message.date);

                    // Verifichiamo se la data è valida
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

                    return (
                        <div className="items-start p-2 grid" key={message.id}>
                            <div className="flex flex-row gap-4 opacity-50">
                                <p className="text-sm">
                                    LAP {message.lap_number}
                                </p>
                                <p className="text-sm">{formattedDate}</p>
                            </div>
                            <p className="text-sm font-semibold font-inter">
                                {message.message}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
