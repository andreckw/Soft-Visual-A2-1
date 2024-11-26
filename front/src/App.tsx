import { useState } from "react";
import Login from "./components/pages/user/Login";
import AreasDeTrabalhoPublico from "./components/pages/boards/AreasDeTrabalhoPublico";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { User } from "./models/User";
import Cadastro from "./components/pages/user/Cadastro";
import AreaDeTrabalho from "./components/pages/boards/AreaDeTrabalho";
import "bulma/css/bulma.min.css";


function App() {

    return (
        <div className="block">
            <BrowserRouter>
                <nav className="navbar">
                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <div className="navbar-item">
                                <Link to="/" className="button"> Login </Link>
                            </div>

                            <div className="navbar-item">
                                <Link to="/page/cadastro" className="button"> Cadastrar </Link>
                            </div>
                            <div className="navbar-item">
                                <Link to="/page/boards/publicos" className="button"> Areas de trabalho publicas </Link>
                            </div>
                            <div className="navbar-item">
                                <Link to="/" className="button"> Criar Area de trabalho </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/page/cadastro" element={<Cadastro />} />
                    <Route path="/page/boards/publicos" element={<AreasDeTrabalhoPublico />} />
                    <Route path="/page/board/:id" element={<AreaDeTrabalho />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;