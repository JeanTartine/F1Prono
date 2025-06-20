import {BetLine} from "./BetLine.ts";

export type Bet = {
    _id: string;
    raceName: string;
    playerId: string;
    betLines: BetLine[];
    groupId: string;
    resultId: string;
}