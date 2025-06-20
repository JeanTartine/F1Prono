import {Bet} from "./Bet.ts";

export type BetLine = {
    _id?: string;
    position: number;
    driverId: string;
    driverStatus: string;
    bet?: Bet;
}