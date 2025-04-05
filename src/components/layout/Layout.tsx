import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "F1LiveStats | Real-Time Formula 1 Race Dashboard",
    description:
        "Follow Formula 1 races live with real-time statistics, lap times, positions, driver gaps, and telemetry data. Complete dashboard for every F1 session with instant updates.",
};

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return <main className="flex-1">{children}</main>;
}
