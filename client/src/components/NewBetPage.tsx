import {useLocation, useParams} from "react-router";
import {useGetGroupById} from "../hooks/useGetGroup.ts";
import {useEffect, useState} from "react";
import {useNextRaceForSeason} from "../hooks/useGetRace.ts";
import {Driver} from "../models/Driver.ts";
import {PositionCell} from "./Cells/PositionCell.tsx";
import {DriverCell} from "./Cells/DriverCell.tsx";
import {Race} from "../models/Race.ts";
import {BetLine} from "../models/BetLine.ts";
import {useAddBet} from "../hooks/usePostBet.ts";

type Position = {
    id: number,
    driver?: Driver,
    race?: Race
}
export const NewBetPage = () => {
    const location = useLocation();
    let params = useParams()
    const {data: group, isLoading: loadingGroup, isError: errorGroups } = useGetGroupById(params?.id)
    const {data: nextRace, isLoading: loadingRace, isError: errorRace} = useNextRaceForSeason(group?.season)

    const [tempUserId, setTempUserId] = useState('68207197c81526623aceafc6')

    // Access the drivers data passed from GroupPage
    const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([...location.state?.drivers]);
    const [betPositions, setBetPositions] = useState<Position[]>([]);
    const [isBetValid, setIsBetValid] = useState(false);

    const addBet = useAddBet()

    // Initialize positions when drivers are loaded
    useEffect(() => {
        if (availableDrivers && betPositions.length === 0) {
            setBetPositions(availableDrivers.map((_, index) => {
                return {id: index + 1, driver: undefined, race: nextRace}
            }));
        }
    }, [availableDrivers]);

    useEffect(() => {
        const result = betPositions.every(position => position.driver !== undefined)
        if (result) {
            setIsBetValid(true)
        } else {
            setIsBetValid(false)
        }
    }, [betPositions]);
    // On drop on a position slot
    const handleDropToPosition = (driver: Driver, position: Position) => {
        // If the driver was dragged in a already occupied position, we do nothing

        setBetPositions(currentPositions => {
            // Check if position is already occupied using current state
            const newPosition = currentPositions.find(p => p.id === position.id);
            if (newPosition?.driver !== undefined) {
                return currentPositions; // Return unchanged if occupied
            }

            return currentPositions.map((prev) => {
                // If the driver was already placed in a bet position we remove it from his old position before adding him elsewhere
                if (prev.driver && (prev.driver._id === driver._id)) {
                    return {...prev, driver: undefined};
                }
                // We link the driver with a position
                if (position.id === prev.id) {
                    return {...prev, driver: driver}
                }
                return {...prev}
            })
        })
        setAvailableDrivers(currentDrivers => {
            return currentDrivers.filter((el: Driver) => el._id !== driver._id)
        })
    }

    // Reset all positions
    const handleResetPosition = () => {
        setBetPositions(currentPositions => {
            return currentPositions.map((prev) => {
                return {...prev, driver: undefined};
            })
        })
        setAvailableDrivers([...location.state?.drivers]);
    };

    const handleOnRemove = (driver: Driver) => {
        setBetPositions(currentPositions => {
            return currentPositions.map((position) => {
                if (position.driver && (position.driver._id === driver._id)) {
                    return {...position, driver: undefined};
                } else {
                    return {...position}
                }
            })
        })
        setAvailableDrivers(currentDrivers => [...currentDrivers, driver]);
    }

    // Sending the bet to the the backend
    const handleValidation = () => {
        const betLines = []

        // Simply access the current state directly
        betPositions.forEach((position) => {
            const betLine: BetLine = {
                driverId: position.driver._id,
                driverStatus: "finished",
                position: position.id
            }
            betLines.push(betLine)
        })

        addBet.mutate({
            raceName: nextRace.raceName,
            playerId: tempUserId,
            groupId: group._id,
            betLines: betLines,
        }, {
            onSuccess: (response) => {
                console.log(response.data)
            }
        })
    }

    return (
        <>
            <h2>Next Race</h2>
            {nextRace && (
                <div>
                    <p>{nextRace.raceName} - {nextRace.date}</p>
                </div>
            )}
            <div>
                <div className="flex flex-row gap-2 mx-auto bg-gray-100">
                    {/* Positions area */}
                    {betPositions && (
                        <div className="w-1/2 mx-auto p-4">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Positions</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {betPositions.map((position, index: number) => (
                                    <PositionCell
                                        key={index}
                                        betPosition={position}
                                        onDrop={handleDropToPosition}
                                        occupiedByDriver={position.driver}
                                        onRemove={handleOnRemove}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="divider lg:divider-horizontal divider-neutral"/>
                    {/* Drivers area*/}
                    {availableDrivers && (
                        <div className="w-1/2 mx-auto bg-gray-100 p-4 text-center">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Drivers</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {availableDrivers.map((driver: Driver) => (
                                    <DriverCell key={driver._id} driver={driver}/>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-row justify-center gap-2 mx-auto p-4 bg-gray-100">
                    <button className="btn" onClick={handleResetPosition}>Reset</button>
                    <button className="btn btn-primary" disabled={!isBetValid} onClick={handleValidation}>Confirm</button>
                </div>
            </div>
        </>
    )
}