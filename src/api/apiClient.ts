// src/api/apiClient.ts
import axios from 'axios';

const isDevelopment = true;

export const apiClient = axios.create({
    baseURL: isDevelopment
        ? '' // для прокси используем относительный путь
        : 'http://45.144.220.121/',
    withCredentials: !isDevelopment,
    timeout: 30_000,
});

// Функции для работы с токенами
export const tokenStorage = {
    getAccessToken: () => localStorage.getItem('accessToken'),
    setAccessToken: (token: string) => localStorage.setItem('accessToken', token),
    removeAccessToken: () => localStorage.removeItem('accessToken'),

    getRefreshToken: () => localStorage.getItem('refreshToken'),
    setRefreshToken: (token: string) => localStorage.setItem('refreshToken', token),
    removeRefreshToken: () => localStorage.removeItem('refreshToken'),

    clear: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
};

// Добавляем токен в заголовки всех запросов
apiClient.interceptors.request.use(
    (config) => {
        const token = tokenStorage.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Добавляем флаг для избежания бесконечного цикла
let isRefreshing = false;

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Проверяем, что это не запрос на обновление токена
        const isTokenRefreshRequest = originalRequest.url === '/sessions/tokens';

        if (error.response?.status === 401 &&
            !originalRequest._retry &&
            !isTokenRefreshRequest) {

            originalRequest._retry = true;

            // Защита от множественных одновременных запросов обновления
            if (isRefreshing) {
                // Ждем завершения текущего обновления
                return new Promise((resolve) => {
                    const interval = setInterval(() => {
                        if (!isRefreshing) {
                            clearInterval(interval);
                            resolve(apiClient(originalRequest));
                        }
                    }, 100);
                });
            }

            isRefreshing = true;

            try {
                // Пытаемся обновить токен
                const refreshToken = tokenStorage.getRefreshToken();
                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                const response = await apiClient.post('/sessions/tokens', {}, {
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`
                    }
                });

                const {accessToken, refreshToken: newRefreshToken} = response.data;
                tokenStorage.setAccessToken(accessToken);
                tokenStorage.setRefreshToken(newRefreshToken);

                isRefreshing = false;
                return apiClient(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                tokenStorage.clear();
                console.error('Не удалось обновить сессию:', refreshError);
                window.dispatchEvent(new Event('unauthorized'));
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
