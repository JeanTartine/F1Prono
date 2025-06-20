import {useQuery} from "@tanstack/react-query";
import {groupApi} from "../api/groupApi.ts";

const useGetGroupById = (groupId?: string) => {
    return useQuery({
        queryKey: ['group', groupId],
        queryFn: async () => {
            if (!groupId) {
                return Promise.resolve([]);
            }
            return await groupApi.getGroup(groupId)
        },
        enabled: !!groupId,
        staleTime: 30000,
    })
}

const useGetPlayerGroups = (playerId: string) => {
    return useQuery({
        queryKey: ['player', playerId, 'groups'],
        queryFn: async () => {
            return await groupApi.getPlayerGroups(playerId)
        }
    })
}

export {useGetGroupById, useGetPlayerGroups}