import { useState } from "react";
import { User } from "../../../models/User";


function Cadastro() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function enviar(e: any) {
        e.preventDefault();

        var user: User = {
            nome: name,
            email: email,
            senha: password
        }

        fetch("http://localhost:5088/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }).then(resp => {
            console.log(resp);
            return resp.json();
        }).then(userResp => {
            
        })
    }

    return (
        <div className="section content">
            <form action="" onSubmit={enviar}>

                <div className="field">
                    <label htmlFor="name" className="label">Nome </label>

                    <div className="control">
                        <input type="text" id="name" className="input" onChange={(e: any) => setName(e.target.value)} />
                    </div>
                </div>

                <div className="field">
                    <label className="label" htmlFor="email">E-mail </label>

                    <div className="control">
                        <input className="input" type="text" id="email" onChange={(e: any) => setEmail(e.target.value)} />
                    </div>
                </div>

                <div className="field">
                    <label className="label" htmlFor="password">Senha </label>

                    <div className="control">
                        <input className="input" type="text" id="password" onChange={(e: any) => setPassword(e.target.value)} />
                    </div>
                </div>

                <button type="submit" className="button is-success">
                    Enviar
                </button>
            </form>
        </div>
    )

}

export default Cadastro;