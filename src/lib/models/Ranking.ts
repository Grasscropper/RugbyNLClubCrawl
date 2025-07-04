export interface RankingRow {
    Rank: number;
    TeamName: string;
    Played: number;
    Won: number;
    Lost: number;
    Tied: number;
    Points: number;
    Scored: number;
    Conceded: number;
    Balance: number;
}

export interface RankingTable {
    Ranks: RankingRow[];
}