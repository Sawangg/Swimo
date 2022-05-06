// Import react
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import views
import Home from "./views/Home";
import Offer from "./views/Offer";
import Profile from "./views/Profile";
import Visit from "./views/Visit";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Offer" element={<Offer />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Visit" element={<Visit />} />
            </Routes>
        </BrowserRouter>
    );
}
