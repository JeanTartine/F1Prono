import {useMutation, useQuery} from "@tanstack/react-query";
import {playerApi} from "../api/player/playerApi.ts";
/*
* This hook contains all the API method involving players data.
*/
export const usePlayerApi = () => {

    const createPlayer = useMutation({
        mutationFn: (playerName: string) => {
            return playerApi.addPlayer({playerName})
        },
        onSuccess: (res) => {
            console.log(res)
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const getPlayerById = (playerId: string) => {
        const query = useQuery({
            queryKey: ['player',playerId],
            queryFn: () => playerApi.getPlayerById(playerId)
        })
        if (query.status === 'success') {
            return query.data
        }
        return null
    }

    const getPlayersByGroup = (groupId: string) => {
        const query = useQuery({
            queryKey: ['players','group',groupId],
            queryFn: () => playerApi.getPlayersByGroup(groupId)
        })
        if (query.status === 'success') {
            return query.data
        }
        return null
    }

    return {createPlayer, getPlayerById, getPlayersByGroup}
}