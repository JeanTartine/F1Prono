import {jolpicaApi} from "../core/libs/axios/axiosConfig";
import {Race} from "../db/schema";
import mongoose from "mongoose";
import {connectDB} from "../db";

async function main() {
    try {
    //MONGO CONNECTION
        await connectDB()
        // start by getting the races for the current F1 season
        const result = await jolpicaApi.get('f1/current')
        const races = result.data.MRData.RaceTable.Races
        // Now we insert the races in our mongoDB
        const session = await mongoose.startSession();
        session.startTransaction();

        for (const race of races) {
            const newRace = new Race({
                season: race.season,
                round: parseInt(race.round),
                url: race.url,
                raceName: race.raceName,
                date: race.date,
                time: race.time,
            })
            await newRace.save({session});
        }

        // Commit the transaction
        await session.commitTransaction();
        await session.endSession();

        console.log(`Fetch Successful! ${races.length} races added for the current season!`);
        process.exit(1);
    } catch (err: any) {
        console.log('Error while trying to call the jalpica API to retrieve current season races: ' + err.message);
        process.exit(1);
    }
}

main();