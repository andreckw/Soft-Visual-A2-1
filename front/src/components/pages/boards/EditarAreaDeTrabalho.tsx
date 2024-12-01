import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Board } from "../../../models/Board";
import { UserContext } from "../../../App";

function EditarAreaDeTrabalho() {
    const { userLogado } = useContext(UserContext);
    const { boardId } = useParams();
    const navigate = useNavigate();
    const [nameBoard, setNameBoard] = useState("");
    const [isPublicBoard, setIsPublicBoard] = useState(false);

    useEffect(() => {
        if (userLogado.id == null) {
            navigate("/");
        }

        fetch(`http://localhost:5088/api/boards/consultar/${boardId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                return resp.json()
            })
            .then((boardResp: Board) => {
                setNameBoard(boardResp.name);
            });
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newBoard = {
            id: boardId,
            name: nameBoard,
            isPublic: isPublicBoard,
            userId: userLogado.id,
        }

        console.log(newBoard);

        fetch(`http://localhost:5088/api/boards/${boardId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBoard),
        }).then((response) => {
            if (response.ok) {
                navigate(`/page/board/${boardId}`);
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
                            value={nameBoard}
                            onChange={(e) => { setNameBoard(e.target.value) }}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            onChange={(e) => { setIsPublicBoard(e.target.checked) }}
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