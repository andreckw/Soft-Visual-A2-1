import { Tarefa } from "./Tarefa";

export interface Board {
    id?: number;
    name: string;
    cards: Tarefa[];
    isPublic: boolean;
}