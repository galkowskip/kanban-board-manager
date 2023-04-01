'use client'

import { useState } from "react"
import { BoardColumn } from "../board.entity"
import { useRouter } from "next/navigation"

export function CreateNewItemButton({ column }: { column: BoardColumn }) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)} className="flex mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                    Add New Item
                </span>
            </button>

            <CreateNewItemForm column={column} isOpen={isOpen} />
        </div>
    )
}

export function CreateNewItemForm({ column, isOpen }: { column: BoardColumn, isOpen: boolean }) {
    if (!isOpen) return null

    const router = useRouter()

    const submitBoardItemForm = function (event: any, column: BoardColumn) {
        event.preventDefault()

        const title = event.target.title.value
        const description = event.target.description.value

        fetch(`http://127.0.0.1:8090/api/collections/board_items/records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                title,
                description,
                column: column.id
            })
        })

        event.target.title.value = ''
        event.target.description.value = ''

        router.refresh()
    }

    return (
        <div>
            <hr className="mb-4" />

            <form className="flex flex-col" onSubmit={(event) => submitBoardItemForm(event, column)}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" className="mt-2 border-2 rounded border-gray-300"/>
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" className="mt-2 border-2 rounded border-gray-300"/>
                <button className="mt-6 rounded" type="submit" >Create</button>
            </form>
        </div>
    )
}