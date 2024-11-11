import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import { Board } from "../../../models/Board";

function Tarefas() {
    const [board, setBoard] = useState<Board>()

    useEffect(() => {
        fetch("http://localhost:5088/api/boards/consultar/5", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            return resp.json();
        }).then(board => {
            setBoard(board);
        })
    })

    return (
        <div>
            <h1>{board?.name}</h1>
            <table border={1}>
                {board?.cards.map(c => (
                    <tr>
                        <td>{c.title}</td>
                        <td>{c.situacao}</td>
                        <td>{c.description}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default Tarefas;