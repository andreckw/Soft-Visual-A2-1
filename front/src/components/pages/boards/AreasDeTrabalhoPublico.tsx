import { useContext, useEffect, useState } from "react";
import { Board } from "../../../models/Board";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";

function AreasDeTrabalhoPublico() {
    let { userLogado } = useContext(UserContext);
    const [boards, setBoards] = useState<Board[]>([])

    useEffect(() => {
        console.log(userLogado);
        fetch("http://localhost:5088/api/boards/publicos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => {
            return resp.json();
        }).then(boards => {
            setBoards(boards);
        });

    })

    return (
        <div className="section content">
            <table className="table-container table is-fullwidth is-hoverable">
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
                                <div className="buttons is-right">
                                    <Link to={`/page/board/${board.id}`} className="button is-link"> Visualizar </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AreasDeTrabalhoPublico;