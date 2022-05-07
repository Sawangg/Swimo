// Import components
import Bar from "components/Bar";

// Import material-ui
import { Typography } from "@mui/material";
import { useLoginStore } from "../stores/useLogin";


export default function Pofile() {
    const { user } = useLoginStore();

    return (
        <div>
            <Bar />
            <Typography gutterBottom variant="h5" align="center">
                {user.prenom} {user.nom}
            </Typography>
        </div>
    );
}
