// hooks/useLocation.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPosition } from "@/lib/apiMap";
import { PositionData } from "@/types/mapType";

export const useLocation = (driverNumber: number) => {
    return useQuery<PositionData[], Error, PositionData | undefined>({
        queryKey: ["location", driverNumber],
        queryFn: () => fetchPosition(driverNumber),
        staleTime: 1000,
        refetchInterval: 1000,
        select: (positions: PositionData[]) => {
            if (!positions || positions.length === 0) return undefined;
            // Restituisce la posizione più recente basata sulla data
            return positions.reduce((latest, current) =>
                new Date(current.date) > new Date(latest.date)
                    ? current
                    : latest
            );
        },
    });
};
