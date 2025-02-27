import { fetchAllCarData } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useCarData = () => {
    return useQuery({
        queryKey: ["carData"],
        queryFn: () => fetchAllCarData,
        staleTime: 100,
        refetchInterval: 1000,
    });
};
