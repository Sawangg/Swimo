import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../stores/useLogin";
import { Button } from "../ui/Button";

export default function Landing() {
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
        <div className="flex flex-row w-screen h-screen">
            <div className="bg-primary-500 w-96 h-screen">

            </div>

            <div className="flex flex-col justify-center items-center w-screen gap-3">
                <h2>Get Started</h2>
                <Button color="secondary" onClick={() => connectClick()}>Register</Button>
                <Button color="transparent" onClick={() => connectClick()}>Login</Button>
            </div>

            {/* <TextField id="outlined-login" autoFocus size="small" variant="outlined"
                label="Login"
                onChange={e => setLoginState({ user: e.target.value, pwd: loginState.pwd })}
            />
            <TextField id="outlined-login" autoFocus size="small" variant="outlined"
                label="Password"
                onChange={e => setLoginState({ user: loginState.user, pwd: e.target.value })}
            />
            <Button color="secondary" onClick={() => connectClick()}>Connexion</Button> */}
        </div>
    );
}
