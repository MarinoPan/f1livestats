import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("🌍 Chiamata API ricevuta su /api/drivers");

        const response = await fetch("http://localhost:4000/dashboard"); // 🔥 Chiama il backend
        if (!response.ok) {
            console.error(
                "❌ Errore nel recupero dei dati dal backend",
                response.statusText
            );
            return NextResponse.json(
                { error: "Errore nel backend" },
                { status: 500 }
            );
        }

        const data = await response.json();
        console.log("✅ Dati ricevuti:", data);
        return NextResponse.json(data);
    } catch (error) {
        console.error("❌ Errore API Next.js:", error);
        return NextResponse.json(
            { error: "Errore nel server Next.js" },
            { status: 500 }
        );
    }
}
