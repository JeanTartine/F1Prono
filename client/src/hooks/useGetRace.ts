import {raceApi} from "../api/raceApi.ts";
import {useQuery} from "@tanstack/react-query";

const useAllRaceForSeason = (season: string) => {
    return useQuery({
        queryKey: ['races', season],
        queryFn: () => raceApi.getAllRacesForSeason(season),
        enabled: !!season,
    })
}

const useNextRaceForSeason = (season: string) => {
    return useQuery({
        queryKey: ['races', season, 'next'],
        queryFn: () => raceApi.getNextRaceForSeason(season),
        enabled: !!season,
    })
}

export {useAllRaceForSeason, useNextRaceForSeason}