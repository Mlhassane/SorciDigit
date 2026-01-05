import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'analytics_db.json');

// Assure que le dossier et le fichier existent
function ensureDb() {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify([]));
    }
}

export type EventData = {
    type: string;
    url: string;
    referrer: string;
    timestamp: string;
    os: string;
    browser: string;
    device: string;
    country: string;
    ip: string;
    vital_name?: string;
    vital_value?: number;
};

export const db = {
    addEvent: (event: EventData) => {
        ensureDb();
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        data.push(event);
        // On garde seulement les 5000 derniers événements pour éviter que le fichier ne devienne trop gros en dev
        if (data.length > 5000) data.shift();
        try {
            fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
        } catch (err) {
            console.error("Database write failed (locked?):", err);
        }
    },

    getEvents: (): EventData[] => {
        ensureDb();
        try {
            return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        } catch (e) {
            return [];
        }
    }
};
