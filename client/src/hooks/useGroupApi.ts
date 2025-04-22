import {useMutation, useQuery} from "@tanstack/react-query";
import {groupApi} from "../api/player/groupApi.ts";

export const useGroupApi = () => {

    const getGroupById = (groupId: string) => {
        const query = useQuery({
            queryKey: ['group', groupId],
            queryFn: () => groupApi.getGroup(groupId)
        })
        if (query.status === 'success') {
            return query.data
        }
        return undefined;
    }

    const addGroup = useMutation({
        mutationFn: (groupName: string) => groupApi.postGroup(groupName),
        onSuccess: (res) => {
            console.log(res)
            return res
        },
        onError: (err) => {
            console.log(err)
        }
    })

    return {addGroup, getGroupById}
}