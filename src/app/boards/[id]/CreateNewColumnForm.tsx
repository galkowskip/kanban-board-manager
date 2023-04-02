'use client'

import { useRouter } from "next/navigation";
import { Key } from "react";

export function CreateNewColumnButton({ boardId }: { boardId: Key }) {

    const router = useRouter()

    const createColumn = async function (e: any) {

        e.preventDefault()

        try {

            const title = e.target.title.value 

            if(title === '') return

            const res = await fetch(`http://127.0.0.1:8090/api/collections/board_columns/records`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    board: boardId,
                    title: title
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
        <div className="border-stone-200 border-2 rounded p-4 items-center justify-center border-dashed flex">
            <form
                onSubmit={(e) => createColumn(e)}
                className="flex flex-col items-center"
            >
                <label htmlFor="title" className="mb-2">Title</label>
                <input type="text" name="title" id="title" />

                <button className="text-xl capitalize flex content-center mt-4" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Add Column
                </button>
            </form>
        </div>
    )
}