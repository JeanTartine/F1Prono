import {useAddBet} from "../hooks/usePostBet.ts";

export const CreateGroupPage = () => {


    const addBet = useAddBet()

    return (
        <div>
            {false ? (
                <h4>'Loading query'</h4>
            ) : (
                <button onClick={() => {
                    addBet.mutate({
                        raceName: 'vroum',
                        position: 1,
                        driverId: 'PIA',
                        playerId: 1,
                        groupId: 1
                    });
                }}>
                    Console query result</button>
            )}
        </div>
    )
}