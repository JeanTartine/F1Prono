import {f1PronoApi} from "../core/libs/axios/axiosConfig.ts";

export const groupApi = {
    getGroup: async (groupId: string) => {
        const result = await f1PronoApi.get(`/group/${groupId}`);
        return result.data;
    },
    getPlayerGroups: async (playerId: string) => {
        const result = await f1PronoApi.get(`/player/${playerId}/groups`);
        return result.data;
    },
    postGroup: async (groupName: string, playerId: string) => {
        return await f1PronoApi.post(`/group/add`, {
            groupName: groupName.trim(),
            playerId: playerId.trim(),
        })
    }
}