import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tarefa } from "../../../models/Tarefa";

function EditarTarefa(){
    const {boardId,tarefaId} = useParams<string>();
    const navigate = useNavigate();
    const [tarefa, setTarefa] = useState<Tarefa>({
        id:parseInt (tarefaId!),
        title: "",
        description: "",
        situacao: 1,
        boardId:parseInt (boardId!),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch(`http://localhost:5088/api/cards/${tarefaId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tarefa),
        }).then((response) => {
            if (response.ok) {
                navigate(`/page/board/${boardId}`);
            }
        });
    };

    return (
        <div className="section content">
            <h1 className="title">Editar Tarefa</h1>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="title" className="label">Título</label>
                    <div className="control">
                        <input
                            type="text"
                            id="title"
                            className="input"
                            value={tarefa.title}
                            onChange={(e) => setTarefa({ ...tarefa, title: e.target.value })}
                            required/>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="description" className="label">Descrição</label>
                    <div className="control">
                        <textarea
                            id="description"
                            className="textarea"
                            value={tarefa.description}
                            onChange={(e) => setTarefa({ ...tarefa, description: e.target.value })}/>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="situacao" className="label">Situação</label>
                    <div className="control">
                        <div className="select">
                            <select
                                id="situacao"
                                value={tarefa.situacao}
                                onChange={(e) => setTarefa({ ...tarefa, situacao: parseInt(e.target.value) })}>
                                <option value={1}>Pendente</option>
                                <option value={2}>Em andamento</option>
                                <option value={3}>Concluído</option>
                            </select>
                        </div>
                    </div>
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

export default EditarTarefa;