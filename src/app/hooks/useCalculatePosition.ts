import { useMemo } from "react";

interface LapTimeData {
    Withheld: boolean;
    Lines: Record<
        string,
        {
            Line: number;
            RacingNumber: string;
            PersonalBestLapTime: {
                Lap: number;
                Position: number;
                Value: string;
            };
        }
    >;
}

const useCalculatePosition = (data: LapTimeData) => {
    return useMemo(() => {
        if (!data?.Lines) return [];

        return Object.values(data.Lines).sort(
            (a, b) =>
                a.PersonalBestLapTime.Position - b.PersonalBestLapTime.Position
        );
    }, [data]);
};

export default useCalculatePosition;
