export interface DriverStanding {
    position: number;
    points: number;
    Driver: {
        driverId: string;
        givenName: string;
        familyName: string;
    };
    Constructors: {
        name: string;
    }[];
}

export interface Location {
    date: string;
    driver_number: number;
    meeting_key: number;
    session_key: number;
    x: number;
    y: number;
    z: number;
}
