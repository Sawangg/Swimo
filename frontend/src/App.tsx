import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLogin } from "hooks/useLogin";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Profile from "./pages/Profile";
import Visit from "./pages/Visit";
import { Spinner } from "ui/Spinner";

export default function App() {
    const { getUserStatus } = useLogin();

    useEffect(() => {
        getUserStatus();
    }, [getUserStatus]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
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
