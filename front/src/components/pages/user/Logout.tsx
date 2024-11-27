import { useContext, useEffect } from "react";
import { UserContext } from "../../../App";
import { useNavigate } from "react-router-dom";

function Logout() {
    const {userLogado, setUserLogado} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        setUserLogado({id: null});
        navigate("/");
    });

    return (
        <div></div>
    )
}

export default Logout;