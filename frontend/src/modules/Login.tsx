import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Button } from "ui/Button";
import { TextInput } from "ui/TextInput";
import { useNavigate } from "react-router-dom";
import unlock from "../assets/unlock.svg";

export default function Login() {
    const navigate = useNavigate();
    const { setLoggedUser } = useLogin();
    const [loginState, setLoginState] = useState({ user: "", pwd: "" });

    const connectClick = async () => {
        const loggedSuccessfully = await setLoggedUser(loginState.user, loginState.pwd);
        if (loggedSuccessfully) {
            setLoginState({ user: "", pwd: "" });
            navigate("/home");
        } else {
            setLoginState({ user: loginState.user, pwd: "" });
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", e => { if (e.key === "Enter") connectClick(); });
        return () => {
            window.removeEventListener("keydown", e => { if (e.key === "Enter") connectClick(); });
        };
    });

    return (
        <div className="container px-6 py-12 h-full w-4/6 bg-white rounded-lg shadow">
            <div className="flex justify-center items-center flex-wrap h-full gap-6">
                <div className="md:w-8/12 lg:w-5/12 mb-12 md:mb-0">
                    <img className="w-full" src={unlock} alt="Login image" />
                </div>
                <div className="md:w-7/12 lg:w-5/12 lg:ml-10">
                    <h1 className="font-bold text-4xl text-primary-800 mb-6">Welcome Back</h1>
                    <div className="mb-6">
                        <TextInput onChange={e => setLoginState({ ...loginState, user: e.target.value })} placeholder="Email" />
                    </div>

                    <div className="mb-6">
                        <TextInput password={true} onChange={e => setLoginState({ ...loginState, pwd: e.target.value })} placeholder="Password" />
                    </div>
                    <Button onClick={connectClick}>Sign in</Button>
                </div>
            </div>
        </div>
    );
}
