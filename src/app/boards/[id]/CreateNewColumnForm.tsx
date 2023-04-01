'use client'

import { useRouter } from "next/navigation";
import { Key } from "react";

export function CreateNewColumnButton({boardId} : {boardId: Key}) {

    const router = useRouter()

    const createColumn = async function () {
        try {
            const res = await fetch(`http://127.0.0.1:8090/api/collections/board_columns/records`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    board: boardId,
                    title: 'New Column'
                })
            })

            const data = await res.json()

            router.refresh()

            return data

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button onClick={createColumn} className="flex" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Create New Column
        </button>
    )
}