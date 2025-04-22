import {useMutation, useQuery} from "@tanstack/react-query";
import {betApi} from "../api/player/betApi.ts";

export const useBetApi = () => {

    const getAllPlayerBetsForGroup = (playerId: string, groupId: string) => {
        const res = useQuery({
            queryKey: ['bet', 'group', groupId, 'player', playerId],
            queryFn: () => betApi.getAllPlayerBetsForGroup(groupId, playerId)
        })
        return res.data
    }

    const postPlayer = useMutation({
        mutationFn: (params: {
            raceName: string,
            postion: number,
            driverId: number,
            playerId: number,
            groupId: number
        }) => {
            const {raceName, postion, driverId, playerId, groupId} = params;
            return betApi.postPlayerBet(raceName, postion, driverId, playerId, groupId)
        },
        onSuccess: (res) => {
            console.log(res)
        },
        onError: (err) => {
            console.log(err)
        }
    })

    return {getAllPlayerBetsForGroup, postPlayer}
}