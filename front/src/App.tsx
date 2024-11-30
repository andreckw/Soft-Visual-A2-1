import Login from "./components/pages/user/Login";
import { createContext, useState } from "react";
import Navbar from "./components/pages/Navbar";
import AreasDeTrabalhoPublico from "./components/pages/boards/AreasDeTrabalhoPublico";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Cadastro from "./components/pages/user/Cadastro";
import AreaDeTrabalho from "./components/pages/boards/AreaDeTrabalho";
import "bulma/css/bulma.min.css";
import Logout from "./components/pages/user/Logout";
import CriarAreaDeTrabalho from "./components/pages/boards/CriarAreaDeTrabalho";
import CriarTarefa from "./components/pages/boards/CriarTarefa";
import EditarTarefa from "./components/pages/boards/EditarTarefa";
import EditarAreaDeTrabalho from "./components/pages/boards/EditarAreaDeTrabalho";
import ListaAreaDeTrabalho from "./components/pages/boards/ListaAreaDeTrabalhos";

export const UserContext = createContext({setUserLogado: (event: any) => {}, userLogado: {id: null}});

function App() {
    const [userLogado, setUserLogado] = useState({id: null});

    return (
        <div className="block">
            <UserContext.Provider value={{setUserLogado, userLogado}}>
                <BrowserRouter>
                    <Navbar />

                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/page/logout" element={<Logout />} />
                        <Route path="/page/cadastro" element={<Cadastro />} />
                        <Route path="/page/boards/publicos" element={<AreasDeTrabalhoPublico />} />
                        <Route path="/page/board/:id" element={<AreaDeTrabalho />} />
                        <Route path="/page/board/criar" element={<CriarAreaDeTrabalho />} />
                        <Route path="/page/board/:id/tarefa/nova" element={<CriarTarefa />} />
                        <Route path="/page/board/:boardId/tarefa/:tarefaId/editar" element={<EditarTarefa />} />
                        <Route path="/page/board/:boardId/editar" element={<EditarAreaDeTrabalho />} />
                        <Route path="/page/boards" element={<ListaAreaDeTrabalho />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    )
}

export default App;