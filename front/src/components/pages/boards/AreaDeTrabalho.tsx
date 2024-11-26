import { useParams } from "react-router-dom";
import { Board } from "../../../models/Board";
import { Tarefa } from "../../../models/Tarefa";
import { useEffect, useState } from "react";

function AreaDeTrabalho() {
    const {id} = useParams();
    const [board, setBoard] = useState<Board>({
        id: 0,
        name: "",
        cards: [],
        isPublic: false,
    });

    useEffect(() => {
        fetch(`http://localhost:5088/api/boards/consultar/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((resp) => {
            return resp.json();
        }).then((respBoard) => {
            setBoard(respBoard);
        })
    });

    return (
        <div className="section content">
            <h1 className="title is-1">{board.name}</h1>
            <table className="table-container table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Titulo</th>
                        <th>Descrição</th>
                        <th>Situação</th>
                    </tr>
                </thead>
                <tbody>
                    {board.cards.map(card => (
                        <tr>
                            <td> {card.id} </td>
                            <td> {card.title} </td>
                            <td> {card.description} </td>
                            <td> {card.situacao == 1 ?
                                    "Pendente" :
                                    card.situacao == 2 ?
                                    "Em andamento" :
                                    "Concluido"} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AreaDeTrabalho;