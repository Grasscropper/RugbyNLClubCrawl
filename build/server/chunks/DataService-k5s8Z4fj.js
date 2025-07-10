import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class DataService {
  static UpdateLeagueData(matchTables) {
    let json = JSON.stringify(matchTables);
    const filePath = DataService.GetFilePath();
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, json);
  }
  // public static GetTeamMatches(teamName: string): MatchRow[] {
  //     let allMatches = JSON.parse(fs.readFileSync('static/data/matches.json', 'utf-8')) as MatchTable[];
  //     let result = allMatches.reduce((acc, cur) => [...acc, ...cur.Matches], [] as MatchRow[])
  //         .filter(a_item => a_item.HomeTeam == teamName || a_item.AwayTeam == teamName);
  //     result.forEach(a_item => a_item.Date = new Date(a_item.Date));
  //     return result.sort((a, b) => a.Date.getTime() - b.Date.getTime());
  // }
  // public static GetClubMatches(clubName: string): MatchRow[] {
  //     let allMatches = JSON.parse(fs.readFileSync('static/data/matches.json', 'utf-8')) as MatchTable[];
  //     let matchString = `${clubName} `;
  //     let result = allMatches.reduce((acc, cur) => [...acc, ...cur.Matches], [] as MatchRow[])
  //         .filter(a_item => a_item.HomeTeam.startsWith(matchString) || a_item.AwayTeam.startsWith(matchString));
  //     result.forEach(a_item => a_item.Date = new Date(a_item.Date));
  //     return result.sort((a, b) => a.Date.getTime() - b.Date.getTime());
  // }
  static GetAllMatches() {
    try {
      const filePath = DataService.GetFilePath();
      console.log(filePath);
      const leagues = JSON.parse(fs.readFileSync(filePath, "utf-8"), DataService.JsonReviver);
      const result = leagues.reduce((acc, cur) => {
        return [...acc, ...cur.Matches];
      }, []);
      result.forEach((a_item) => {
        const [hours, minutes] = a_item.Time.split(":").map(Number);
        if (minutes != void 0) {
          a_item.Date.setHours(hours, minutes);
        }
      });
      result.sort((a, b) => a.Date.getTime() - b.Date.getTime());
      return result;
    } catch (e) {
      console.error("❌ Failed to load matches.json:", e);
      return [];
    }
  }
  static JsonReviver(key, value) {
    if (key === "Date") {
      return new Date(value);
    }
    return value;
  }
  static GetDirPath() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "..", "..", "..", "data");
    return filePath;
  }
  static GetFilePath() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "..", "..", "..", "data", "matches.json");
    return filePath;
  }
}

export { DataService as D };
//# sourceMappingURL=DataService-k5s8Z4fj.js.map
