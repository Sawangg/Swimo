import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
    isLogged: boolean;
    redirectPath?: string;
}

export default function ProtectedRoute({ isLogged, redirectPath = "/" }: ProtectedRouteProps) {
    return isLogged ? (
        <Outlet />
    ) : (
        <Navigate to={redirectPath} replace />
    );
}
