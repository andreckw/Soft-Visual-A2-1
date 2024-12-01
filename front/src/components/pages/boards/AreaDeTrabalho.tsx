import { useParams, useNavigate } from "react-router-dom";
import { Board } from "../../../models/Board";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../App";
import { Link } from "react-router-dom";

function AreaDeTrabalho() {
    const { userLogado } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState<Board>({
        id: 0,
        name: "",
        cards: [],
        isPublic: false,
    });

    useEffect(() => {
        if (userLogado.id == null) {
            navigate("/");
        }

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

            <div className={`buttons ${userLogado.id == null ? "is-hidden" : ""}`}>
                <Link to={`/page/board/${board.id}/tarefa/nova`} className="button is-primary">
                    Criar Tarefa
                </Link>

                <Link to={`/page/board/${board.id}/editar`} className="button is-warning">
                    Editar Área de Trabalho
                </Link>
            </div>



            <table className="table-container table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Titulo</th>
                        <th>Descrição</th>
                        <th>Situação</th>
                        <th></th>
                        <th></th>
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
                                <Link to={`/page/board/${id}/tarefa/${card.id}/editar`}
                                    className={`button is-warning ${userLogado.id == null ? "is-hidden" : ""}`}>
                                    Editar
                                </Link>
                            </td>
                            <td>
                                <button
                                    className={`button is-danger ${userLogado.id == null ? "is-hidden" : ""}`}
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