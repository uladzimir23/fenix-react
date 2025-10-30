// src/api/services/tuningOptions.ts
import { apiClient } from '../apiClient';

// src/api/services/tunnigOptions.ts
export interface TuningOption {
    id: number;
    name: string;
    description?: string;
    category: string;
    price?: number;
    engineCode?: string;
    count?: number; // Добавляем необязательное поле

  }

  
export const tuningOptionsService = {
    // GET /tuning-options
    getAll: () =>
        apiClient.get<TuningOption[]>('/tuning-options').then(res => res.data),

    // POST /tuning-options
    create: (data: Omit<TuningOption, 'id'>) =>
        apiClient.post<TuningOption>('/tuning-options', data).then(res => res.data),

    // PUT /tuning-options/{id}
    update: (id: number, data: Partial<TuningOption>) =>
        apiClient.put<TuningOption>(`/tuning-options/${id}`, data).then(res => res.data),

    // DELETE /tuning-options/{id}
    delete: (id: number) =>
        apiClient.delete(`/tuning-options/${id}`).then(res => res.data),
};
