export interface DriverData {
    RacingNumber: string;
    BroadcastName: string;
    FullName: string;
    Tla: string;
    Line: number;
    TeamName: string;
    TeamColour: string;
    FirstName: string;
    LastName: string;
    Reference: string;
    HeadshotUrl: string;
}

export type DriverList = Record<string, DriverData>;
