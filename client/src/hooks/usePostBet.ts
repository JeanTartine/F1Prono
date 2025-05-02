import {useMutation} from "@tanstack/react-query";
import {betApi} from "../api/player/betApi.ts";

const useAddBet = () => {
    return useMutation({
        mutationFn: (params: {
            raceName: string,
            position: number,
            driverId: string,
            playerId: number,
            groupId: number
        }) => {
            const {raceName, position, driverId, playerId, groupId} = params;
            return betApi.postPlayerBet(raceName, position, driverId, playerId, groupId)
        },
        onSuccess: (res) => {
            console.log(res)
        },
        onError: (err) => {
            console.log(err)
        }
    })
}


export {useAddBet}