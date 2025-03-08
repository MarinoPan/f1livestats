import { Key } from "react";

export interface MessagesTrack {
    id: Key | null | undefined;
    Utc: string; // Data e ora in formato UTC
    Category: string; // Categoria dell'evento (es. "Flag")
    Flag: string; // Tipo di bandiera (es. "CLEAR")
    Scope: string; // Ambito dell'evento (es. "Sector")
    Sector: number; // Settore della pista
    Message: string; // Messaggio descrittivo
}

export type MessagesList = MessagesTrack[];
