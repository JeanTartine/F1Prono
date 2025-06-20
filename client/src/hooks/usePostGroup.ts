import {useMutation} from "@tanstack/react-query";
import {groupApi} from "../api/groupApi.ts";

const useAddGroup = () => {
    return useMutation({
        mutationFn: ({groupName, playerId}: {groupName: string, playerId: string}) =>
            groupApi.postGroup(groupName, playerId),
        onSuccess: (res) => {
            return res.data
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export {useAddGroup}