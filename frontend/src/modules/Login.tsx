import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { Button } from "ui/Button";
import { Input } from "ui/Input";

export default function Login() {
    const navigate = useNavigate();
    const { setLoggedUser } = useLogin();
    const [loginState, setLoginState] = useState({ user: "", pwd: "" });

    const connectClick = async () => {
        const loggedSuccessfully = await setLoggedUser(loginState.user, loginState.pwd);
        if (loggedSuccessfully) {
            navigate("/house");
            setLoginState({ user: "", pwd: "" });
        }
    };

    return (
        <div className="flex flex-col gap-6 items-center">
            <h2>Welcome back</h2>
            <Input label="Username" onChange={e => setLoginState({ user: e.target.value, pwd: loginState.pwd })} />
            <Input label="Password" onChange={e => setLoginState({ user: loginState.user, pwd: e.target.value })} />
            <Button color="primary" onClick={() => connectClick()}>Login</Button>
        </div>
    );
}
