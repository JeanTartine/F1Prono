import {Player} from "./Player";

export type BetGroup = {
    _id: string;
    name: string;
    players: Player[];
}