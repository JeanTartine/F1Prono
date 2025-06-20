import {betApi} from "../api/betApi.ts";
import {useQuery} from "@tanstack/react-query";

// Get all bets made by a player in a given group
const useAllPlayerBetsForGroup = (playerId: string, groupId: string) => {
    return useQuery({
        queryKey: ['bet', 'group', groupId, 'player', playerId],
        queryFn: () => betApi.getAllPlayerBetsForGroup(groupId, playerId)
    })
}

// Get all bets made in a given group
const useAllBetsForGroup = (groupId?: string) => {
    return useQuery({
        queryKey: ['bet', groupId, 'group'],
        queryFn: () => {
            if (!groupId) {
                return Promise.resolve([]);
            }
            return betApi.getAllBetsInGroup(groupId)
        },
        enabled: !!groupId
    })
}
export {useAllPlayerBetsForGroup, useAllBetsForGroup}