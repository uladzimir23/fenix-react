// src/api/services/sessions.ts
import {apiClient, tokenStorage} from '../apiClient';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export const sessionsService = {
    // POST /sessions/auth
    login: (credentials: LoginCredentials) =>
        apiClient
            .post<LoginResponse>('/sessions/auth', credentials)
            .then(res => res.data),

    // DELETE /sessions
    logout: () => {
        const refreshToken = tokenStorage.getRefreshToken();
        return apiClient.delete('/sessions', {
            headers: refreshToken ? {
                'Authorization': `Bearer ${refreshToken}`
            } : {}
        }).then(res => res.data);
    },

    // POST /sessions/tokens
    refreshTokens: () => {
        const refreshToken = tokenStorage.getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        return apiClient.post<LoginResponse>('/sessions/tokens', {}, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        }).then(res => res.data);
    },
};
