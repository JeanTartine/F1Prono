import {f1PronoApi} from "../core/libs/axios/axiosConfig.ts";

export const betApi = {
    postPlayerBet: async (
        raceName: string,
        playerId: string,
        groupId: string,
        betLines: [{
            driverId: string,
            driverStatus: string,
            position: number
        }]
    ) => {
        return await f1PronoApi.post('bet/add', {
            raceName: raceName.trim(),
            playerId,
            groupId,
            betLines
        })
    },
    getAllPlayerBetsForGroup: async (groupId: string, playerId: string) => {
        return await f1PronoApi.get(`bet/group/${groupId}/player/${playerId}`)
    },
    getAllBetsInGroup: async (groupId: string) => {
        const result = await f1PronoApi.get(`group/${groupId}/bets`)
        return result.data
    }
}