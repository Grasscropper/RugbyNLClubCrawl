import { MatchTable } from "./Match";
import { RankingTable } from "./Ranking";

export class TeamInfo {
    TeamName: string;
    Url: string;
    AgeCategory: AgeCategory;

    RankingTable?: RankingTable;
    MatchTable?: MatchTable;
}

export enum AgeCategory {
    HEREN,
    DAMES,
    COLTS,
    JUNIOR,
    CUBS
}