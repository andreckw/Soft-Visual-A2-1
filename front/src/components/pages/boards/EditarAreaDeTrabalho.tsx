import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Board } from "../../../models/Board";

function EditarAreaDeTrabalho(){
    const {boardId} = useParams();
    const navigate = useNavigate();
    const [board,setBoard] = useState<Board>({
        id: 0,
        name: "",
        isPublic: false,
        cards: [],
    });

    useEffect(() => {
        fetch(`http://localhost:5088/api/boards/consultar/${boardId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((boardResp) => setBoard(boardResp));
    }, [boardId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch(`http://localhost:5088/api/boards/${boardId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(board),
        }).then((response) => {
            if (response.ok) {
                navigate(`/page/board/${board.id}`);
            }
        });
    };

    return (
        <div className="section content">
            <h1 className="title">Editar Área de Trabalho</h1>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="name" className="label">Nome</label>
                    <div className="control">
                        <input
                            type="text"
                            id="name"
                            className="input"
                            value={board.name}
                            onChange={(e) => setBoard({ ...board, name: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={board.isPublic}
                            onChange={(e) => setBoard({ ...board, isPublic: e.target.checked })}
                        />
                        Público
                    </label>
                </div>

                <div className="control">
                    <button type="submit" className="button is-primary">
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditarAreaDeTrabalho;