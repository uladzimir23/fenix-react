import React, {useState} from 'react';
import {
    carsService,
    requestAdminService,
    requestsService,
    tuningOptionsService,
    userService
} from '../../../api/services';
import {useAuth} from '../../../context/AuthContext';

const ApiTester: React.FC = () => {
    const [activeTab, setActiveTab] = useState('cars');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [data, setData] = useState<any>(null);

    const {user, isAuthenticated, login, logout} = useAuth();

    // Cars state
    const [newCar, setNewCar] = useState({brand: '', model: '', year: 2024, engine: ''});
    const [carIds, setCarIds] = useState('');

    // Requests state
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Tuning options state
    const [newTuningOption, setNewTuningOption] = useState({
        name: '',
        description: '',
        category: '',
        price: 0
    });

    // Auth state
    const [loginData, setLoginData] = useState({email: '', password: ''});
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    // User state
    const [passwordResetEmail, setPasswordResetEmail] = useState('');
    const [resetPasswordData, setResetPasswordData] = useState({
        token: '',
        newPassword: ''
    });

    const executeWithLoading = async (fn: () => Promise<any>) => {
        if (!isAuthenticated && !['auth', 'user'].includes(activeTab)) {
            setMessage('Требуется авторизация! Перейдите во вкладку Auth');
            return;
        }

        setLoading(true);
        setMessage('');
        setData(null);
        try {
            const result = await fn();
            setData(result);
            setMessage('Успешно!');
        } catch (error: any) {
            setMessage(`Ошибка: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        setMessage('');
        try {
            await login(loginData.email, loginData.password);
            setMessage('Успешный вход!');
        } catch (error: any) {
            setMessage(`Ошибка входа: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setMessage('Успешный выход!');
        } catch (error: any) {
            setMessage(`Ошибка выхода: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const renderAuthInfo = () => (
        <div style={{
            margin: '10px 0',
            padding: '10px',
            backgroundColor: isAuthenticated ? '#d4edda' : '#fff3cd',
            border: `1px solid ${isAuthenticated ? '#c3e6cb' : '#ffeeba'}`,
            borderRadius: '5px'
        }}>
            <strong>Статус: </strong>
            {isAuthenticated ? (
                <span style={{color: '#155724'}}>
          Авторизован как {user?.email} ({user?.role})
        </span>
            ) : (
                <span style={{color: '#856404'}}>Не авторизован</span>
            )}
        </div>
    );

    const renderCarsTab = () => (
        <div>
            <h3>Cars Service</h3>
            {renderAuthInfo()}

            <button
                onClick={() => executeWithLoading(carsService.getAll)}
                disabled={loading || !isAuthenticated}
                style={{margin: '5px'}}
            >
                Получить все машины
            </button>

            <div style={{margin: '10px 0', padding: '10px', border: '1px solid #ccc'}}>
                <h4>Создать машину:</h4>
                <input
                    placeholder="Марка"
                    value={newCar.brand}
                    onChange={(e) => setNewCar({...newCar, brand: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <input
                    placeholder="Модель"
                    value={newCar.model}
                    onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <input
                    type="number"
                    placeholder="Год"
                    value={newCar.year}
                    onChange={(e) => setNewCar({...newCar, year: parseInt(e.target.value)})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <input
                    placeholder="Двигатель"
                    value={newCar.engine}
                    onChange={(e) => setNewCar({...newCar, engine: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <button
                    onClick={() => executeWithLoading(() => carsService.create(newCar))}
                    disabled={loading || !isAuthenticated}
                    style={{margin: '5px', padding: '5px 10px'}}
                >
                    Создать машину
                </button>
            </div>

            <div style={{margin: '10px 0', padding: '10px', border: '1px solid #ccc'}}>
                <h4>Получить машины по ID:</h4>
                <input
                    placeholder="ID машин (через запятую)"
                    value={carIds}
                    onChange={(e) => setCarIds(e.target.value)}
                    style={{margin: '5px', padding: '5px', width: '200px'}}
                />
                <button
                    onClick={() => {
                        const ids = carIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
                        executeWithLoading(() => carsService.getList(ids));
                    }}
                    disabled={loading || !isAuthenticated}
                    style={{margin: '5px', padding: '5px 10px'}}
                >
                    Получить список машин
                </button>
            </div>
        </div>
    );

    const renderRequestsTab = () => (
        <div>
            <h3>Requests Service</h3>
            {renderAuthInfo()}

            <div style={{margin: '10px 0', padding: '10px', border: '1px solid #ccc'}}>
                <h4>Создать запрос:</h4>
                <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    style={{margin: '5px'}}
                />
                <button
                    onClick={() => {
                        if (!selectedFile) {
                            setMessage('Выберите файл');
                            return;
                        }
                        executeWithLoading(() => requestsService.create(selectedFile));
                    }}
                    disabled={loading || !isAuthenticated || !selectedFile}
                    style={{margin: '5px', padding: '5px 10px'}}
                >
                    Создать запрос
                </button>
            </div>

            <button
                onClick={() => executeWithLoading(requestsService.getMy)}
                disabled={loading || !isAuthenticated}
                style={{margin: '5px', padding: '5px 10px'}}
            >
                Получить мои запросы
            </button>
        </div>
    );

    const renderRequestAdminTab = () => (
        <div>
            <h3>Request Admin Service</h3>
            {renderAuthInfo()}

            <button
                onClick={() => executeWithLoading(requestAdminService.getAll)}
                disabled={loading || !isAuthenticated}
                style={{margin: '5px', padding: '5px 10px'}}
            >
                Получить все запросы (админ)
            </button>

            {user?.role === 'ADMIN' && (
                <div style={{margin: '10px 0', padding: '10px', border: '1px solid #ccc'}}>
                    <h4>Админские функции доступны</h4>
                    <p>Только для пользователей с ролью ADMIN</p>
                </div>
            )}
        </div>
    );

    const renderTuningOptionsTab = () => (
        <div>
            <h3>Tuning Options Service</h3>
            {renderAuthInfo()}

            <button
                onClick={() => executeWithLoading(tuningOptionsService.getAll)}
                disabled={loading || !isAuthenticated}
                style={{margin: '5px', padding: '5px 10px'}}
            >
                Получить все опции тюнинга
            </button>

            <div style={{margin: '10px 0', padding: '10px', border: '1px solid #ccc'}}>
                <h4>Создать опцию тюнинга:</h4>
                <input
                    placeholder="Название"
                    value={newTuningOption.name}
                    onChange={(e) => setNewTuningOption({...newTuningOption, name: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <input
                    placeholder="Описание"
                    value={newTuningOption.description}
                    onChange={(e) => setNewTuningOption({...newTuningOption, description: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <input
                    placeholder="Категория"
                    value={newTuningOption.category}
                    onChange={(e) => setNewTuningOption({...newTuningOption, category: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <input
                    type="number"
                    placeholder="Цена"
                    value={newTuningOption.price}
                    onChange={(e) => setNewTuningOption({...newTuningOption, price: parseFloat(e.target.value)})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <button
                    onClick={() => executeWithLoading(() => tuningOptionsService.create(newTuningOption))}
                    disabled={loading || !isAuthenticated}
                    style={{margin: '5px', padding: '5px 10px'}}
                >
                    Создать опцию
                </button>
            </div>
        </div>
    );

    const renderAuthTab = () => (
        <div>
            <h3>Authentication Service</h3>
            {renderAuthInfo()}

            <div style={{margin: '10px 0', padding: '10px', border: '1px solid #ccc'}}>
                <h4>Вход:</h4>
                <input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{margin: '5px', padding: '5px 10px'}}
                >
                    Войти
                </button>
            </div>

            {isAuthenticated && (
                <button
                    onClick={handleLogout}
                    disabled={loading}
                    style={{margin: '5px', padding: '5px 10px', backgroundColor: '#dc3545', color: 'white'}}
                >
                    Выйти
                </button>
            )}
        </div>
    );

    const renderUserTab = () => (
        <div>
            <h3>User Service</h3>
            {renderAuthInfo()}

            {isAuthenticated && (
                <button
                    onClick={() => executeWithLoading(userService.getProfile)}
                    disabled={loading}
                    style={{margin: '5px', padding: '5px 10px'}}
                >
                    Получить профиль
                </button>
            )}

            <div style={{margin: '10px 0', padding: '10px', border: '1px solid #ccc'}}>
                <h4>Регистрация:</h4>
                <input
                    type="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <input
                    placeholder="Имя"
                    value={registerData.firstName}
                    onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <input
                    placeholder="Фамилия"
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <button
                    onClick={() => executeWithLoading(() => userService.register(registerData))}
                    disabled={loading}
                    style={{margin: '5px', padding: '5px 10px'}}
                >
                    Зарегистрироваться
                </button>
            </div>

            <div style={{margin: '10px 0', padding: '10px', border: '1px solid #ccc'}}>
                <h4>Сброс пароля:</h4>
                <input
                    type="email"
                    placeholder="Email"
                    value={passwordResetEmail}
                    onChange={(e) => setPasswordResetEmail(e.target.value)}
                    style={{margin: '5px', padding: '5px'}}
                />
                <button
                    onClick={() => executeWithLoading(() => userService.requestPasswordReset(passwordResetEmail))}
                    disabled={loading}
                    style={{margin: '5px', padding: '5px 10px'}}
                >
                    Запросить сброс пароля
                </button>
            </div>

            <div style={{margin: '10px 0', padding: '10px', border: '1px solid #ccc'}}>
                <h4>Сменить пароль:</h4>
                <input
                    placeholder="Токен"
                    value={resetPasswordData.token}
                    onChange={(e) => setResetPasswordData({...resetPasswordData, token: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <input
                    type="password"
                    placeholder="Новый пароль"
                    value={resetPasswordData.newPassword}
                    onChange={(e) => setResetPasswordData({...resetPasswordData, newPassword: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                />
                <button
                    onClick={() => executeWithLoading(() =>
                        userService.resetPassword(resetPasswordData.token, resetPasswordData.newPassword)
                    )}
                    disabled={loading}
                    style={{margin: '5px', padding: '5px 10px'}}
                >
                    Сменить пароль
                </button>
            </div>
        </div>
    );

    return (
        <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
            <h1>API Tester</h1>

            <div style={{marginBottom: '20px'}}>
                {['cars', 'requests', 'requestAdmin', 'tuningOptions', 'auth', 'user'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            margin: '0 10px 10px 0',
                            padding: '10px 20px',
                            backgroundColor: activeTab === tab ? '#007bff' : '#f8f9fa',
                            color: activeTab === tab ? 'white' : 'black',
                            border: '1px solid #dee2e6',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {loading && <div style={{color: 'blue', margin: '10px 0'}}>Загрузка...</div>}
            {message && (
                <div style={{
                    margin: '10px 0',
                    padding: '10px',
                    backgroundColor: message.includes('Ошибка') ? '#f8d7da' : '#d4edda',
                    color: message.includes('Ошибка') ? '#721c24' : '#155724',
                    border: '1px solid',
                    borderRadius: '5px'
                }}>
                    {message}
                </div>
            )}

            {activeTab === 'cars' && renderCarsTab()}
            {activeTab === 'requests' && renderRequestsTab()}
            {activeTab === 'requestAdmin' && renderRequestAdminTab()}
            {activeTab === 'tuningOptions' && renderTuningOptionsTab()}
            {activeTab === 'auth' && renderAuthTab()}
            {activeTab === 'user' && renderUserTab()}

            {data && (
                <div style={{marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}>
                    <h3>Данные ответа:</h3>
                    <pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-all'}}>
            {JSON.stringify(data, null, 2)}
          </pre>
                </div>
            )}
        </div>
    );
};

export default ApiTester;
