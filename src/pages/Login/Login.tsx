// src/pages/Login/Login.tsx
import React, {useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {userService} from '../../api/services';
import styles from './Login.module.css';

const Login: React.FC = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const {login} = useAuth();

    // Данные для входа
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Данные для регистрации
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await login(loginData.email, loginData.password);
            setMessage('Успешный вход!');
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Ошибка входа');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (registerData.password !== registerData.confirmPassword) {
            setMessage('Пароли не совпадают');
            setLoading(false);
            return;
        }

        try {
            await userService.register({
                email: registerData.email,
                password: registerData.password,
                firstName: registerData.firstName,
                lastName: registerData.lastName
            });
            setMessage('Регистрация успешна! Теперь вы можете войти');
            setIsLoginMode(true);
            // Очищаем форму регистрации
            setRegisterData({
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: ''
            });
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Ошибка регистрации');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <h1>{isLoginMode ? 'Вход' : 'Регистрация'}</h1>

                {message && (
                    <div className={`${styles.message} ${message.includes('Ошибка') ? styles.error : styles.success}`}>
                        {message}
                    </div>
                )}

                {isLoginMode ? (
                    <form onSubmit={handleLogin} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={loginData.email}
                                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Пароль:</label>
                            <input
                                type="password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                required
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" disabled={loading} className={styles.submitButton}>
                            {loading ? 'Вход...' : 'Войти'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={registerData.email}
                                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Имя:</label>
                            <input
                                type="text"
                                value={registerData.firstName}
                                onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Фамилия:</label>
                            <input
                                type="text"
                                value={registerData.lastName}
                                onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Пароль:</label>
                            <input
                                type="password"
                                value={registerData.password}
                                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Подтвердите пароль:</label>
                            <input
                                type="password"
                                value={registerData.confirmPassword}
                                onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                                required
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" disabled={loading} className={styles.submitButton}>
                            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                        </button>
                    </form>
                )}

                <div className={styles.switchMode}>
                    <p>
                        {isLoginMode ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
                        <button
                            type="button"
                            onClick={() => {
                                setIsLoginMode(!isLoginMode);
                                setMessage('');
                            }}
                            className={styles.switchButton}
                        >
                            {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
