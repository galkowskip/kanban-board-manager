'use client'

import { Key } from "react"
import { BoardItem } from "../board.entity"
import { useRouter } from "next/navigation"

export function BoardListItem({ item, prevColumn, nextColumn }: { item: BoardItem, prevColumn: Key, nextColumn: Key }) {
    const router = useRouter()

    const changeColumn = async function (target: Key) {
        try {
            const res = await fetch(`http://127.0.0.1:8090/api/collections/board_items/records/${item.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    column: target
                })
            })
            const data = await res.json()

            router.refresh()

            return data
        } catch (error) {
            console.log(error)
        }
    }

    const hasPrevColumn = prevColumn !== null && prevColumn !== undefined
    const hasNextColumn = nextColumn !== null && nextColumn !== undefined

    const deleteItem = async function () {
        try {

            await fetch(`http://127.0.0.1:8090/api/collections/board_items/records/${item.id}`, {
                method: 'DELETE'
            })

            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-center my-2">
                <div className="mr-auto">
                    <ArrowChangeColumnPrev click={() => changeColumn(prevColumn)} hasPrevColumn={hasPrevColumn} />
                </div>
                {item.title}
                <div className="ml-auto">
                    <ArrowChangeColumnNext click={() => changeColumn(nextColumn)} hasNextColumn={hasNextColumn} />
                </div>
            </div>

            <p className="mt-2 mb-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: item.description }} />

            <div className="flex justify-end">
                <button className="text-red-600" onClick={() => deleteItem()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

function ArrowChangeColumnPrev({ click, hasPrevColumn }: { click: Function, hasPrevColumn: boolean }) {
    if (!hasPrevColumn) {
        return null
    }

    return (
        <button onClick={() => click()} className="mr-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
        </button>
    )
}

function ArrowChangeColumnNext({ click, hasNextColumn }: { click: Function, hasNextColumn: boolean }) {
    if (!hasNextColumn) {
        return null
    }

    return (
        <button onClick={() => click()} className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
        </button>
    )
}