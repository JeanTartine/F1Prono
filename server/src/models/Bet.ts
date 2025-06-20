import {BetLine} from "./BetLine";

export type Bet = {
    id: string;
    raceName: string;
    playerId: number;
    groupId: number;
    resultId: number;
    betLines: BetLine[]
}