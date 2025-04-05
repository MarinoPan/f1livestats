"use client";

import { ReactNode } from "react";
import "./globals.css";
import QueryProvider from "../providers/QueryProvider";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
type LayoutProps = {
    children: ReactNode;
};
import { Analytics } from "@vercel/analytics/react";
import Layout from "@components/layout/Layout";

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body className="bg-background text-foreground min-h-screen flex flex-col">
                <QueryProvider>
                    <Header />

                    <Layout>
                        {children}
                        <Analytics />
                    </Layout>

                    <Footer />
                </QueryProvider>
            </body>
        </html>
    );
}
