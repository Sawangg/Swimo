import { CssBaseline } from "@mui/material";
import Landing from "@pages/Landing";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLoginStore } from "stores/useLogin";
import Spinner from "./components/Spinner";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Profile from "./pages/Profile";
import Visit from "./pages/Visit";

export default function App() {
    const { getUserStatus } = useLoginStore();

    useEffect(() => {
        getUserStatus();
    }, [getUserStatus]);

    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Landing />} />
                    <Route path="/register" element={<Landing />} />

                    {/* <Route element={<ProtectedRoute isLogged={isLogged} />}> */}
                    <Route path="/house" element={
                        <ErrorBoundary fallback={<h1>error</h1>}>
                            <Suspense fallback={<Spinner />}>
                                <Home />
                            </Suspense>
                        </ErrorBoundary>
                    } />
                    {/* </Route> */}

                    <Route path="/offer" element={<Offer />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/visit" element={<Visit />} />

                    <Route path="*" element={<p>There s nothing here 404!</p>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
