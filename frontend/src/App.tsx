// Import react
import { CssBaseline } from "@mui/material";
import Login from "pages/Login";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Profile from "./pages/Profile";
import Visit from "./pages/Visit";

export default function App() {
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/house" element={
                        <ErrorBoundary fallback={<h1>error</h1>}>
                            <Suspense fallback={<h1>loading</h1>}>
                                <Home />
                            </Suspense>
                        </ErrorBoundary>
                    } />
                    <Route path="/offer" element={<Offer />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/visit" element={<Visit />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
