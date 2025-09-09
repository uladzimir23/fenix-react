import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import SideNav from './components/layouts/SideNav';
import Home from './pages/Home';
import Profile from './pages/Profile/Profile';
import Catalog from './pages/Catalog';
import Files from './pages/Files';
import Messages from './pages/Messages';
import Login from './pages/Login/Login';
import './App.css';
import * as React from 'react';
import {AuthProvider} from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";
import ApiTester from "./components/common/ApiTester/ApiTester";

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <SideNav/>
                    <main className="main-content">
                        <Routes>
                            {/* Публичный маршрут */}
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/test-api" element={<ApiTester/>}/>

                            {/* Защищенные маршруты */}
                            <Route path="/" element={
                                <ProtectedRoute>
                                    <Home/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/catalog" element={
                                <ProtectedRoute>
                                    <Catalog/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/files" element={
                                <ProtectedRoute>
                                    <Files/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/messages" element={
                                <ProtectedRoute>
                                    <Messages/>
                                </ProtectedRoute>
                            }/>

                            {/* Перенаправление на главную для неизвестных маршрутов */}
                            <Route path="*" element={<Navigate to="/" replace/>}/>
                        </Routes>
                    </main>
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;
