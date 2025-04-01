import { useDataStore } from "@store/dataStore";

export default function Messages() {
    const messages = useDataStore(
        (state) => state.RaceControlMessages?.Messages
    );
    if (!messages) return <div>No data available</div>;

    return (
        <section className="bg-f1-bgLight rounded-xl w-full flex flex-col border border-f1-border max-h-96 overflow-hidden">
            <div className="overflow-auto p-3">
                {messages
                    .sort(
                        (a, b) =>
                            new Date(b.Utc).getTime() -
                            new Date(a.Utc).getTime()
                    )
                    .map((msg, index) => {
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

                        return (
                            <div className="items-start p-2 grid" key={index}>
                                <div className="flex flex-row gap-4 opacity-50">
                                    <p className="text-sm">{msg.Category}</p>
                                    <p className="text-sm">{formattedDate}</p>
                                </div>
                                <p className="text-sm font-semibold font-inter">
                                    {msg.Message}
                                </p>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
}
