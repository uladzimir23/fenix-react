import * as React from 'react';
import {useState} from 'react';
import {FaBell, FaBriefcase, FaComments, FaMoon, FaSun, FaThLarge,} from 'react-icons/fa';
import {useLocation, useNavigate} from 'react-router-dom';
import Icon from '../ui/Icon';
import './SideNav.css';
import {IconType} from "react-icons";

interface NavItem {
    id: number;
    icon: IconType;
    label: string;
    path: string;
    badge?: number;
}

const SideNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const getActivePage = (): number => {
        const path = location.pathname;
        if (path === '/profile') return 1;
        if (path === '/catalog') return 2;
        if (path === '/files') return 3;
        if (path === '/messages') return 4;
        if (path === '/register') return 5;
        return 1;
    };

    const selectedNav = getActivePage();

    const navItems: NavItem[] = [
        {id: 1, icon: FaThLarge, label: 'Профиль', path: '/profile'},
        {id: 2, icon: FaComments, label: 'Каталог', path: '/catalog'},
        {id: 3, icon: FaBriefcase, label: 'Ваши файлы', path: '/files'},
        {id: 4, icon: FaBell, label: 'Сообщения', path: '/messages', badge: 12},
        {
            id: 5,
            icon: FaComments,
            label: 'test-api',
            path: '/test-api'
        },
    ];

    const handleItemClick = (path: string) => {
        navigate(path);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-theme');
    };

    return (
        <div className="side-nav">
            <div className="nav-content">
                {/* Логотип */}
                <div className="logo-section" onClick={() => navigate('/')}>
                    <Icon icon={FaThLarge} className="logo-icon"/>
                    <span className="logo-text">Fenix</span>
                </div>

                <div className="divider"/>

                {/* Навигация */}
                <div className="nav-section">
                    <div className="section-label">Навигация</div>
                    {navItems.map((item) => (
                        <div
                            key={item.id}
                            className={`nav-item ${selectedNav === item.id ? 'active' : ''}`}
                            onClick={() => handleItemClick(item.path)}
                        >
                            <Icon icon={item.icon} className="nav-icon"/>
                            <span className="nav-label">{item.label}</span>
                            {item.badge && (
                                <span className="badge">{item.badge}</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Переключатель темы */}
                <div className="theme-switcher">
                    <div
                        className={`theme-option ${!isDarkMode ? 'active' : ''}`}
                        onClick={() => !isDarkMode && toggleTheme()}
                    >
                        <Icon icon={FaSun} className="theme-icon"/>
                        <span>Светлая тема</span>
                    </div>
                    <div
                        className={`theme-option ${isDarkMode ? 'active' : ''}`}
                        onClick={() => isDarkMode && toggleTheme()}
                    >
                        <Icon icon={FaMoon} className="theme-icon"/>
                        <span>Темная тема</span>
                    </div>
                </div>

                <div className="divider"/>

                {/* Профиль пользователя */}
                <div className="user-profile">
                    <div className="avatar">
                        <img
                            src="https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                            alt="User avatar"
                        />
                    </div>
                    <div className="user-info">
                        <div className="user-name">Andrew D.</div>
                        <div className="user-email">admin@gmail.com</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideNav;
