import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-row w-screen h-screen">
            <div className="bg-primary-500 w-96 h-screen">

            </div>

            <div className="flex flex-col justify-center items-center w-screen gap-3">
                <h2>Get Started</h2>
                <Button color="secondary" onClick={() => navigate("/register")}>Register</Button>
                <Button color="transparent" onClick={() => navigate("/login")}>Login</Button>
            </div>
        </div>
    );
}
