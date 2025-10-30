import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
    const { user, isAuthenticated, loading, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editMode, setEditMode] = useState<'name' | 'email' | 'password' | null>(null);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        console.log('Saving changes:', formData);
        setIsEditing(false);
        setEditMode(null);
        setFormData(prev => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }));
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditMode(null);
        setFormData({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    const handleLogout = () => {
        logout();
    };

    if (loading) {
        return (
            <div className={styles.page}>
                <div className={styles.profileHeader}>
                    <h1>Профиль</h1>
                </div>
                <div className={styles.loading}>Загрузка...</div>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <div className={styles.page}>
                <div className={styles.profileHeader}>
                    <h1>Профиль</h1>
                </div>
                <div className={styles.errorMessage}>
                    <p>Вы не авторизованы</p>
                    <p>Пожалуйста, войдите в систему чтобы увидеть свой профиль</p>
                </div>
            </div>
        );
    }

    const userRole = user.role || 'USER';
    const roleDisplay = userRole === 'ADMIN' ? 'Администратор' : 'Пользователь';
    const roleClass = userRole.toLowerCase() === 'admin' ? styles.admin : styles.user;

    return (
        <div className={styles.page}>
            <div className={styles.profileHeader}>
                <h1>Профиль пользователя</h1>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    ⎋ Выйти
                </button>
            </div>

            <div className={styles.profileContainer}>
                <div className={styles.profileCard}>
                    <div className={styles.cardHeader}>
                        <h2>Личная информация</h2>
                        {!isEditing && (
                            <button 
                                className={styles.editButton}
                                onClick={() => setIsEditing(true)}
                            >
                                ✎ Редактировать
                            </button>
                        )}
                    </div>

                    <div className={styles.profileContent}>
                        <div className={styles.profileField}>
                            <div className={styles.fieldLabel}>
                                <span className={styles.fieldIcon}>✉</span>
                                <label>Email:</label>
                            </div>
                            {isEditing && editMode === 'email' ? (
                                <div className={styles.editField}>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={styles.inputField}
                                    />
                                    <div className={styles.editActions}>
                                        <button className={styles.saveButton} onClick={handleSave}>
                                            Сохранить
                                        </button>
                                        <button className={styles.cancelButton} onClick={handleCancel}>
                                            Отмена
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.fieldValue}>
                                    <span>{user.email || 'Не указан'}</span>
                                    {isEditing && (
                                        <button 
                                            className={styles.editFieldButton}
                                            onClick={() => setEditMode('email')}
                                        >
                                            ✎
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className={styles.profileField}>
                            <div className={styles.fieldLabel}>
                                <span className={styles.fieldIcon}>👤</span>
                                <label>Имя и фамилия:</label>
                            </div>
                            {isEditing && editMode === 'name' ? (
                                <div className={styles.editField}>
                                    <div className={styles.nameFields}>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="Имя"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={styles.inputField}
                                        />
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Фамилия"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={styles.inputField}
                                        />
                                    </div>
                                    <div className={styles.editActions}>
                                        <button className={styles.saveButton} onClick={handleSave}>
                                            Сохранить
                                        </button>
                                        <button className={styles.cancelButton} onClick={handleCancel}>
                                            Отмена
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.fieldValue}>
                                    <span>{user.firstName || 'Не указано'} {user.lastName || ''}</span>
                                    {isEditing && (
                                        <button 
                                            className={styles.editFieldButton}
                                            onClick={() => setEditMode('name')}
                                        >
                                            ✎
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className={styles.profileField}>
                            <div className={styles.fieldLabel}>
                                <span className={styles.fieldIcon}>🔒</span>
                                <label>Пароль:</label>
                            </div>
                            {isEditing && editMode === 'password' ? (
                                <div className={styles.editField}>
                                    <div className={styles.passwordFields}>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            placeholder="Текущий пароль"
                                            value={formData.currentPassword}
                                            onChange={handleInputChange}
                                            className={styles.inputField}
                                        />
                                        <input
                                            type="password"
                                            name="newPassword"
                                            placeholder="Новый пароль"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            className={styles.inputField}
                                        />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Подтвердите пароль"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className={styles.inputField}
                                        />
                                    </div>
                                    <div className={styles.editActions}>
                                        <button className={styles.saveButton} onClick={handleSave}>
                                            Сохранить
                                        </button>
                                        <button className={styles.cancelButton} onClick={handleCancel}>
                                            Отмена
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.fieldValue}>
                                    <span>••••••••</span>
                                    {isEditing && (
                                        <button 
                                            className={styles.editFieldButton}
                                            onClick={() => setEditMode('password')}
                                        >
                                            ✎
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className={styles.profileField}>
                            <div className={styles.fieldLabel}>
                                <span className={styles.fieldIcon}>🎯</span>
                                <label>Роль:</label>
                            </div>
                            <div className={styles.fieldValue}>
                                <span className={`${styles.roleBadge} ${roleClass}`}>
                                    {roleDisplay}
                                </span>
                            </div>
                        </div>

                        <div className={styles.profileField}>
                            <div className={styles.fieldLabel}>
                                <span className={styles.fieldIcon}>📅</span>
                                <label>Дата регистрации:</label>
                            </div>
                            <div className={styles.fieldValue}>
                                <span>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU') : 'Не указана'}</span>
                            </div>
                        </div>

                        <div className={styles.profileField}>
                            <div className={styles.fieldLabel}>
                                <span className={styles.fieldIcon}>🆔</span>
                                <label>ID пользователя:</label>
                            </div>
                            <div className={styles.fieldValue}>
                                <span className={styles.userId}>#{user.id || 'Не указан'}</span>
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className={styles.editActions}>
                            <button className={styles.saveButton} onClick={handleSave}>
                                Сохранить все изменения
                            </button>
                            <button className={styles.cancelButton} onClick={handleCancel}>
                                Отмена
                            </button>
                        </div>
                    )}
                </div>

                <div className={styles.additionalFeatures}>
                    <h3>Дополнительные возможности</h3>
                    <div className={styles.featureList}>
                        <button className={styles.featureButton}>
                            Настройки уведомлений
                        </button>
                        <button className={styles.featureButton}>
                            История активностей
                        </button>
                        <button className={styles.featureButton}>
                            Привязанные устройства
                        </button>
                        <button className={styles.featureButton}>
                            Экспорт данных
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;