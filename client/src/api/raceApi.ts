import {f1PronoApi} from "../core/libs/axios/axiosConfig.ts";

export const raceApi = {
    getAllRacesForSeason: async (season: string) => {
        const result = await f1PronoApi.get(`race/${season}`)
        return result.data;
    },
    getNextRaceForSeason: async (season: string) => {
        const result =  await f1PronoApi.get(`race/${season}/next`)
        return result.data;
    }
}