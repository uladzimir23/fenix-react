import { apiClient } from '../apiClient';

export interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    engine: string;
}


export const carsService = {
    // GET /cars
    getAll: () => apiClient.get<Car[]>('/cars').then(res => res.data),

    // POST /cars
    create: (carData: Omit<Car, 'id'>) =>
        apiClient.post<Car>('/cars', carData).then(res => res.data),

    // POST /cars/list
    getList: (ids: number[]) =>
        apiClient.post<Car[]>('/cars/list', { ids }).then(res => res.data),
};
