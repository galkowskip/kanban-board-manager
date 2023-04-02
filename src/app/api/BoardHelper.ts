import { Board, BoardColumn, BoardItem } from '../boards/board.entity'
import { Key } from 'react'

export const getBoardData = async function (id: string) {
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

export const getBoardColumnsData = async function (boardId: Key) {
    try {
        const res = await fetch(`http://127.0.0.1:8090/api/collections/board_columns/records?filter=(board_id='${boardId}')&sort=order`, { cache: 'no-store' })
        const data = await res.json()

        return data.items as BoardColumn[]
    } catch {
        return [] as BoardColumn[]
    }
}

export const getColumnData = async function (columndId: Key) {
    try {
        const res = await fetch(`http://127.0.0.1:8090/api/collections/board_columns/records/${columndId}`, { cache: 'no-store' })
        const data = await res.json()

        return data as BoardColumn
    } catch {
        return {} as BoardColumn
    }
}

export const getColumnItems = async function (columnId: Key) {
    try {
        const res = await fetch(`http://127.0.0.1:8090/api/collections/board_items/records?filter=(column='${columnId}')`, { cache: 'no-store' })
        const data = await res.json()

        return data.items as BoardItem[]
    } catch {
        return [] as BoardItem[]
    }
}

export const sortAllColumns = async function (columns: BoardColumn[]) {
    try {
        if (columns.length === 0) return []

        const sortedColumns = columns.sort((a, b) => a.order - b.order)

        const promises = sortedColumns.map(async (column, index) => {
            return await fetch(`http://127.0.0.1:8090/api/collections/board_columns/records/${column.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order: index
                })
            })
        })
        await Promise.all(promises)

        return sortedColumns
    } catch {

        return [] as BoardColumn[]
    }

}