import { ReactNode } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";

type LayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="it">
            <body className="bg-background text-foreground min-h-screen flex flex-col">
                <QueryProvider>
                    <Header />
                    <main className="flex-1">{children}</main> <Footer />
                </QueryProvider>
            </body>
        </html>
    );
}
