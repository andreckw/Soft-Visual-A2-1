import { useState } from "react";

function Login() {

    const [email, setEmail] = useState(String);
    const [senha, setSenha] = useState(String);

    function digitarEmail(e: any) {
        setEmail(e.target.value);
    }

    function digitarSenha(e: any) {
        setSenha(e.target.value);
    }

    function clicar() {
        fetch("http://localhost:5088/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                senha: senha,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => {
            console.log(resp);
        })
    }

    return (
        <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" onChange={digitarEmail}/>

            <br /><br />
            <label htmlFor="password">Senha:</label>
            <input type="text" id="password" onChange={digitarSenha}/>

            <br /><br />
            <button onClick={clicar}>
                Logar
            </button>
        </div>
    );

}

export default Login;