// Import components
import Bar from "components/Bar";

// Import material-ui
import { Button, Typography } from "@mui/material";
import { useLoginStore } from "../stores/useLogin";
import { useNavigate } from "react-router-dom";

export default function Pofile() {
    const navigate = useNavigate();
    const { user, resetLoggerUser } = useLoginStore();

    const disconnect = () => {
        resetLoggerUser();
        navigate("/");
    };

    return (
        <>
            <Bar />
            <Typography gutterBottom variant="h5" align="center">
                {user.prenom} {user.nom}
            </Typography>
            <Button type="submit" variant="outlined" onClick={() => disconnect()}>Déconnexion</Button>
        </>
    );
}
