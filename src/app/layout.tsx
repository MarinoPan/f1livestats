"use client";

import { ReactNode } from "react";
import "./globals.css";
import QueryProvider from "../providers/QueryProvider";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

type LayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="it">
            <body className="bg-background text-foreground min-h-screen flex flex-col">
                <QueryProvider>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </QueryProvider>
            </body>
        </html>
    );
}
