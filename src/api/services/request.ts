// src/api/services/requests.ts
import { apiClient } from '../apiClient';
import {Car} from "./cars";
import {TuningOption} from "./tunnigOptions";
export interface Request {
    id: number;
    status: 'PENDING' | 'PROCESSING' | 'DONE' | 'REJECTED';
    createdAt: string;
    fileUrl: string;
    solutionFileUrl?: string;
    cars: Car[];
    tuningOptions: TuningOption[];
}

export interface CreateRequestData {
    file: File;
}

export const requestsService = {
    create: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await apiClient
            .post<Request>('/requests', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
        return res.data;
    },

    getMy: () => apiClient.get<Request[]>('/requests/my').then(res => res.data),

    downloadSolution: (requestId: number) =>
        apiClient
            .get<Blob>(`/requests/${requestId}/solution`, {
                responseType: 'blob', // для скачивания файла
            })
            .then(res => res.data),
};
