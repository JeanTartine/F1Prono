import {f1PronoApi} from "../../core/libs/axios/axiosConfig.ts";

export const groupApi = {
    getGroup: async (groupId: string) => {
        return await f1PronoApi.get('/group/{groupId}', {
            params: {
                path: {
                    groupId
                }
            }
        });
    },
    postGroup: async (groupName: string) => {
        return await f1PronoApi.post(`/group/add`, {
            groupName: groupName.trim(),
        })
    }
}