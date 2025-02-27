export async function fetchStanding() {
    const response = await fetch(
        "https://api.jolpi.ca/ergast/f1/2024/driverstandings"
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero dati");
    }

    const data = await response.json();
    return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}

export async function fetchSchedules() {
    const response = await fetch("https://api.jolpi.ca/ergast/f1/2025/races/");

    if (!response.ok) {
        throw new Error("Errore nel recupero dati");
    }

    const data = await response.json();
    return data.MRData.RaceTable.Races;
}

// openf1.org

import { Driver } from "@/types/type";

export async function fetchDrivers(): Promise<Driver[]> {
    const res = await fetch(
        "https://api.openf1.org/v1/drivers?meeting_key=latest"
    );
    if (!res.ok) throw new Error("Errore nel recupero dei driver");
    return res.json();
}

import { LivePosition } from "@/types/type";

export async function fetchLivePositions(): Promise<LivePosition[]> {
    const res = await fetch(
        "https://api.openf1.org/v1/position?meeting_key=latest"
    );
    if (!res.ok) throw new Error("Errore nel recupero delle posizioni");
    return res.json();
}

// api che recupero per driver number

export async function fetchLapTimes(driverNumber: number) {
    const response = await fetch(
        `https://api.openf1.org/v1/laps?session_key=latest&meeting_key=latest&driver_number=${driverNumber}`
    );
    if (!response.ok) {
        throw new Error("Errore nel recupero dati");
    }
    return response.json();
}

export async function fetchStints(driverNumber: number) {
    const response = await fetch(
        `https://api.openf1.org/v1/stints?session_key=latest&meeting_key=latest&driver_number=${driverNumber}`
    );
    if (!response.ok) {
        throw new Error("Errore nel recupero dati");
    }
    return response.json();
}

export async function fetchIntervals(driverNumber: number) {
    const response = await fetch(
        `https://api.openf1.org/v1/intervals?session_key=latest&meeting_key=latest&driver_number=${driverNumber}`
    );
    if (!response.ok) {
        throw new Error("Errore nel recupero dati");
    }
    return response.json();
}

export async function fetchCarData(driverNumber: number) {
    const response = await fetch(
        `https://api.openf1.org/v1/car_data?session_key=latest&meeting_key=latest&driver_number=${driverNumber}`
    );
    if (!response.ok) {
        throw new Error("Errore nel recupero dati");
    }
    return response.json();
}

export async function fetchSessionInfo() {
    const response = await fetch(
        "https://api.openf1.org/v1/sessions?session_key=latest"
    );
    if (!response.ok) {
        throw new Error("Errore nel recupero dati");
    }
    return response.json();
}

export async function fetchWeather() {
    const response = await fetch(
        "https://api.openf1.org/v1/weather?session_key=latest&meeting_key=latest"
    );
    if (!response.ok) {
        throw new Error("Errore nel recupero dati");
    }
    return response.json();
}

export async function fetchTeamRadio() {
    const response = await fetch(
        "https://api.openf1.org/v1/team_radio?session_key=latest&meeting_key=latest"
    );
    if (!response.ok) {
        throw new Error("Errore nel recupero dati");
    }
    return response.json();
}

export async function fetchMessages() {
    const response = await fetch(
        "https://api.openf1.org/v1/race_control?session_key=latest&meeting_key=latest"
    );
    if (!response.ok) {
        throw new Error("Errore nel recupero dati");
    }
    return response.json();
}
