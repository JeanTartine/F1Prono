import {Bet} from "./Bet";

export type BetLine = {
    id: number,
    driverId: string,
    position: number,
    driverStatus: string
    bet: Bet
}