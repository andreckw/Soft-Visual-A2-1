import { useEffect, useState } from "react";
import { Board } from "../../../models/Board";

function AreasDeTrabalhoPublico() {
    const [boards, setBoards] = useState<Board[]>([])

    useEffect(() => {
        fetch("http://localhost:5088/api/boards/publicos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => {
            return resp.json();
        }).then(boards => {
            setBoards(boards);
        })
    })

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th> Nome </th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {boards.map(board => (
                        <tr id="{board.id}">
                            <td> {board.name} </td>
                            <td>
                                <button> Ir para </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AreasDeTrabalhoPublico;