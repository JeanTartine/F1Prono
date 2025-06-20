import {f1PronoApi} from "../core/libs/axios/axiosConfig.ts";


export const playerApi =  {
    addPlayer: async ({
        playerName
    }: {
        playerName: string
    }) => {
        return await f1PronoApi.post('/player/add', {
            name: playerName.trim(),
        })
    },
    getPlayerById: async (playerId: string) => {
        return await f1PronoApi.get(`player/${playerId}`)
    },
    getPlayersByGroup: async (groupId: string) => {
        return await f1PronoApi.get(`player/group/${groupId}`)
    }
}
