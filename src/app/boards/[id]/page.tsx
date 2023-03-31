import { BoardColumn, Board, BoardItem } from "../board.entity"
import style from "./Board.module.css"

const getBoardData = async function (id: string) {
    try {
        const response = await fetch(`http://127.0.0.1:8090/api/collections/board_tables/records/${id}?expand=columns.assigned_items`)

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

export default async function BoardPage({ params }: { params: { id: string } }) {
    const board = await getBoardData(params.id)
    const columns: BoardColumn[] = board.expand?.columns

    return (
        <main>
            <h1>Board: {board.title}</h1>

            <div>
                <h2>Columns</h2>
            </div>


            <div className={`w-full grid grid-col`} style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
                {
                    columns.map((column) => (
                        <BoardListColumn key={column.id} column={column} />
                    ))
                }
            </div>
        </main>
    )
}


export function BoardListColumn({ column }: { column: BoardColumn }) {
    const assigned_items = column.expand?.assigned_items
    if (Array.isArray(assigned_items)) {
        return (
            <div className={style.column}>
                <h3>{column.title}</h3>

                <div className="flex flex-col">
                    {
                        assigned_items.map((item: BoardItem) => (
                            <BoardListItem key={item.id} item={item} />
                        ))
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h3>{column.title}</h3>
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