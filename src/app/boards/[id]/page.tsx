import { Key } from "react"
import { BoardColumn, BoardItem } from "../board.entity"

import { CreateNewItemButton } from "./CreateNewItemForm"
import { BoardListItem } from "./BoardListItem"
import { CreateNewColumnButton } from "./CreateNewColumnForm"
import { BoardColumnHeader } from "./BoardColumnHeader"

import { getBoardColumnsData, getBoardData, getColumnItems } from "@/app/api/BoardHelper"

export default async function BoardPage({ params }: { params: { id: string } }) {
    const board = await getBoardData(params.id)
    const columns: BoardColumn[] = await getBoardColumnsData(params.id)

    return (
        <main>
            <div className="flex justify-between">
                <h1>Board: {board.title}</h1>
            </div>

            <div className={`w-full grid grid-col gap-5 mt-10`} style={{ gridTemplateColumns: `repeat(${columns.length + 1}, 1fr)` }}>
                {
                    columns.map((column, index) => (
                        /* @ts-expect-error Async Server Component */
                        <BoardListColumn key={column.id} column={column} prevColumn={columns[index - 1]?.id} nextColumn={columns[index + 1]?.id} />
                    ))
                }

                <CreateNewColumnButton board={board} />
            </div>
        </main>
    )
}

export async function BoardListColumn({ column, prevColumn, nextColumn }: { column: BoardColumn, prevColumn: Key, nextColumn: Key }) {
    const assigned_items = await getColumnItems(column.id)

    if (Array.isArray(assigned_items) && assigned_items.length > 0 && !assigned_items.every((item) => item === null)) {
        return (
            <div className="border-stone-300 border-2 rounded p-4">

                <BoardColumnHeader column={column} prevColumn={prevColumn} nextColumn={nextColumn} />

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

                <BoardColumnHeader column={column} prevColumn={prevColumn} nextColumn={nextColumn} />

                <div className="mt-5">
                    <CreateNewItemButton column={column} />
                </div>
            </div>
        )
    }
}