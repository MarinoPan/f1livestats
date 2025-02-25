import { useMemo } from "react";
import { useDrivers } from "./useDrivers";
import { useLivePositions } from "./useLivePosition";
import { useLapTimes } from "./useLapTimes";
import { Driver, LivePosition, LiveLap, TyreStint, Gap } from "@/types/type";
import { useStints } from "./useStints";
import { useGap } from "./useGap";

export interface DriverCombinedData {
    driver_number: number;
    position: number;
    team_colour: string;
    last_name: string;
    positionDiff: number;
    tyreCompound: string;
    tyreAge: number;
    gap: number;
    gapLeader: number;
    sector1: number;
    sector2: number;
    sector3: number;
    lapTime: number;
    segmentSector1: number[];
    segmentSector2: number[];
    segmentSector3: number[];
    a: string;
    b: string;
}

export function useCombinedData() {
    const {
        data: drivers = [],
        isLoading: loadingDrivers,
        error: errorDrivers,
    } = useDrivers();
    const {
        data: livePositions = [],
        isLoading: loadingPositions,
        error: errorPositions,
    } = useLivePositions();
    const {
        data: latestLaps = [],
        isLoading: loadingLaps,
        error: errorLaps,
    } = useLapTimes();
    const {
        data: latestStints = [],
        isLoading: loadingStints,
        error: errorStints,
    } = useStints();
    const { data: gap = [], isLoading: loadingGap, error: errorGap } = useGap();
    /*    const {
        data: latestCarData = [],
        isLoading: loadingCarData,
        error: errorCarData,
    } = useCarData(driverNumber); */

    /*     console.log("📡 Live Positions:", livePositions);
    console.log("🏎️ Drivers:", drivers);
    console.log("⏱️ Latest Laps:", latestLaps);
    console.log("🛞 Latest Tyre Stints:", latestStints);
    console.log(" Latest Gap:", gap); */

    const driversWithData = useMemo(() => {
        if (!drivers.length || !livePositions.length) return [];

        // Mappa della posizione iniziale
        const initialPositionsMap = new Map<
            number,
            { position: number; date: string }
        >();

        // Mappa delle posizioni più recenti
        const latestPositionsMap = new Map<
            number,
            { position: number; date: string; positionDiff: number }
        >();

        livePositions.forEach((pos: LivePosition) => {
            const existingInitial = initialPositionsMap.get(pos.driver_number);
            const existingLatest = latestPositionsMap.get(pos.driver_number);

            // Memorizza la posizione iniziale solo la prima volta
            if (!existingInitial) {
                initialPositionsMap.set(pos.driver_number, {
                    position: pos.position,
                    date: pos.date,
                });
            }

            // Aggiorna la posizione più recente se necessario
            if (
                !existingLatest ||
                new Date(pos.date) > new Date(existingLatest.date)
            ) {
                const initialPosition =
                    initialPositionsMap.get(pos.driver_number)?.position ??
                    pos.position;
                latestPositionsMap.set(pos.driver_number, {
                    position: pos.position,
                    date: pos.date,
                    positionDiff: initialPosition - pos.position, // Calcolo della differenza
                });
            }
        });

        // Mappa dei tempi sul giro più recenti
        const latestLapsMap = new Map<number, LiveLap>();
        latestLaps.forEach((lap: LiveLap) => {
            const existing = latestLapsMap.get(lap.driver_number);
            if (
                !existing ||
                new Date(lap.date_start) > new Date(existing.date_start)
            ) {
                latestLapsMap.set(lap.driver_number, lap);
            }
        });

        // Mappa dei dati sulle gomme più recenti
        const latestStintsMap = new Map<number, TyreStint>();
        latestStints.forEach((stint: TyreStint) => {
            const existing = latestStintsMap.get(stint.driver_number);
            if (!existing || stint.lap_start > existing.lap_start) {
                latestStintsMap.set(stint.driver_number, stint);
            }
        });

        // Mappa del GAP
        const gapMap = new Map<number, Gap>();
        gap.forEach((gap: Gap) => {
            const existing = gapMap.get(gap.driver_number);
            if (!existing || new Date(gap.date) > new Date(existing.date)) {
                gapMap.set(gap.driver_number, gap);
            }
        });

        // Mappa del DRS
        /*         const latestCarDataMap = new Map<number, CarData>();
        latestCarData.forEach((latestCarData: CarData) => {
            const existing = latestCarDataMap.get(latestCarData.driver_number);
            if (!existing || new Date(gap.date) > new Date(existing.date)) {
                latestCarDataMap.set(
                    latestCarData.driver_number,
                    latestCarData
                );
            }
        }); */

        return drivers
            .map((driver: Driver) => {
                const positionData = latestPositionsMap.get(
                    driver.driver_number
                );
                const lapData = latestLapsMap.get(driver.driver_number);
                const stintData = latestStintsMap.get(driver.driver_number);
                const gapData = gapMap.get(driver.driver_number);
                //  const carData = latestCarDataMap.get(driver.driver_number);

                return {
                    ...driver,
                    position: positionData?.position ?? null,
                    positionDiff: positionData?.positionDiff ?? null, // Differenza dalla posizione iniziale
                    sector1: lapData?.duration_sector_1 ?? null,
                    sector2: lapData?.duration_sector_2 ?? null,
                    sector3: lapData?.duration_sector_3 ?? null,
                    lapTime: lapData?.lap_duration
                        ? `${Math.floor(lapData.lap_duration / 60)}:${(
                              lapData.lap_duration % 60
                          )
                              .toString()
                              .padStart(2, "0")}`.slice(0, 8)
                        : null,
                    segmentSector1: lapData?.segments_sector_1 ?? null,
                    segmentSector2: lapData?.segments_sector_2 ?? null,
                    segmentSector3: lapData?.segments_sector_3 ?? null,
                    tyreCompound: stintData?.compound ?? "N/A",
                    tyreAge:
                        Number(stintData?.lap_end) -
                        Number(stintData?.lap_start),
                    gap: gapData?.interval ?? "-- ---",
                    gapLeader: gapData?.gap_to_leader ?? "-- ---",
                    //      drs: carData?.drs ?? null,
                };
            })
            .sort(
                (a: DriverCombinedData, b: DriverCombinedData) =>
                    (a.position ?? 999) - (b.position ?? 999)
            ); // Ordinamento per posizione
    }, [drivers, livePositions, latestLaps, latestStints, gap]);

    console.log("segment sector", latestLaps);

    return {
        data: driversWithData,
        isLoading:
            loadingDrivers ||
            loadingPositions ||
            loadingLaps ||
            loadingStints ||
            loadingGap,
        //   loadingCarData,
        error:
            errorDrivers ||
            errorPositions ||
            errorLaps ||
            errorStints ||
            errorGap,
        //   errorCarData,
    };
}
