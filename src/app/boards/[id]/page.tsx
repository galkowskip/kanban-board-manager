import { Key } from "react"
import { BoardColumn, Board, BoardItem } from "../board.entity"

import { CreateNewItemButton } from "./CreateNewItemForm"
import { BoardListItem } from "./BoardListItem"
import { CreateNewColumnButton } from "./CreateNewColumnForm"

const getBoardData = async function (id: string) {
    try {
        const response = await fetch(`http://127.0.0.1:8090/api/collections/board_tables/records/${id}`, { cache: 'no-store' })

        const data = await response.json()

        if (data.error) {
            throw data.error
        } else {
            return data as Board
        }
    } catch {
        return {} as Board
    }
}

const getBoardColumnsData = async function (boardId: string) {
    try {
        const res = await fetch(`http://127.0.0.1:8090/api/collections/board_columns/records?filter[board_id][eq]=${boardId}`, { cache: 'no-store' })
        const data = await res.json()

        return data.items as BoardColumn[]
    } catch {
        return [] as BoardColumn[]
    }
}


export default async function BoardPage({ params }: { params: { id: string } }) {
    const board = await getBoardData(params.id)
    const columns: BoardColumn[] = await getBoardColumnsData(params.id)

    return (
        <main>
            <div className="flex justify-between">
                <h1>Board: {board.title}</h1>

                <CreateNewColumnButton boardId={board.id} />
            </div>

            <div className={`w-full grid grid-col gap-5 mt-10`} style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
                {
                    columns.map((column, index) => (
                        /* @ts-expect-error Async Server Component */
                        <BoardListColumn key={column.id} column={column} prevColumn={columns[index - 1]?.id} nextColumn={columns[index + 1]?.id} />
                    ))
                }
            </div>
        </main>
    )
}

const getColumnItems = async function (columnId: Key) {
    try {
        const res = await fetch(`http://127.0.0.1:8090/api/collections/board_items/records?filter=(column='${columnId}')`,)
        const data = await res.json()

        return data.items as BoardItem[]
    } catch {
        return [] as BoardItem[]
    }
}

export async function BoardListColumn({ column, prevColumn, nextColumn }: { column: BoardColumn, prevColumn: Key, nextColumn: Key }) {
    const assigned_items = await getColumnItems(column.id)

    if (Array.isArray(assigned_items) && assigned_items.length > 0 && !assigned_items.every((item) => item === null)) {
        return (
            <div className="border-stone-300 border-2 rounded p-4">
                <h2 className="text-xl capitalize">{column.title}</h2>

                <div className="flex flex-col">
                    {
                        assigned_items.map((item: BoardItem) => (
                            <BoardListItem
                                key={item.id}
                                item={item}
                                prevColumn={prevColumn}
                                nextColumn={nextColumn}
                            />
                        ))
                    }
                </div>

                <div className="mt-5">
                    <CreateNewItemButton column={column} />
                </div>
            </div>
        )
    } else {
        return (
            <div className="border-stone-300 border-2 rounded p-4">
                <h2 className="text-xl capitalize">{column.title}</h2>

                <div className="mt-5">
                    <CreateNewItemButton column={column} />
                </div>
            </div>
        )
    }
}