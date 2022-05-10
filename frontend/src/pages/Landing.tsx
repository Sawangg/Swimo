import { Popup } from "modules/Popup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import Login from "../modules/Login";

export default function Landing() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex flex-row w-screen h-screen">
            <div className="bg-gradient-to-r from-primary-600 to-primary-400 w-96 h-screen">

            </div>

            <div className="fixed flex flex-col justify-center items-center w-screen h-screen gap-3">
                <h1 className="text-primary-200">Get Started</h1>
                <Button color="secondary" onClick={() => navigate("/register")}>Register</Button>
                <Button color="transparent" onClick={() => setOpen(!open)}>Login</Button>
            </div>

            {open &&
                <Popup onClose={() => setOpen(!open)}>
                    <Login />
                </Popup>
            }
        </div>
    );
}
