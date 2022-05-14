import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { Button } from "ui/Button";

export default function Pofile() {
    const navigate = useNavigate();
    const { user, resetLoggerUser } = useLogin();

    const disconnect = () => {
        resetLoggerUser();
        navigate("/");
    };

    return (
        <>
            <div>
                {user.prenom} {user.nom}
            </div>
            <Button onClick={() => disconnect()}>Déconnexion</Button>
        </>
    );
}
