import { useSessionInfo } from "@/hooks/useSessionInfo";
import Flags from "./Flags";

export default function Session() {
    const {
        data: session,
        isLoading: LoadingSession,
        error: errorSession,
    } = useSessionInfo();

    if (LoadingSession) return <p>Loading session...</p>;
    if (errorSession) return <p>Error loading session.</p>;

    return (
        <section className="p-3 gap-6 bg-f1-bgLight rounded-xl w-full grid grid-cols-2 lg:grid-cols-3 items-center border border-f1-border">
            <div className="flex flex-row gap-4">
                <Flags country={session.Meeting.Country.Code} />
                <h1 className="text-sm ">
                    {session.Meeting.OfficialName}, {session.Meeting.Location}
                </h1>
            </div>

            <h2 className="text-sm">Session: {session.Meeting.Name}</h2>
        </section>
    );
}
