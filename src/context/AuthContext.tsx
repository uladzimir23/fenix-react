// context/AuthContext.tsx
/**
 * Провайдер авторизации
 * Оборачивает приложение и предоставляет контекст аутентификации
 */
// context/AuthContext.tsx
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {sessionsService, userService} from '../api/services';
import {tokenStorage} from '../api/apiClient';

// Типы
export interface User {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

// Создаём контекст
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Хук для доступа к состоянию авторизации
 * Должен использоваться только внутри AuthProvider
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// ... остальной код без изменений ...

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Ловим событие "разлогинься"
    useEffect(() => {
        const handleUnauthorized = () => {
            setUser(null);
            tokenStorage.clear();
            navigate('/login', {replace: true});
        };

        window.addEventListener('unauthorized', handleUnauthorized);
        return () => window.removeEventListener('unauthorized', handleUnauthorized);
    }, [navigate]);

    // Восстановление сессии
    useEffect(() => {
        const restoreSession = async () => {
            const accessToken = tokenStorage.getAccessToken();
            if (!accessToken) {
                setLoading(false);
                return;
            }

            try {
                const profile = await userService.getProfile();
                setUser(profile);
            } catch {
                setUser(null);
                tokenStorage.clear();
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await sessionsService.login({email, password});

            // Сохраняем токены
            tokenStorage.setAccessToken(response.accessToken);
            tokenStorage.setRefreshToken(response.refreshToken);

            const profile = await userService.getProfile();
            setUser(profile);
            navigate('/profile');
        } catch (error) {
            console.error('Login failed', error);
            tokenStorage.clear();
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await sessionsService.logout();
        } catch (error) {
            console.error('Logout error', error);
        } finally {
            setUser(null);
            tokenStorage.clear();
            navigate('/login');
        }
    };

    const value = {user, loading, isAuthenticated: !!user, login, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
