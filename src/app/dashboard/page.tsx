"use client";
import TableDrivers from "@components/GridDrivers";
import GridDrivers from "@components/GridDrivers";
import Map from "@components/Map";
import Messages from "@components/Messages";
import Session from "@components/Session";

export default function Dashboard() {
    return (
        <section className="w-full p-3 flex gap-4 flex-col items-center justify-center h-full">
            <Session />
            <div className="grid grid-cols-12 gap-4 w-full">
                <TableDrivers />
                {/* <div className="flex gap-4 flex-col col-span-12 lg:col-span-4">
                    <Map circuit="63" />
                    <Messages />
                </div> */}
            </div>
        </section>
    );
}
