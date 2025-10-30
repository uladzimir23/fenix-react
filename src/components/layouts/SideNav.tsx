import * as React from 'react';
import {useState} from 'react';
import {
  FaUser,               // Профиль
  FaMagnifyingGlass,    // Каталог
  FaFolderOpen,         // Файлы
  FaMessage,            // Сообщения
  FaGear,               // Test API
  FaMoon, 
  FaSun,
} from 'react-icons/fa6';
import { FaThLarge as FaThLargeLegacy } from 'react-icons/fa'; // Для логотипа
import {useLocation, useNavigate} from 'react-router-dom';
import Icon from '../ui/Icon';
import './SideNav.css';
import {IconType} from "react-icons";
import { useEffect } from 'react';

interface NavItem {
    id: number;
    icon: IconType;
    label: string;
    path: string;
    badge?: number;
}

// Компонент для иконки стрелки
const ChevronIcon = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 320 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    className={isCollapsed ? "collapsed" : ""}
  >
    <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path>
  </svg>
);

const SideNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        document.body.classList.toggle('side-nav-collapsed');
    };

    const getActivePage = (): number => {
        const path = location.pathname;
        if (path === '/profile') return 1;
        if (path === '/catalog') return 2;
        if (path === '/files') return 3;
        if (path === '/messages') return 4;
        if (path === '/test-api') return 5;
        return 1;
    };

    const selectedNav = getActivePage();

    const navItems: NavItem[] = [
        {id: 1, icon: FaUser, label: 'Профиль', path: '/profile'},
        {id: 2, icon: FaMagnifyingGlass, label: 'Каталог', path: '/catalog'},
        {id: 3, icon: FaFolderOpen, label: 'Ваши файлы', path: '/files'},
        {id: 4, icon: FaMessage, label: 'Сообщения', path: '/messages', badge: 12},
        {id: 5, icon: FaGear, label: 'test-api', path: '/test-api'},
    ];

    const handleItemClick = (path: string) => {
        navigate(path);
    };

    useEffect(() => {
        // Проверяем, есть ли сохраненная тема в localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.classList.add('dark-theme');
            document.body.style.backgroundColor = '#1a1a1a';
        }
        
        // Или проверяем системные настройки
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark && !savedTheme) {
            setIsDarkMode(true);
            document.body.classList.add('dark-theme');
            document.body.style.backgroundColor = '#1a1a1a';
        }
    }, []);

    const toggleTheme = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        
        if (newDarkMode) {
            document.body.classList.add('dark-theme');
            document.body.style.backgroundColor = '#1a1a1a';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.style.backgroundColor = '#ffffff';
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div className={`side-nav ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="nav-content">
                <div className="logo-section" onClick={() => navigate('/')}>
                    <Icon icon={FaThLargeLegacy} className="logo-icon"/>
                    <span className="logo-text">Fenix</span>
                </div>

                <div className={`collapse-toggle ${isCollapsed ? 'collapsed' : ''}`} onClick={toggleCollapse}>
                    <ChevronIcon isCollapsed={isCollapsed} />
                </div>

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

                <div className="theme-switcher">
                    <div
                        className={`theme-option ${isDarkMode ? 'active' : ''}`}
                        onClick={() => isDarkMode && toggleTheme()}
                    >
                        <Icon icon={FaSun} className="theme-icon"/>
                        <span>Светлая тема</span>
                    </div>
                    <div
                        className={`theme-option ${!isDarkMode ? 'active' : ''}`}
                        onClick={() => !isDarkMode && toggleTheme()}
                    >
                        <Icon icon={FaMoon} className="theme-icon"/>
                        <span>Темная тема</span>
                    </div>
                </div>

                <div className="divider"/>

                <div className="user-profile">
                    <div className="avatar">
                        <img
                            src="https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                            alt="User avatar"
                        />
                    </div>
                    <div className="user-info">
                        <div className="user-name">User</div>
                        <div className="user-email">admin@gmail.com</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideNav;