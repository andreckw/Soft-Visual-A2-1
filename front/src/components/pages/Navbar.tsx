import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

function Navbar() {
    const { userLogado } = useContext(UserContext);
    
    return (
        <nav className="navbar">
            <div className="navbar-menu">
                <div className="navbar-start">
                    {(userLogado.id === null) ?
                        <div className="navbar-item">
                            <Link to="/" className="button"> Login </Link>
                        </div>
                        :
                        <div>
                        </div>
                    }

                    {(userLogado.id === null) ?
                        <div className="navbar-item">
                            <Link to="/page/cadastro" className="button"> Cadastrar </Link>
                        </div>
                        :
                        <div></div>
                    }

                    <div className="navbar-item">
                        <Link to="/page/boards/publicos" className="button"> Areas de trabalho publicas </Link>
                    </div>

                    {(userLogado.id !== null)? 
                        <div className="navbar-item">
                            <Link to="/" className="button"> Criar Area de trabalho </Link>
                        </div>
                        :
                        <div></div>
                    }

                    {(userLogado.id !== null) ?
                        <div className="navbar-item">
                            <Link to="/page/logout" className="button"> Logout </Link>
                        </div>
                        :
                        <div></div>
                    }

                    {userLogado?.id && (
                        <div className="navbar-item">
                            <Link to="/page/board/criar" className="button is-link">
                                Criar Área de Trabalho
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;