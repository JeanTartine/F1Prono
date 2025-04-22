import {usePlayerApi} from "../hooks/usePlayerApi.ts";

export const CreateGroupPage = () => {

    const {createPlayer} = usePlayerApi()

    return (
        <div>
            {createPlayer.isPending ? (
                <h4>'Adding player...'</h4>
            ) : (
                <button onClick={() => createPlayer.mutate('Test')}>Add New Player</button>
            )}
        </div>
    )
}