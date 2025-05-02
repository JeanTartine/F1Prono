import {useQuery} from "@tanstack/react-query";
import {groupApi} from "../api/player/groupApi.ts";

const useGetGroupById = (groupId: string) => {
    return useQuery({
        queryKey: ['group', groupId],
        queryFn: () => groupApi.getGroup(groupId)
    })
}

export {useGetGroupById}