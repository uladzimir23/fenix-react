import { apiClient } from '../apiClient';

export interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    engine: string;
    // Дополнительные поля для лучшего отображения
    generation?: string;
    horsepower?: number;
    torque?: number;
    fuelType?: string;
    transmission?: string;
    ecuModel?: string;
}

export interface CarCreationData {
    brand: string;
    model: string;
    year: number;
    engine: string;
    generation?: string;
    horsepower?: number;
    torque?: number;
    fuelType?: string;
    transmission?: string;
    ecuModel?: string;
}

export const carsService = {
    // GET /cars
    getAll: () => apiClient.get<Car[]>('/cars').then(res => res.data),

    // GET /cars/{id}
    getById: (id: number) => apiClient.get<Car>(`/cars/${id}`).then(res => res.data),

    // POST /cars
    create: (carData: CarCreationData) =>
        apiClient.post<Car>('/cars', carData).then(res => res.data),

    // POST /cars/list
    getList: (ids: number[]) =>
        apiClient.post<Car[]>('/cars/list', { ids }).then(res => res.data),
        
    // GET /cars/brands
    getBrands: () => 
        apiClient.get<string[]>('/cars/brands').then(res => res.data),
        
    // GET /cars/models?brand={brand}
    getModelsByBrand: (brand: string) => 
        apiClient.get<string[]>(`/cars/models?brand=${brand}`).then(res => res.data),
        
    // GET /cars/engines?brand={brand}&model={model}
    getEnginesByModel: (brand: string, model: string) => 
        apiClient.get<string[]>(`/cars/engines?brand=${brand}&model=${model}`).then(res => res.data),
};