import { Key } from "react"
import { BoardColumn, Board, BoardItem } from "../board.entity"

const getBoardData = async function (id: string) {
    try {
        const response = await fetch(`http://127.0.0.1:8090/api/collections/board_tables/records/${id}?expand=columns`)

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

const getColumns = async function (columns: Key[] | BoardColumn[]) {
    if (typeof columns[0] === 'object') {
        return columns as BoardColumn[]
    }

    const queue = columns.map(async (column) => {
        return await fetch(`http://127.0.0.1:8090/api/collections/board_columns/records/${column}?expand=assigned_items`)
    })

    try {
        const response = await Promise.all(queue)

        const data = await Promise.all(response.map(async (res) => await res.json()))

        const columnsWithItems = await data.map(async (column) => {
            const items = await fetch(`http://127.0.0.1:8090/api/collections/board_items/records??filter=(column='${column.id}')`)
            const itemsData = await items.json()
            return {
                ...column,
                assigned_items: itemsData.items
            }
        })
        const dataWithItems = await Promise.all(columnsWithItems)

        return dataWithItems as BoardColumn[] || []
    } catch {
        return []
    }
}

export default async function BoardPage({ params }: { params: { id: string } }) {
    const board = await getBoardData(params.id)
    const columns = await getColumns(board.columns)

    return (
        <main>
            <h1>Board: {board.title}</h1>

            <div>
                <h2>Columns</h2>

            </div>


            <div className={`w-full grid grid-col`} style={{gridTemplateColumns: `repeat(${columns.length}, 1fr)`}}>
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
    return (
        <div>
            <h3>{column.title}</h3>

            <div className="flex flex-col">
                {
                    column.assigned_items.map((item: BoardItem) => (
                        <BoardListItem key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    )
}

export function BoardListItem({ item }: { item: any }) {
    return (
        <div>
            {item.title}
        </div>
    )
}