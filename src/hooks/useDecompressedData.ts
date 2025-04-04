import { useState, useEffect } from "react";
import { useDataStore } from "@store/dataStore";

interface DecompressedData {
  [key: string]: any;
}

export function useDecompressedData(channel: "CarData.z" | "Position.z") {
  const [decompressedData, setDecompressedData] =
    useState<DecompressedData | null>(null);
  const data = useDataStore(
    (state) => state[channel === "CarData.z" ? "CarData" : "Positions"]
  );

  useEffect(() => {
    const decompressData = async (compressedData: string) => {
      try {
        // Converti la stringa base64 in un array di byte
        const binaryString = atob(compressedData);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Decomprimi i dati usando l'API Compression
        const decompressedStream = new Response(bytes).body;
        if (!decompressedStream) return null;

        const decompressed = await new Response(decompressedStream).text();
        return JSON.parse(decompressed);
      } catch (error) {
        console.error(
          `Errore durante la decompressione dei dati di ${channel}:`,
          error
        );
        return null;
      }
    };

    if (typeof data === "string") {
      decompressData(data).then((decompressed) => {
        if (decompressed) {
          setDecompressedData(decompressed);
        }
      });
    } else {
      setDecompressedData(data);
    }
  }, [data, channel]);

  return decompressedData;
}
