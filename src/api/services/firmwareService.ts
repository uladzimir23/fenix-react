import { apiClient } from '../apiClient';
import { FirmwareFile, UploadFirmwareData } from '../types/firmware';

export const firmwareService = {
  // GET /firmware
  getAll: () => apiClient.get<FirmwareFile[]>('/firmware').then(res => res.data),

  // GET /firmware/{id}
  getById: (id: number) => apiClient.get<FirmwareFile>(`/firmware/${id}`).then(res => res.data),

  // POST /firmware
  upload: (data: UploadFirmwareData) => {
    const formData = new FormData();
    
    // Основная информация
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('version', data.version);
    formData.append('brand', data.brand);
    formData.append('model', data.model);
    formData.append('engine', data.engine);
    formData.append('category', data.category);
    formData.append('file', data.file);
    
    // Технические характеристики
    formData.append('fuelType', data.fuelType);
    if (data.originalHorsepower) formData.append('originalHorsepower', data.originalHorsepower.toString());
    if (data.tunedHorsepower) formData.append('tunedHorsepower', data.tunedHorsepower.toString());
    if (data.originalTorque) formData.append('originalTorque', data.originalTorque.toString());
    if (data.tunedTorque) formData.append('tunedTorque', data.tunedTorque.toString());
    if (data.horsepowerGain) formData.append('horsepowerGain', data.horsepowerGain.toString());
    if (data.torqueGain) formData.append('torqueGain', data.torqueGain.toString());
    if (data.fuelConsumptionChange) formData.append('fuelConsumptionChange', data.fuelConsumptionChange);
    
    // Совместимость
    formData.append('supportedECUs', JSON.stringify(data.supportedECUs));
    if (data.supportedYears) formData.append('supportedYears', data.supportedYears);
    if (data.transmissionType) formData.append('transmissionType', data.transmissionType);
    if (data.compatibilityNotes) formData.append('compatibilityNotes', data.compatibilityNotes);
    if (data.testedVehicles) formData.append('testedVehicles', JSON.stringify(data.testedVehicles));
    
    // Оборудование и требования
    if (data.requiredHardware) formData.append('requiredHardware', JSON.stringify(data.requiredHardware));
    if (data.recommendedTuningTools) formData.append('recommendedTuningTools', JSON.stringify(data.recommendedTuningTools));
    
    // Информация о прошивке
    if (data.changelog) formData.append('changelog', data.changelog);
    if (data.author) formData.append('author', data.author);
    if (data.knownIssues) formData.append('knownIssues', data.knownIssues);
    if (data.installationInstructions) formData.append('installationInstructions', data.installationInstructions);
    
    // Настройки безопасности
    formData.append('isEncrypted', data.isEncrypted.toString());
    formData.append('requiresUnlockCode', data.requiresUnlockCode.toString());

    return apiClient.post<FirmwareFile>('/firmware', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => res.data);
  },

  // PUT /firmware/{id}
  update: (id: number, data: Partial<UploadFirmwareData>) => {
    const formData = new FormData();
    
    // Основная информация
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.version) formData.append('version', data.version);
    if (data.brand) formData.append('brand', data.brand);
    if (data.model) formData.append('model', data.model);
    if (data.engine) formData.append('engine', data.engine);
    if (data.category) formData.append('category', data.category);
    if (data.file) formData.append('file', data.file);
    
    // Технические характеристики
    if (data.fuelType) formData.append('fuelType', data.fuelType);
    if (data.originalHorsepower) formData.append('originalHorsepower', data.originalHorsepower.toString());
    if (data.tunedHorsepower) formData.append('tunedHorsepower', data.tunedHorsepower.toString());
    if (data.originalTorque) formData.append('originalTorque', data.originalTorque.toString());
    if (data.tunedTorque) formData.append('tunedTorque', data.tunedTorque.toString());
    if (data.horsepowerGain) formData.append('horsepowerGain', data.horsepowerGain.toString());
    if (data.torqueGain) formData.append('torqueGain', data.torqueGain.toString());
    if (data.fuelConsumptionChange) formData.append('fuelConsumptionChange', data.fuelConsumptionChange);
    
    // Совместимость
    if (data.supportedECUs) formData.append('supportedECUs', JSON.stringify(data.supportedECUs));
    if (data.supportedYears) formData.append('supportedYears', data.supportedYears);
    if (data.transmissionType) formData.append('transmissionType', data.transmissionType);
    if (data.compatibilityNotes) formData.append('compatibilityNotes', data.compatibilityNotes);
    if (data.testedVehicles) formData.append('testedVehicles', JSON.stringify(data.testedVehicles));
    
    // Оборудование и требования
    if (data.requiredHardware) formData.append('requiredHardware', JSON.stringify(data.requiredHardware));
    if (data.recommendedTuningTools) formData.append('recommendedTuningTools', JSON.stringify(data.recommendedTuningTools));
    
    // Информация о прошивке
    if (data.changelog) formData.append('changelog', data.changelog);
    if (data.author) formData.append('author', data.author);
    if (data.knownIssues) formData.append('knownIssues', data.knownIssues);
    if (data.installationInstructions) formData.append('installationInstructions', data.installationInstructions);
    
    // Настройки безопасности
    if (data.isEncrypted !== undefined) formData.append('isEncrypted', data.isEncrypted.toString());
    if (data.requiresUnlockCode !== undefined) formData.append('requiresUnlockCode', data.requiresUnlockCode.toString());

    return apiClient.put<FirmwareFile>(`/firmware/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => res.data);
  },

  // DELETE /firmware/{id}
  delete: (id: number) => apiClient.delete(`/firmware/${id}`).then(res => res.data),

  // GET /firmware/search?q={query}
  search: (query: string) => 
    apiClient.get<FirmwareFile[]>(`/firmware/search?q=${query}`).then(res => res.data),
    
  // GET /firmware/category/{category}
  getByCategory: (category: string) => 
    apiClient.get<FirmwareFile[]>(`/firmware/category/${category}`).then(res => res.data),
    
  // GET /firmware/brand/{brand}
  getByBrand: (brand: string) => 
    apiClient.get<FirmwareFile[]>(`/firmware/brand/${brand}`).then(res => res.data),
    
  // PATCH /firmware/{id}/download
  incrementDownloadCount: (id: number) => 
    apiClient.patch(`/firmware/${id}/download`).then(res => res.data),
    
  // PATCH /firmware/{id}/rating
  updateRating: (id: number, rating: number) => 
    apiClient.patch(`/firmware/${id}/rating`, { rating }).then(res => res.data),
    
  // PATCH /firmware/{id}/visibility
  toggleVisibility: (id: number, isPublic: boolean) => 
    apiClient.patch(`/firmware/${id}/visibility`, { isPublic }).then(res => res.data),
};