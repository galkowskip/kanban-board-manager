import { BoardColumn, Board, BoardItem } from "../board.entity"

import { CreateNewItemButton } from "./CreateNewItemForm"

const getBoardData = async function (id: string) {
    try {
        const response = await fetch(`http://127.0.0.1:8090/api/collections/board_tables/records/${id}?expand=columns.assigned_items`)

        const data = await response.json()
        console.log(data.expand.columns)

        if (data.error) {
            throw data.error
        } else {
            return data as Board
        }
    } catch {
        return {} as Board
    }
}

export default async function BoardPage({ params }: { params: { id: string } }) {
    const board = await getBoardData(params.id)
    const columns: BoardColumn[] = board.expand?.columns

    return (
        <main>
            <h1>Board: {board.title}</h1>

            <div className={`w-full grid grid-col gap-5 mt-10`} style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
                {
                    columns.map((column) => (
                        <BoardListColumn key={column.id} column={column} />
                    ))
                }
            </div>
        </main>
    )
}


export function BoardListColumn({ column }: { column: BoardColumn}) {
    const assigned_items = column.expand?.assigned_items
    if (Array.isArray(assigned_items)) {
        return (
            <div className="border-stone-300 border-2 rounded p-4">
                <h2 className="text-xl capitalize">{column.title}</h2>

                <div className="flex flex-col">
                    {
                        assigned_items.map((item: BoardItem) => (
                            <BoardListItem key={item.id} item={item} />
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

export function BoardListItem({ item }: { item: any }) {
    return (
        <div>
            {item.title}
        </div>
    )
}

