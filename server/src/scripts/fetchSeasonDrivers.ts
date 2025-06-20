import {jolpicaApi} from "../core/libs/axios/axiosConfig";
import {Driver} from "../db/schema";
import mongoose from "mongoose";
import {connectDB} from "../db";

async function main() {
    try {
        //MONGO CONNECTION
        await connectDB()
        // start by getting the drivers for the current F1 season
        const result = await jolpicaApi.get('f1/current/drivers')
        const season = result.data.MRData.DriverTable.season
        const drivers = result.data.MRData.DriverTable.Drivers
        // Now we insert the drivers in our mongoDB
        const session = await mongoose.startSession();
        session.startTransaction();

        for (const driver of drivers) {
            const newDriver = new Driver({
                driverId: driver.driverId,
                permanentNumber: driver.permanentNumber,
                code: driver.code,
                url: driver.url,
                givenName: driver.givenName,
                familyName: driver.familyName,
                dateOfBirth: driver.dateOfBirth,
                nationality: driver.nationality,
                season
            })
            await newDriver.save({session});
        }

        // Commit the transaction
        await session.commitTransaction();
        await session.endSession();

        console.log(`Fetch Successful! ${drivers.length} drivers added for the current season!`);

        process.exit(1);
    } catch (err: any) {
        console.log('Error while trying to call the jalpica API to retrieve current season drivers: ' + err.message);
        process.exit(1);
    }
}

main();