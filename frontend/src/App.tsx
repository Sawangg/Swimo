import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import House from "./views/House";
import Offer from "./views/Offer";
import Profile from "./views/Profile";
import Visit from "./views/Visit";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/House" element={<House />} />
                <Route path="/Offer" element={<Offer />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Visit" element={<Visit />} />
            </Routes>
        </BrowserRouter>
    );
}
