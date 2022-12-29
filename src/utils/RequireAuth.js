import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const { user } = localStorage.getItem("webAccessToken");
    const location = useLocation();

    // 유저의 현재 페이지를 기억하고 로그인 페이지로 이동
    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
