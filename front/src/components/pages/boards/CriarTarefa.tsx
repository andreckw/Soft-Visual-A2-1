import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CriarTarefa(){
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [situacao, setSituacao] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const novaTarefa = {
            title,
            description,
            situacao,
        };

        fetch("http://localhost:5088/api/boards/${id}/tarefas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(novaTarefa),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((tarefa) => {
            console.log("Tarefa criada:", tarefa);
            alert("Tarefa criada com sucesso!");
            setTitle("");
            setDescription("");
            setSituacao(1);
        });
    };

    return (
        <div className="section">
            <h1 className="title">Criar Nova Tarefa</h1>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label" htmlFor="title">Título</label>
                    <div className="control">
                        <input
                            className="input"
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label" htmlFor="description">Descrição</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label" htmlFor="situacao">Situação</label>
                    <div className="control">
                        <div className="select">
                            <select
                                id="situacao"
                                value={situacao}
                                onChange={(e) => setSituacao(Number(e.target.value))}
                            >
                                <option value={1}>Pendente</option>
                                <option value={2}>Em andamento</option>
                                <option value={3}>Concluído</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="control">
                    <button className="button is-link" type="submit">
                        Criar Tarefa
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CriarTarefa;