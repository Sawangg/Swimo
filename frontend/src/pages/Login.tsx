
export default function Login() {
    const [loginState, setLoginState] = useState({ user: "", pwd: "" });

    const connectClick = async () => {
        const loggedSuccessfully = await setLoggedUser(loginState.user, loginState.pwd);
        if (loggedSuccessfully) {
            navigate("/house");
            setLoginState({ user: "", pwd: "" });
        }
    };

}