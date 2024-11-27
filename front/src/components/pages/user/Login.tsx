import { useContext, useState } from "react";
import { User } from "../../../models/User";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";


function Login() {
    let { setUserLogado } = useContext(UserContext);
    const [email, setEmail] = useState(String);
    const [senha, setSenha] = useState(String);
    let navigate = useNavigate();

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
            setUserLogado(userResp);
            navigate("page/boards/publicos");
        });
    }

    return (
        <div className="section content">
            <form action="" onSubmit={enviar}>
                <div className="field">
                    <label htmlFor="email" className="label">Email</label>
                    <div className="control">
                        <input type="text" className="input" id="email" onChange={(e: any) => setEmail(e.target.value)}/>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="email" className="label">Senha</label>
                    <div className="control">
                        <input type="password" className="input" id="password" onChange={(e: any) => setSenha(e.target.value)}/>
                    </div>
                </div>                

                <button type="submit" className="button is-link">
                    Enviar
                </button>
                
            </form>

        </div>
    );

}

export default Login;