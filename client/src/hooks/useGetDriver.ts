// Get all drivers for a given season
import {useQuery} from "@tanstack/react-query";
import {driverApi} from "../api/driverApi.ts";

const useAllDriversForSeason = (season: string) => {
    return useQuery({
        queryKey: ['drivers', season],
        queryFn: () => driverApi.getAllDriversForSeason(season),
        enabled: !!season,
    })
}

export{useAllDriversForSeason}