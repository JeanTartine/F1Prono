import {useQuery} from "@tanstack/react-query";
import {playerApi} from "../api/playerApi.ts";

const useGetPlayerById = (playerId: string) => {
    return useQuery({
        queryKey: ['player', playerId],
        queryFn: () => playerApi.getPlayerById(playerId),
    })
}

const useGetPlayersByGroup = (groupId: string) => {
    return useQuery({
        queryKey: ['players','group',groupId],
        queryFn: () => playerApi.getPlayersByGroup(groupId)
    })
}

export {useGetPlayerById, useGetPlayersByGroup}