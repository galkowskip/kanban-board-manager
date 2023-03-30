import { Key } from "react";

export interface User {
    id: Key;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}