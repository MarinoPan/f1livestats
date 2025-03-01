// 📌 src/services/api.ts

export interface Driver {
    driver_number: number;
    name: string;
    team: string;
}

export interface Position {
    driver_number: number;
    position: number;
}

export interface CarData {
    driver_number: number;
    speed: number;
    throttle: number;
}

export interface DriverData {
    driver?: Driver;
    position?: Position;
    carData?: CarData;
}

export const fetchDrivers = async () => {
    try {
        console.log("📡 Chiamata a /api/drivers in corso...");
        const response = await fetch("/api/drivers");

        if (!response.ok) {
            throw new Error(`Errore API: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Dati ricevuti nel frontend:", data);
        return data;
    } catch (error) {
        console.error("❌ Errore API nel frontend:", error);
        throw error;
    }
};
