import {useAddGroup} from "../hooks/usePostGroup.ts";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import {useCallback, useState} from "react";
import {useNavigate} from "react-router";
import {BetGroup} from "../models/BetGroup.ts";
import {useGetPlayerGroups} from "../hooks/useGetGroup.ts";

type FormFields = {groupName: string};

const createNewBetGroup = yup.object({
    groupName: yup.string().trim().required(),
})
export const CreateGroupPage = () => {
    const [tempUserId, setTempUserId] = useState('68207197c81526623aceafc6')

    const navigate = useNavigate();

    const {register, handleSubmit, reset} = useForm({
        resolver: yupResolver(createNewBetGroup),
    })
    const addGroup = useAddGroup()
    const onSubmit = useCallback(
        (data: FormFields) => {
            addGroup.mutate({groupName: data.groupName, playerId: tempUserId}, {
                onSuccess: (response) => {
                    let group: BetGroup = response.data
                    reset()
                    navigate(`/group/${group._id}`)
                }
            })
        }
    , [addGroup])

    const {data: groups, isLoading, isError} = useGetPlayerGroups('68207197c81526623aceafc6')

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full">
                <div className="bg-white inline-flex flex-col items-center justify-center rounded-sm p-4 w-auto h-auto">
                    <h4 className="text-xl font-bold text-font-light border-b-1 border-gray-500">Créer un groupe</h4>
                    <form className="flex flex-col text-font-light pt-2 ">
                        <input className="border-1 border-gray-500 m-5" {...register('groupName')}></input>
                        <button className="btn" onClick={handleSubmit(onSubmit)} disabled={addGroup.isPending}>
                            Valider
                        </button>
                    </form>
                </div>
            </div>
            <div className="mx-auto w-1/2 overflow-x-auto">
                <h3 className="text-2xl py-10 lg:text-5xl font-semibold mx-3 mb-2 md:mb-3">Your betting groups</h3>
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Members</th>
                    </tr>
                    </thead>
                    <tbody>
                    {  groups ? (
                        groups.map((group: BetGroup, index: number) => (
                            <tr className="hover:bg-base-300 cursor-pointer" onClick={() => navigate(`/group/${group._id}`)}>
                                <th>{index + 1}</th>
                                <td>{group.name}</td>
                                <td>{group.players.length}</td>
                            </tr>
                        ))
                    ) : ''}
                    </tbody>
                </table>
            </div>
        </>

    )
}