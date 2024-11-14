import { Board } from "./Board";

export interface User {
    id?: number;
    nome?: string;
    email: string;
    senha: string;
    criadoEm?: string;
    boards?: Board[];
}