import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";

function CriarAreaDeTrabalho() {
    const [name, setName] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const navigate = useNavigate();
    const { userLogado } = useContext(UserContext);

    useEffect(() => {
        if (userLogado.id == null) {
            navigate("/");
        }
    });

    return (
        <div className="section">
            <h1 className="title">Criar nova Area de trabalho</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    const novoBoard = { name: name, isPublic: isPublic, usuarioId: userLogado.id };
                    console.log(novoBoard);

                    fetch("http://localhost:5088/api/boards", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(novoBoard),
                    })
                        .then((response) => response.ok && response.json())
                        .then((board) => {
                            if (board) {
                                console.log("Area de trabalho criada:", board);
                                navigate(`/page/board/${board.id}`);
                            } else {
                                alert("Area de trabalho nao criada");
                            }
                        });
                }}
            >
                <div className="field">
                    <label className="label" htmlFor="name">Nome da Área</label>
                    <div className="control">
                        <input
                            className="input"
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                        />
                        &nbsp; Publico
                    </label>
                </div>

                <div className="control">
                    <button className="button is-link" type="submit">
                        Criar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CriarAreaDeTrabalho;
