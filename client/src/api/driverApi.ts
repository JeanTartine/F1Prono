import {f1PronoApi} from "../core/libs/axios/axiosConfig.ts";

export const driverApi = {
    getAllDriversForSeason: async (season: string) => {
        const result = await f1PronoApi.get(`driver/${season}`)
        return result.data
    },
}