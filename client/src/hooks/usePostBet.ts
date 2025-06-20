import {useMutation} from "@tanstack/react-query";
import {betApi} from "../api/betApi.ts";

const useAddBet = () => {
    return useMutation({
        mutationFn: (params: {
            raceName: string,
            playerId: string,
            groupId: string,
            betLines: [{
                driverId: string,
                driverStatus: string,
                position: number
            }]
        }) => {
            const {raceName, playerId, groupId, betLines} = params;
            return betApi.postPlayerBet(raceName, playerId, groupId, betLines)
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