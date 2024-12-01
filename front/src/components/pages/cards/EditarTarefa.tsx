import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tarefa } from "../../../models/Tarefa";

function EditarTarefa() {
    const { boardId, tarefaId } = useParams<string>();
    const navigate = useNavigate();
    const [situacaoTarefa, setSituacaoTarefa] = useState(1);
    const [titleTarefa, setTitleTarefa] = useState("");
    const [descriptionTarefa, setDescriptionTarefa] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5088/api/cards/${tarefaId}`)
            .then((resp) => {
                return resp.json();
            })
            .then((tarefaResp: Tarefa) => {
                setSituacaoTarefa(tarefaResp.situacao);
                setTitleTarefa(tarefaResp.title);
                setDescriptionTarefa(tarefaResp.description);
            });
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newTarefa: Tarefa = {
            id: parseInt(tarefaId!),
            title: titleTarefa,
            description: descriptionTarefa,
            situacao: situacaoTarefa,
            boardId: parseInt(boardId!), 
        }

        fetch(`http://localhost:5088/api/cards/${tarefaId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTarefa),
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
                            placeholder={titleTarefa}
                            onChange={(e) => {setTitleTarefa(e.target.value)}}
                            required />
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="description" className="label">Descrição</label>
                    <div className="control">
                        <textarea
                            id="description"
                            className="textarea"
                            placeholder={descriptionTarefa}
                            onChange={(e) => { setDescriptionTarefa(e.target.value) }} />
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="situacao" className="label">Situação</label>
                    <div className="control">
                        <div className="select">
                            <select
                                id="situacao"
                                onChange={(e) => { setSituacaoTarefa(parseInt(e.target.value)) }}>
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