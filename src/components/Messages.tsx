import { useMessages } from "@/hooks/useMessages";
import { RaceControl } from "@/types/type";

export default function Messages() {
    const {
        data: messagesInfo,
        isLoading: loadingMessages,
        error: errorMessages,
    } = useMessages();

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
                {messagesInfo.map((messages: RaceControl) => {
                    // Creiamo la data in modo sicuro
                    const date = new Date(messages.date); // ✅ Ora usa la data corretta

                    // Verifichiamo se la data è valida
                    const formattedDate = isNaN(date.getTime()) // ⬅️ `getTime()` è il modo corretto per verificare la validità della data
                        ? "Data non valida"
                        : date.toLocaleString("it-IT", {
                              timeZone: "Europe/Rome", // ✅ Assicura che l'orario sia convertito correttamente
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                          });

                    return (
                        <div key="idUnique" className="items-start p-2 grid">
                            <div className="flex flex-row gap-4 opacity-50">
                                <p className="text-sm">
                                    LAP {messages.lap_number}
                                </p>
                                <p className="text-sm">{formattedDate}</p>{" "}
                                {/* ✅ Ora stampa la data corretta */}
                            </div>
                            <p className="text-sm font-semibold font-inter">
                                {messages.message}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
