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
