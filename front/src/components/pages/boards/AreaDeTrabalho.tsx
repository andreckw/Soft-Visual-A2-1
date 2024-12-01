import { useParams } from "react-router-dom";
import { Board } from "../../../models/Board";
import { Tarefa } from "../../../models/Tarefa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

    const handleDelete = (cardId: number) => {
        fetch(`http://localhost:5088/api/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            console.log(response);
            if (response.ok) {
                setBoard((prevBoard) => ({
                    ...prevBoard,
                    cards: prevBoard.cards.filter(card => card.id !== cardId)
                }));
            } else {
                alert("Erro ao excluir a tarefa.");
            }
        });
    };

    return (
        <div className="section content">
            <h1 className="title is-1">{board.name}</h1>

            <div className="buttons">
                    <Link to={`/page/board/${board.id}/tarefa/nova`}>
                                    <button className="button is-warning">
                                        Criar Tarefa
                                    </button>
                    </Link>

                    <Link to={`/page/board/${board.id}/editar`}>
                                    <button className="button is-warning">
                                        Editar Área de Trabalho
                                    </button>
                    </Link>
            </div>

            

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
                            <td>
                                <Link to={`/page/board/${id}/tarefa/${card.id}/editar`}>
                                    <button className="button is-warning">
                                        Editar
                                    </button>
                                </Link>


                                <button
                                    className="button is-danger"
                                    onClick={() => handleDelete(card.id!)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AreaDeTrabalho;