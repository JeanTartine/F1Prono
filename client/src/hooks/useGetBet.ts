import {betApi} from "../api/player/betApi.ts";
import {useQuery} from "@tanstack/react-query";

const useAllPlayerBetsForGroup = (playerId: string, groupId: string) => {
    return useQuery({
        queryKey: ['bet', 'group', groupId, 'player', playerId],
        queryFn: () => betApi.getAllPlayerBetsForGroup(groupId, playerId)

    })
}

export {useAllPlayerBetsForGroup}