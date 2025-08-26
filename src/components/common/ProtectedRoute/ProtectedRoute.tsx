// src/components/ProtectedRoute/ProtectedRoute.tsx
import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {isAuthenticated, loading} = useAuth();

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
