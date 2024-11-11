import { useState } from "react";
import Login from "./components/pages/user/Login";
import AreasDeTrabalhoPublico from "./components/pages/boards/AreasDeTrabalhoPublico";
import Tarefas from "./components/pages/cards/Tarefas";

function App() {
    const [component, setComponent] = useState(<Login />);

    function click(e: any) {
        if (e.target.id == 0) {
            setComponent(<Login />);

        } else if (e.target.id == 1) { // Colocar para cadastrar
            setComponent(<Login />);

        } else if (e.target.id == 2) { 
            setComponent(<AreasDeTrabalhoPublico />);

        } else if (e.target.id == 3) { // Colocar para criar Areas de trabalho
            setComponent(<Tarefas />)

        }

    }

    return (
        <div>
            <nav>
                <ul>
                    <li> <button onClick={click} id="0"> Login </button> </li>
                    <li> <button onClick={click} id="1"> Cadastrar </button> </li>
                    <li> <button onClick={click} id="2"> Areas de trabalho </button> </li>
                    <li> <button onClick={click} id="3"> Criar Area de trabalho </button> </li>
                </ul>
            </nav>
            <br />
            {component}
        </div>
    )
}

export default App;