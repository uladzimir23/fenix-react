// src/api/services/index.ts

// Экспорт сервисов
export {carsService} from './cars';
export {requestsService} from './request';
export {requestAdminService} from './requestAdmin';
export {sessionsService} from './sessions';
export {tuningOptionsService} from './tunnigOptions';
export {userService} from './user';

// Экспорт типов
export type {Car} from './cars';
export type {Request, CreateRequestData} from './request';
export type {LoginCredentials, LoginResponse} from './sessions';
export type {TuningOption} from './tunnigOptions';
export type {UserProfile} from './user';

// Экспорт всего сразу (удобно для импорта *)
export * from './cars';
export * from './request';
export * from './requestAdmin';
export * from './sessions';
export * from './tunnigOptions';
export * from './user';
