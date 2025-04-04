import { useDataStore } from "@store/dataStore";
import { useEffect, useState } from "react";

export default function Messages() {
  const messages = useDataStore((state) => state.RaceControlMessages?.Messages);
  const [formattedMessages, setFormattedMessages] = useState<
    Array<{
      category: string;
      date: string;
      message: string;
    }>
  >([]);

  useEffect(() => {
    if (!messages || !Array.isArray(messages)) return;

    const formatted = messages
      .sort((a, b) => new Date(b.Utc).getTime() - new Date(a.Utc).getTime())
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
        };
      });

    setFormattedMessages(formatted);
  }, [messages]);

  if (!messages || !Array.isArray(messages))
    return <div>No data available</div>;

  return (
    <section className="bg-f1-bgLight rounded-xl w-full flex flex-col border border-f1-border max-h-96 overflow-hidden">
      <div className="overflow-auto p-3">
        {formattedMessages.map((msg, index) => (
          <div className="items-start p-2 grid" key={index}>
            <div className="flex flex-row gap-4 opacity-50">
              <p className="text-sm">{msg.category}</p>
              <p className="text-sm">{msg.date}</p>
            </div>
            <p className="text-sm font-semibold font-inter">{msg.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
