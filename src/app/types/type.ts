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

/* export interface RaceTable {
    season: string;
    round: string;
    raceName: string;
    Circuit: {
        circuitId: string;
        url: string;
        circuitName: string;
        Location: {
            lat: string;
            long: string;
            locality: string;
            country: string;
        };
    };
    date: string;
    time: string;
    FirstPractice: {
        date: string;
        time: string;
    };
    SecondPractice: {
        date: string;
        time: string;
    };
    ThirdPractice?: {
        date: string;
        time: string;
    };
    Qualifying: {
        date: string;
        time: string;
    };
}
 */
export interface Driver {
    session_key: number;
    meeting_key: number;
    broadcast_name: string;
    country_code: string;
    first_name: string;
    full_name: string;
    headshot_url: string;
    last_name: string;
    driver_number: number;
    team_colour: string;
    team_name: string;
    name_acronym: string;
}

export interface LivePosition {
    session_key: number;
    meeting_key: number;
    driver_number: number;
    date: string; // Lo teniamo come stringa perché arriva in formato ISO
    position: number;
}

export interface LiveLap {
    meeting_key: number;
    session_key: number;
    driver_number: number;
    i1_speed: number;
    i2_speed: number;
    st_speed: number;
    date_start: string;
    lap_duration: number;
    is_pit_out_lap: boolean;
    duration_sector_1: number;
    duration_sector_2: number;
    duration_sector_3: number;
    lap_number: number;
    segments_sector_1: number;
    segments_sector_2: number;
    segments_sector_3: number;
}

export interface TyreStint {
    meeting_key: number;
    session_key: number;
    stint_number: number;
    driver_number: number;
    lap_start: number;
    lap_end: number;
    compound: "SOFT" | "MEDIUM" | "HARD" | "INTERMEDIATE" | "WET";
    tyre_age_at_start: number;
}

export interface Gap {
    session_key: number;
    meeting_key: number;
    date: string;
    driver_number: number;
    gap_to_leader: number;
    interval: number;
}

export interface Session {
    circuit_key: number;
    circuit_short_name: string;
    country_code: string;
    country_key: number;
    country_name: string;
    date_end: string;
    date_start: string;
    gmt_offset: string;
    location: string;
    meeting_key: number;
    session_key: number;
    session_name: string;
    session_type: string;
    year: number;
}

export interface Weather {
    air_temperature: number;
    date: string;
    humidity: number;
    meeting_key: number;
    pressure: number;
    rainfall: number;
    session_key: number;
    track_temperature: number;
    wind_direction: number;
    wind_speed: number;
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

export interface CarData {
    brake: number;
    date: string;
    driver_number: number;
    drs: number;
    meeting_key: number;
    n_gear: number;
    rpm: number;
    session_key: number;
    speed: number;
    throttle: number;
}

export interface RaceControl {
    category: string;
    date: string; // Potrebbe essere convertito in Date quando lo usi
    driver_number: number;
    flag: string;
    lap_number: number;
    meeting_key: number;
    message: string;
    scope: string;
    sector: number | null; // Può essere un numero o null
    session_key: number;
}
