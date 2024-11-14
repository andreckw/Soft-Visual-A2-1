import { useState } from "react";
import { User } from "../../../models/User";

function Login() {

    const [email, setEmail] = useState(String);
    const [senha, setSenha] = useState(String);

    function enviar(e: any) {
        e.preventDefault();

        var usuario: User = {
            email: email,
            senha: senha
        };

        fetch("http://localhost:5088/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        }).then(resp => {
            return resp.json();
        }).then(userResp => {
        })
    }

    return (
        <div>
            <form action="" onSubmit={enviar}>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" onChange={(e: any) => setEmail(e.target.value)}/>

                <label htmlFor="password" >Senha:</label>
                <input type="password" id="password" onChange={(e: any) => setSenha(e.target.value)}/>

                <button type="submit">
                    Enviar
                </button>
            </form>

        </div>
    );

}

export default Login;