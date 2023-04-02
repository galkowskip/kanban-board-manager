'use client'
import { Key } from "react"

import { BoardColumn } from "../board.entity"
import { useRouter } from "next/navigation"

export function BoardColumnHeader({ column, prevColumn, nextColumn }: { column: BoardColumn, prevColumn: Key, nextColumn: Key }) {

    const hasPrevColumn = prevColumn !== null && prevColumn !== undefined
    const hasNextColumn = nextColumn !== null && nextColumn !== undefined

    const router = useRouter()

    const changeOrderDown = async function () {
        try {

            await fetch(`http://127.0.0.1:8090/api/collections/board_columns/records/${column.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order: column.order - 1
                })
            })

            await fetch(`http://127.0.0.1:8090/api/collections/board_columns/records/${prevColumn}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order: column.order
                })
            })

            router.refresh()
        } catch (e) {
            console.log(e)
        }
    }

    const changeOrderUp = async function () {
        try {
            await fetch(`http://127.0.0.1:8090/api/collections/board_columns/records/${column.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order: column.order + 1
                })
            })

            await fetch(`http://127.0.0.1:8090/api/collections/board_columns/records/${nextColumn}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order: column.order
                })
            })

            router.refresh()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="flex justify-between">
            <div>
                <button onClick={() => changeOrderDown()} className={hasPrevColumn ? '' : 'hidden'} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
            </div>

            <h2 className="text-xl capitalize">{column.title}</h2>

            <div>
                <button onClick={() => changeOrderUp()} className={hasNextColumn ? '' : 'hidden'}>
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}