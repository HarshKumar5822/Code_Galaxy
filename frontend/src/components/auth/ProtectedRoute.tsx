import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const userInfo = localStorage.getItem('userInfo');

    if (!userInfo) {
        return <Navigate to="/?login=true" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
