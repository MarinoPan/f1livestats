import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  TimingStats,
  TimingAppData,
  WeatherData,
  TrackStatus,
  DriverList,
  RaceControlMessages,
  SessionInfo,
  SessionData,
  LapCount,
  TimingData,
  TeamRadio,
  Positions,
  CarData,
} from "@/types/state.type";

export interface StoreState {
  Positions: Positions | null;
  TimingStats: TimingStats | null;
  TimingAppData: TimingAppData | null;
  WeatherData: WeatherData | null;
  TrackStatus: TrackStatus | null;
  DriverList: DriverList | null;
  RaceControlMessages: RaceControlMessages | null;
  SessionInfo: SessionInfo | null;
  SessionData: SessionData | null;
  LapCount: LapCount | null;
  TimingData: TimingData | null;
  TeamRadio: TeamRadio | null;
  CarData: CarData | null;
  lastUpdateTime: number;
  update: (
    data: Partial<Omit<StoreState, "update" | "lastUpdateTime">> & {
      "CarData.z"?: CarData;
    }
  ) => void;
}

// dataStore.ts
export const useDataStore = create<StoreState>()(
  persist(
    (set, get) => ({
      Positions: null,
      TimingStats: null,
      TimingAppData: null,
      WeatherData: null,
      TrackStatus: null,
      DriverList: null,
      RaceControlMessages: null,
      SessionInfo: null,
      SessionData: null,
      LapCount: null,
      TimingData: null,
      TeamRadio: null,
      CarData: null,
      lastUpdateTime: Date.now(),

      update: (newData) => {
        set((state) => {
          const currentState = get();

          // Gestione speciale per CarData.z
          if ("CarData.z" in newData) {
            newData = {
              ...newData,
              CarData: newData["CarData.z"],
            };
            delete newData["CarData.z"];
          }

          const updatedState = Object.entries(newData).reduce(
            (acc, [key, value]) => {
              // Confronta i dati precedenti con i nuovi
              const currentValue = currentState[key as keyof StoreState];

              // Se il valore corrente è null, usiamo direttamente il nuovo valore
              if (currentValue === null) {
                return {
                  ...acc,
                  [key]: value,
                };
              }

              // Altrimenti, facciamo un merge profondo dei dati
              const mergedValue = typeSafeDeepMerge(
                currentValue as Record<string, unknown>,
                value as Record<string, unknown>
              );

              return {
                ...acc,
                [key]: mergedValue,
              };
            },
            { ...state }
          );

          console.log("Previous state:", state);
          console.log("New data:", newData);
          console.log("Updated state:", updatedState);

          return {
            ...updatedState,
            lastUpdateTime: Date.now(),
          };
        });
      },
    }),
    {
      name: "f1-data-storage",
      partialize: (state) => {
        const { ...rest } = state;
        return rest;
      },
    }
  )
);

// Utility function for type-safe deep merge
export function typeSafeDeepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T {
  if (!source) return target;
  if (!target) return source as T;

  const result = { ...target } as T;

  Object.keys(source).forEach((key) => {
    const sourceValue = source[key];
    const targetValue = target[key];

    // Se il valore sorgente è null o undefined, lo ignoriamo
    if (sourceValue === null || sourceValue === undefined) {
      return;
    }

    // Se il valore target è null o undefined, usiamo direttamente il valore sorgente
    if (targetValue === null || targetValue === undefined) {
      (result as Record<string, unknown>)[key] = sourceValue as T[keyof T];
      return;
    }

    // Se entrambi i valori sono oggetti (non array), facciamo un merge ricorsivo
    if (
      sourceValue &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === "object" &&
      !Array.isArray(targetValue)
    ) {
      (result as Record<string, unknown>)[key] = typeSafeDeepMerge(
        targetValue as Record<string, unknown>,
        sourceValue as Record<string, unknown>
      ) as T[keyof T];
    } else {
      // Altrimenti, sovrascriviamo il valore target con il valore sorgente
      (result as Record<string, unknown>)[key] = sourceValue as T[keyof T];
    }
  });

  return result;
}
