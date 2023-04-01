'use client'

import { useState } from "react"
import { BoardColumn } from "../board.entity"

function submitBoardItemForm(event: any, column: BoardColumn) {
    event.preventDefault()
    
    const title = event.target.title.value
    const description = event.target.description.value

    console.log(title, description)
    
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
}

export function CreateNewItemButton({ column }: { column: BoardColumn}) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>

            <CreateNewItemForm column={column} isOpen={isOpen} />
        </div>
    )
}

export function CreateNewItemForm({ column, isOpen }: { column: BoardColumn,isOpen: boolean }) {
    if (!isOpen) return null

    return (
        <div>
            <form className="flex flex-col" onSubmit={(event) => submitBoardItemForm(event, column)}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" />
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}