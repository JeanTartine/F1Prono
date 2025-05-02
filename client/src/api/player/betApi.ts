import {f1PronoApi} from "../../core/libs/axios/axiosConfig.ts";

export const betApi = {
    postPlayerBet: async (
        raceName: string,
        position: number,
        driverId: string,
        playerId: number,
        groupId: number
    ) => {
        return await f1PronoApi.post('bet/add', {
            raceName: raceName.trim(),
            position,
            driverId,
            playerId,
            groupId
        })
    },
    getAllPlayerBetsForGroup: async (groupId: string, playerId: string) => {
        return await f1PronoApi.get(`bet/group/${groupId}/player/${playerId}`)
    }
}