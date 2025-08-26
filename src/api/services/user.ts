import { apiClient } from '../apiClient';

export interface UserProfile {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
}

export const userService = {
    // GET /users/me/profile
    getProfile: () =>
        apiClient.get<UserProfile>('/users/me/profile').then(res => res.data),

    // POST /users
    register: (userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }) => apiClient.post<UserProfile>('/users', userData).then(res => res.data),

    // POST /users/request-password-reset
    requestPasswordReset: (email: string) =>
        apiClient
            .post('/users/request-password-reset', { email })
            .then(res => res.data),

    // POST /users/reset-password
    resetPassword: (token: string, newPassword: string) =>
        apiClient
            .post('/users/reset-password', { token, newPassword })
            .then(res => res.data),
};
