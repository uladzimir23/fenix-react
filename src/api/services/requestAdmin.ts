// src/api/services/requestAdmin.ts
import { apiClient } from '../apiClient';

export const requestAdminService = {
    // GET /requests/admin
    getAll: () => apiClient.get<Request[]>('/requests/admin').then(res => res.data),

    // GET /requests/admin/{requestId}/file
    downloadRequestFile: (requestId: number) =>
        apiClient
            .get<Blob>(`/requests/admin/${requestId}/file`, {
                responseType: 'blob',
            })
            .then(res => res.data),

    // PUT /requests/admin/{id}/status
    updateStatus: (id: number, status: string) =>
        apiClient
            .put<Request>(`/requests/admin/${id}/status`, { status })
            .then(res => res.data),

    // POST /requests/admin/{id}/solution — загрузка файла-решения
    uploadSolution: (id: number, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return apiClient
            .post<Request>(`/requests/admin/${id}/solution`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 300_000, // 5 минут — файлы могут быть большими
            })
            .then(res => res.data);
    },
};
