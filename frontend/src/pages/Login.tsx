import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, TextField } from "@mui/material";
import { useLoginStore } from "../stores/useLogin";

export default function Login() {
    const { setLoggedUser } = useLoginStore();
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState({ user: "", pwd: "" });

    const connectClick = async () => {
        const loggedSuccessfully = await setLoggedUser(loginState.user, loginState.pwd);
        if (loggedSuccessfully) {
            navigate("/house");
            setLoginState({ user: "", pwd: "" });
        }
    };

    return (
        <>
            <FormControl size="small" variant="outlined">
                <TextField id="outlined-login" autoFocus size="small" variant="outlined"
                    label="Login"
                    onChange={e => setLoginState({ user: e.target.value, pwd: loginState.pwd })}
                />
                <TextField id="outlined-login" autoFocus size="small" variant="outlined"
                    label="Password"
                    onChange={e => setLoginState({ user: loginState.user, pwd: e.target.value })}
                />
                <Button type="submit" variant="outlined" onClick={() => connectClick()}>Connexion</Button>
            </FormControl>
        </>
    );
}
