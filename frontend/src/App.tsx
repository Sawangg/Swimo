import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLogin } from "hooks/useLogin";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function App() {
    const { user, getUserStatus } = useLogin();

    useEffect(() => {
        getUserStatus();
    }, [getUserStatus]);

    return (
        <div className="flex flex-col w-screen h-screen bg-white-100">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/register" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                    {user.id !== 0 && <Route path="/profile" element={<Profile />} />}
                    <Route path="*" element={<p>There s nothing here 404!</p>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
