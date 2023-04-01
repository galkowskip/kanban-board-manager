import Link from "next/link"
import { Board } from "./board.entity"

const getBoard = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8090/api/collections/board_tables/records/')
        const data = await response.json()

        return data.items as Board[] || []
    } catch {
        return []
    }
}

export default async function BoardsPage() {

  const boards = await getBoard()

  return (
    <main>
      <h1>Boards</h1>

        <ul>
            {boards.map((board: Board) => (
                <BoardListItem key={board.id} board={board}/>
            ))}

        </ul>

    </main>
  )
}

export function BoardListItem({board} : {board: Board}) {
    return ( 
        <li>
            <Link href={`/boards/${board.id}`}>
                {board.title}
            </Link>
        </li>
    )
}