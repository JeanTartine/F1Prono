import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {useGetGroupById} from "../hooks/useGetGroup.ts";
import {useAllBetsForGroup} from "../hooks/useGetBet.ts";
import {Bet} from "../models/Bet.ts";
import {BetLine} from "../models/BetLine.ts";
import {useAllDriversForSeason} from "../hooks/useGetDriver.ts";

export const GroupPage = () => {

    let params = useParams()
    const {data: bets, isLoading: loadingBets, isError: errorBets } = useAllBetsForGroup(params?.id)
    const {data: group, isLoading: loadingGroup, isError: errorGroups } = useGetGroupById(params?.id)
    const {data: drivers, isLoading: loadingDrivers, isError: errorDrivers} = useAllDriversForSeason(group?.season)

    const [betPlaced, setBetsPlaced] = useState(false)
    const [tempUserId, setTempUserId] = useState('68207197c81526623aceafc6')

    const navigate = useNavigate();

    const handleGroupSelected = () => {
        navigate(`/group/${group._id}/newbet`, {
            state: { drivers: drivers }
        });
    };

    useEffect(() => {
        if (bets) {
            const currentUser = bets.find((bet: Bet) => bet.player._id === tempUserId);
            currentUser ? setBetsPlaced(true) : setBetsPlaced(false)
        }
    }, [bets])

    return (
        <>
            {!loadingGroup ? (
                <div className="flex flex-col items-center justify-center w-full">

                    <h4 className="text-4xl py-10 lg:text-5xl font-semibold mx-3 mb-2 md:mb-3">{group.name}</h4>
                    { !betPlaced && (
                        <button className="btn btn-outline mb-4" onClick={handleGroupSelected}>Make your bet</button>
                    )}
                    { !loadingBets ? (
                        bets.map((bet: Bet) => (
                            <div className="w-1/2 collapse collapse-plus bg-base-100 border border-base-300">
                                <input type="radio" name="my-accordion-3" defaultChecked />
                                <div className="collapse-title font-semibold">{bet.player.name}</div>
                                <div className="collapse-content text-sm">
                                    <div className="mx-auto w-1/2 overflow-x-auto">
                                        <table className="table table-zebra">
                                            <thead>
                                                <tr>
                                                    <th>Position</th>
                                                    <th>Driver</th>
                                                    <th>Race Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            { bet.betLines.map((line: BetLine) => (
                                                <tr>
                                                    <th>{line.position}</th>
                                                    <th>{line.driver.code}</th>
                                                    <th>{line.driverStatus}</th>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))
                    ): ''}
                </div>
                ) : ''}
        </>
    )
}