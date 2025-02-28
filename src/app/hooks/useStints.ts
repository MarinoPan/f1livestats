import { useQueries } from "@tanstack/react-query";
import { fetchStints } from "@/lib/api";

export function useStints(driverNumbers?: number | number[]) {
    // Assicuriamoci che driverNumbers sia sempre un array di numeri validi
    const driversArray = Array.isArray(driverNumbers)
        ? driverNumbers.filter((num): num is number => num !== undefined) // Rimuove gli undefined
        : driverNumbers !== undefined
        ? [driverNumbers]
        : [];

    return useQueries({
        queries: driversArray.map((driverNumber) => ({
            queryKey: ["Stints", driverNumber],
            queryFn: () => fetchStints(driverNumber),
            staleTime: 10000,
            enabled: !!driverNumber, // Evita chiamate con valori falsy
        })),
    });
}
