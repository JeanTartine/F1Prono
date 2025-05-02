import {useMutation} from "@tanstack/react-query";
import {groupApi} from "../api/player/groupApi.ts";

const useAddGroup = () => {
    return useMutation({
        mutationFn: (groupName: string) => groupApi.postGroup(groupName),
        onSuccess: (res) => {
            console.log(res)
            return res
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export {useAddGroup}