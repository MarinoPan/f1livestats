export async function fetchStanding() {
    const response = await fetch(
        "https://api.jolpi.ca/ergast/f1/2025/driverstandings"
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
