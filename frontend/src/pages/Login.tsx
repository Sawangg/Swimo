import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, TextField } from "@mui/material";
import { useLoginStore } from "../stores/useLogin";
import axios from "axios";

export default function Login() {
    const { setLoggedUser } = useLoginStore();
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState({ user: "", pwd: "" });

    const connectClick = async () => {
        const res = await axios.post("http://localhost:3001/api/auth/login", { username: loginState.user, password: loginState.pwd });
        if (res.status === 201) {
            setLoggedUser(res.data.id, res.data.nom, res.data.prenom, res.data.isAdmin);
            navigate("/house");
        }
        setLoginState({ user: "", pwd: "" });
    };

    return (
        <div>
            <div>
                <FormControl size="small" variant="outlined">
                    <TextField id="outlined-login" autoFocus size="small" variant="outlined"
                        label="Login"
                        onChange={e => setLoginState({ user: e.target.value, pwd: loginState.pwd })}
                    />
                    <TextField id="outlined-login" autoFocus size="small" variant="outlined"
                        label="Password"
                        onChange={e => setLoginState({ user: loginState.user, pwd: e.target.value })}
                    />
                </FormControl>
            </div>
            <Button type="submit" variant="outlined" onClick={() => connectClick()}>Connexion</Button>
        </div>
    );
}
