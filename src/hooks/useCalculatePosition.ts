import { useMemo } from "react";

const useCalculatePosition = (position: number | null) => {
    return useMemo(() => {
        if (position === null || position === undefined) return null;
        return position;
    }, [position]);
};

export default useCalculatePosition;
