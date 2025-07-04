import * as fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import type { MatchRow, MatchTable } from "../models/Match";

export class DataService {
    public static UpdateMatchData(matchTables: MatchTable[]) {
        let json = JSON.stringify(matchTables);

        // const dirPath = DataService.GetDirPath();
        const filePath = DataService.GetFilePath();

        // Ensure the directory exists
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        // Write the file
        fs.writeFileSync(filePath, json);
    }

    public static GetTeamMatches(teamName: string): MatchRow[] {
        let allMatches = JSON.parse(fs.readFileSync('static/data/matches.json', 'utf-8')) as MatchTable[];
        let result = allMatches.reduce((acc, cur) => [...acc, ...cur.Matches], [] as MatchRow[])
            .filter(a_item => a_item.HomeTeam == teamName || a_item.AwayTeam == teamName);
        result.forEach(a_item => a_item.Date = new Date(a_item.Date));

        return result.sort((a, b) => a.Date.getTime() - b.Date.getTime());
    }

    public static GetClubMatches(clubName: string): MatchRow[] {
        let allMatches = JSON.parse(fs.readFileSync('static/data/matches.json', 'utf-8')) as MatchTable[];
        let matchString = `${clubName} `;
        let result = allMatches.reduce((acc, cur) => [...acc, ...cur.Matches], [] as MatchRow[])
            .filter(a_item => a_item.HomeTeam.startsWith(matchString) || a_item.AwayTeam.startsWith(matchString));
        result.forEach(a_item => a_item.Date = new Date(a_item.Date));

        return result.sort((a, b) => a.Date.getTime() - b.Date.getTime());
    }

    public static GetAllMatches(): MatchRow[] {
        try {
            const filePath = DataService.GetFilePath();
            console.log(filePath)
            const allMatches = JSON.parse(fs.readFileSync(filePath, 'utf-8'), DataService.JsonReviver) as MatchTable[];
            const result = allMatches.reduce((acc, cur) => [...acc, ...cur.Matches], [] as MatchRow[]);

            result.forEach(a_item => {
                const [hours, minutes] = a_item.Time.split(":").map(Number);

                if (minutes != undefined) {
                    a_item.Date.setHours(hours, minutes);
                }
            });

            result.sort((a, b) => a.Date.getTime() - b.Date.getTime());

            return result;
        } catch (e) {
            console.error('❌ Failed to load matches.json:', e);
            return [];
        }
    }

    private static JsonReviver(key: string, value: any) {
        if (key === 'Date') {
            return new Date(value);
        }

        return value;
    }

    private static GetDirPath(): string {
        // Get absolute path to matches.json
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, '..', '..', '..', 'data');
        return filePath;
    }

    private static GetFilePath(): string {
        // Get absolute path to matches.json
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, '..', '..', '..', 'data', 'matches.json');
        return filePath;
    }
}