export interface MatchRow {
    Date: Date;
    Time: string;
    Location: string;
    HomeTeam: string;
    AwayTeam: string;
    Score: Score | null;
}

export interface Score {
    HomeTeam: number;
    AwayTeam: number;
}

export interface MatchTable {
    Url: string;
    Matches: MatchRow[];
}

export interface MatchDay {
    Date: Date;
    Matches: MatchRow[];
}

export type HomeAwayFilter = 'both' | 'home' | 'away';

export enum TeamType {
    MENS = 0,
    LADIES = 1,
    COLTS = 2,
    JUNIORS = 3,
    CUBS = 4,
}
