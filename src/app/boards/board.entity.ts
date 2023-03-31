import { Key } from "react";
import { User } from "../user.entity";

export interface Board {
    id: Key;
    title: string;
    assigned_users: Key[] | User[];
    columns: Key[] | BoardColumn[];
    expand?: any;
    created_at: string;
    updated_at: string;
}

export interface BoardColumn {
    id: Key;
    title: string;
    board_id: Key | Board;
    assigned_items?: BoardItem[];
    created_at: string;
    updated_at: string;
    expand?: any;
}

export interface BoardItem {
    id: Key;
    title: string;
    assigned_column: Key | BoardColumn;
    assigned_users: Key[] | User[];
    created_at: string;
    updated_at: string;
}