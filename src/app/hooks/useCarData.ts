import { fetchAllCarData } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useCarData = () => {
    return useQuery({
        queryKey: ["carData"],
        queryFn: () => fetchAllCarData,
        staleTime: 1000,
    });
};
