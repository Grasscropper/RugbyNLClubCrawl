export interface RankingRow {
    Rank: number;
    TeamName: string;
    MatchesPlayed: number;
    Wins: number;
    Losses: number;
    Draws: number;
    CompetitionPoints: number;
    PointsScored: number;
    PointsConceded: number;
    PointsBalance: number;
}

export interface RankingTable {
    Ranks: RankingRow[];
}