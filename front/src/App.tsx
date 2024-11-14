import { useState } from "react";
import Login from "./components/pages/user/Login";
import AreasDeTrabalhoPublico from "./components/pages/boards/AreasDeTrabalhoPublico";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { User } from "./models/User";


function App() {

    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li> <Link to="/"> Login </Link> </li>
                    <li> <Link to="/"> Cadastrar </Link> </li>
                    <li> <Link to="/"> Areas de trabalho </Link> </li>
                    <li> <Link to="/page/boards/publicos"> Criar Area de trabalho </Link> </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/page/boards/publicos" element={<AreasDeTrabalhoPublico />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;