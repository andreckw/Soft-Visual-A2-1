import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Board } from "../../../models/Board";

function ListaAreaDeTrabalho(){
    const [boards, setBoards] = useState<Board[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5088/api/boards", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setBoards(data));
    }, []);

    const handleClick = (boardId: number) => {
        navigate(`/page/board/${boardId}`);
    };

    return (
        <div className="section content">
            <h1 className="title">Áreas de Trabalho</h1>
            <div className="buttons">
                <button
                    className="button is-primary"
                    onClick={() => navigate("/page/board/criar")}>
                    Criar Nova Área de Trabalho
                </button>
            </div>

            <table className="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Público</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map((board) => (
                        <tr key={board.id} onClick={() => handleClick(board.id)}>
                            <td>{board.id}</td>
                            <td>{board.name}</td>
                            <td>{board.isPublic ? "Sim" : "Não"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaAreaDeTrabalho;