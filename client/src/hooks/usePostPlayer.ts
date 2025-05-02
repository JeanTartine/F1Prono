import {useMutation} from "@tanstack/react-query";
import {playerApi} from "../api/player/playerApi.ts";

const useAddNewPlayer = () => {
    return useMutation({
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
}

export {useAddNewPlayer}