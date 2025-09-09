import React from 'react';
import {useAuth} from '../../context/AuthContext';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
    const {user, isAuthenticated, loading} = useAuth();

    if (loading) {
        return (
            <div className={styles.page}>
                <h1>Профиль</h1>
                <div className={styles.loading}>Загрузка...</div>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <div className={styles.page}>
                <h1>Профиль</h1>
                <div className={styles.errorMessage}>
                    <p>Вы не авторизованы</p>
                    <p>Пожалуйста, войдите в систему чтобы увидеть свой профиль</p>
                </div>
            </div>
        );
    }

    // Безопасное получение роли
    const userRole = user.role || 'USER';
    const roleDisplay = userRole === 'ADMIN' ? 'Администратор' : 'Пользователь';
    const roleClass = userRole.toLowerCase() === 'admin' ? styles.admin : styles.user;

    return (
        <div className={styles.page}>
            <h1>Профиль пользователя</h1>

            <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                    <h2>Личная информация</h2>
                </div>

                <div className={styles.profileContent}>
                    <div className={styles.profileField}>
                        <label>Email:</label>
                        <span>{user.email || 'Не указан'}</span>
                    </div>

                    <div className={styles.profileField}>
                        <label>Имя:</label>
                        <span>{user.firstName || 'Не указано'}</span>
                    </div>

                    <div className={styles.profileField}>
                        <label>Фамилия:</label>
                        <span>{user.lastName || 'Не указано'}</span>
                    </div>

                    <div className={styles.profileField}>
                        <label>Роль:</label>
                        <span className={`${styles.roleBadge} ${roleClass}`}>
              {roleDisplay}
            </span>
                    </div>

                    <div className={styles.profileField}>
                        <label>Дата регистрации:</label>
                        <span>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU') : 'Не указана'}</span>
                    </div>

                    <div className={styles.profileField}>
                        <label>ID пользователя:</label>
                        <span className={styles.userId}>#{user.id || 'Не указан'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
