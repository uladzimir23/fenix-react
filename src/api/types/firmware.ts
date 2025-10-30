export interface FirmwareFile {
    id: number;
    name: string;
    description: string;
    uploadDate: Date;
    version: string;
    brand: string;
    model: string;
    engine: string;
    category: string;
    fileSize: number;
    downloadCount: number;
    rating: number;
    isPublic: boolean;
    // Новые поля
    price?: number; // Добавьте это поле
    horsepowerGain?: number;
    torqueGain?: number;
    fuelType: string;
    requiredHardware?: string[];
    compatibilityNotes?: string;
    changelog?: string;
    author?: string;
    supportedECUs: string[];
    status: 'verified' | 'pending' | 'rejected';
    lastUpdated: Date;
    // Дополнительные технические параметры
    originalHorsepower?: number;
    tunedHorsepower?: number;
    originalTorque?: number;
    tunedTorque?: number;
    fuelConsumptionChange?: string;
    supportedYears?: string;
    transmissionType?: string;
    // Информация о файле
    fileName: string;
    checksum?: string;
    // Настройки безопасности
    isEncrypted: boolean;
    requiresUnlockCode: boolean;
    // Дополнительная информация
    recommendedTuningTools?: string[];
    knownIssues?: string;
    installationInstructions?: string;
    testedVehicles?: string[];
  }
  
  export interface UploadFirmwareData {
    // Основная информация
    name: string;
    description: string;
    version: string;
    brand: string;
    model: string;
    engine: string;
    category: string;
    file: File;
    // Технические характеристики
    fuelType: string;
    originalHorsepower?: number;
    tunedHorsepower?: number;
    originalTorque?: number;
    tunedTorque?: number;
    horsepowerGain?: number;
    torqueGain?: number;
    fuelConsumptionChange?: string;
    // Совместимость
    supportedECUs: string[];
    supportedYears?: string;
    transmissionType?: string;
    compatibilityNotes?: string;
    testedVehicles?: string[];
    // Оборудование и требования
    requiredHardware?: string[];
    recommendedTuningTools?: string[];
    // Информация о прошивке
    changelog?: string;
    author?: string;
    knownIssues?: string;
    installationInstructions?: string;
    // Настройки безопасности
    isEncrypted: boolean;
    requiresUnlockCode: boolean;
  }
  
  export const FirmwareStatus = {
    VERIFIED: 'verified',
    PENDING: 'pending',
    REJECTED: 'rejected'
  } as const;
  
  export type FirmwareStatusType = typeof FirmwareStatus[keyof typeof FirmwareStatus];