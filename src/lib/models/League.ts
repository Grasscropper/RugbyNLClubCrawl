import type { MatchRow } from "./Match";
import type { RankingRow } from "./Ranking";

export interface League {
    Name: string;
    URL: string;
    Division: string;
    Category: string;
    Ranking: RankingRow[];
    Matches: MatchRow[];
}