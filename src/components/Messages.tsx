import { useMessages } from "@/hooks/useMessages";
import { MessagesTrack } from "@/types/messagesType";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

export default function Messages() {
    const { data: messages, isLoading, error } = useMessages();
    const [messagesWithId, setMessagesWithId] = useState<MessagesTrack[]>([]);

    useEffect(() => {
        if (messages?.Messages) {
            setMessagesWithId(
                messages.Messages.map((msg: MessagesTrack) => ({
                    ...msg,
                    id: uuidv4(),
                }))
            );
        }
    }, [messages]);

    if (isLoading) return <p>Loading messages...</p>;
    if (error) return <p>Error loading messages.</p>;

    return (
        <section className="bg-f1-bgLight rounded-xl w-full flex flex-col border border-f1-border max-h-96 overflow-hidden">
            <div className="overflow-auto p-3">
                {messagesWithId.map((msg) => {
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
                        <div className="items-start p-2 grid" key={msg.id}>
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
