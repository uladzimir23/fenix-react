import React, { useState } from 'react';
import { UploadFirmwareData, FirmwareFile } from '../../api/types/firmware';
import { firmwareCategories, fuelTypes, transmissionTypes } from '../../data/firmwareData';
import './FirmwareUploadForm.css';

interface FirmwareUploadFormProps {
  onSuccess: (file: FirmwareFile) => void;
  onCancel: () => void;
}

const FirmwareUploadForm: React.FC<FirmwareUploadFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<UploadFirmwareData>({
    name: '',
    description: '',
    version: '',
    brand: '',
    model: '',
    engine: '',
    category: 'Stage1',
    file: null as unknown as File,
    fuelType: 'Бензин',
    supportedECUs: [],
    isEncrypted: false,
    requiresUnlockCode: false,
  });
  
  const [supportedECUInput, setSupportedECUInput] = useState('');
  const [requiredHardwareInput, setRequiredHardwareInput] = useState('');
  const [testedVehiclesInput, setTestedVehiclesInput] = useState('');
  const [recommendedToolsInput, setRecommendedToolsInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const addECU = () => {
    if (supportedECUInput.trim() && !formData.supportedECUs.includes(supportedECUInput.trim())) {
      setFormData(prev => ({
        ...prev,
        supportedECUs: [...prev.supportedECUs, supportedECUInput.trim()]
      }));
      setSupportedECUInput('');
    }
  };

  const removeECU = (index: number) => {
    setFormData(prev => ({
      ...prev,
      supportedECUs: prev.supportedECUs.filter((_, i) => i !== index)
    }));
  };

  const addItemToList = (field: string, value: string, setInput: React.Dispatch<React.SetStateAction<string>>) => {
    if (value.trim()) {
      const currentList = formData[field as keyof UploadFirmwareData] as string[] || [];
      if (!currentList.includes(value.trim())) {
        setFormData(prev => ({
          ...prev,
          [field]: [...currentList, value.trim()]
        }));
      }
      setInput('');
    }
  };

  const removeItemFromList = (field: string, index: number) => {
    const currentList = formData[field as keyof UploadFirmwareData] as string[] || [];
    setFormData(prev => ({
      ...prev,
      [field]: currentList.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Валидация
    if (!formData.file) {
      setError('Пожалуйста, выберите файл прошивки');
      return;
    }
    
    if (formData.file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('Размер файла не должен превышать 10MB');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // В реальном приложении здесь будет вызов API
      // const newFile = await firmwareService.upload(formData);
      
      // Имитация успешной загрузки
      setTimeout(() => {
        const newFile: FirmwareFile = {
          id: Math.floor(Math.random() * 1000),
          ...formData,
          uploadDate: new Date(),
          fileSize: Math.round(formData.file.size / 1024 / 1024 * 100) / 100,
          downloadCount: 0,
          rating: 0,
          isPublic: true,
          status: 'pending',
          lastUpdated: new Date(),
          fileName: formData.file.name,
          supportedECUs: formData.supportedECUs,
        };
        
        onSuccess(newFile);
        setIsSubmitting(false);
      }, 1000);
    } catch (err) {
      setError('Ошибка при загрузке файла');
      setIsSubmitting(false);
      console.error('Error uploading firmware:', err);
    }
  };

  return (
    <div className="firmware-upload-form">
      <h2>Загрузка новой прошивки</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Основная информация</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Название прошивки *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="version">Версия *</label>
              <input
                type="text"
                id="version"
                name="version"
                value={formData.version}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Описание *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="brand">Марка автомобиля *</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="model">Модель *</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="engine">Двигатель *</label>
              <input
                type="text"
                id="engine"
                name="engine"
                value={formData.engine}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Категория *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {firmwareCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fuelType">Тип топлива *</label>
              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                required
              >
                {fuelTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="transmissionType">Тип трансмиссии</label>
              <select
                id="transmissionType"
                name="transmissionType"
                value={formData.transmissionType || ''}
                onChange={handleInputChange}
              >
                <option value="">Не указано</option>
                {transmissionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Технические характеристики</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="originalHorsepower">Мощность сток (л.с.)</label>
              <input
                type="number"
                id="originalHorsepower"
                name="originalHorsepower"
                value={formData.originalHorsepower || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="tunedHorsepower">Мощность после чипа (л.с.)</label>
              <input
                type="number"
                id="tunedHorsepower"
                name="tunedHorsepower"
                value={formData.tunedHorsepower || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="originalTorque">Крутящий момент сток (Нм)</label>
              <input
                type="number"
                id="originalTorque"
                name="originalTorque"
                value={formData.originalTorque || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="tunedTorque">Крутящий момент после чипа (Нм)</label>
              <input
                type="number"
                id="tunedTorque"
                name="tunedTorque"
                value={formData.tunedTorque || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="fuelConsumptionChange">Изменение расхода топлива</label>
            <input
              type="text"
              id="fuelConsumptionChange"
              name="fuelConsumptionChange"
              value={formData.fuelConsumptionChange || ''}
              onChange={handleInputChange}
              placeholder="Например: -10% или +5%"
            />
          </div>
        </div>
        
        <div className="form-section">
          <h3>Совместимость</h3>
          
          <div className="form-group">
            <label>Поддерживаемые ЭБУ *</label>
            <div className="list-input-container">
              <input
                type="text"
                value={supportedECUInput}
                onChange={(e) => setSupportedECUInput(e.target.value)}
                placeholder="Введите модель ЭБУ"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addECU())}
              />
              <button type="button" onClick={addECU}>Добавить</button>
            </div>
            <div className="chip-list">
              {formData.supportedECUs.map((ecu, index) => (
                <span key={index} className="chip">
                  {ecu}
                  <button type="button" onClick={() => removeECU(index)}>×</button>
                </span>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="supportedYears">Поддерживаемые годы выпуска</label>
            <input
              type="text"
              id="supportedYears"
              name="supportedYears"
              value={formData.supportedYears || ''}
              onChange={handleInputChange}
              placeholder="Например: 2010-2015"
            />
          </div>
          
          <div className="form-group">
            <label>Тестировано на автомобилях</label>
            <div className="list-input-container">
              <input
                type="text"
                value={testedVehiclesInput}
                onChange={(e) => setTestedVehiclesInput(e.target.value)}
                placeholder="Например: BMW 320d 2013"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItemToList('testedVehicles', testedVehiclesInput, setTestedVehiclesInput))}
              />
              <button type="button" onClick={() => addItemToList('testedVehicles', testedVehiclesInput, setTestedVehiclesInput)}>
                Добавить
              </button>
            </div>
            <div className="chip-list">
              {(formData.testedVehicles || []).map((vehicle, index) => (
                <span key={index} className="chip">
                  {vehicle}
                  <button type="button" onClick={() => removeItemFromList('testedVehicles', index)}>×</button>
                </span>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="compatibilityNotes">Примечания по совместимости</label>
            <textarea
              id="compatibilityNotes"
              name="compatibilityNotes"
              value={formData.compatibilityNotes || ''}
              onChange={handleInputChange}
              rows={2}
            />
          </div>
        </div>
        
        <div className="form-section">
          <h3>Оборудование и требования</h3>
          
          <div className="form-group">
            <label>Необходимое оборудование</label>
            <div className="list-input-container">
              <input
                type="text"
                value={requiredHardwareInput}
                onChange={(e) => setRequiredHardwareInput(e.target.value)}
                placeholder="Например: Удаление DPF"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItemToList('requiredHardware', requiredHardwareInput, setRequiredHardwareInput))}
              />
              <button type="button" onClick={() => addItemToList('requiredHardware', requiredHardwareInput, setRequiredHardwareInput)}>
                Добавить
              </button>
            </div>
            <div className="chip-list">
              {(formData.requiredHardware || []).map((item, index) => (
                <span key={index} className="chip">
                  {item}
                  <button type="button" onClick={() => removeItemFromList('requiredHardware', index)}>×</button>
                </span>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label>Рекомендуемые инструменты для прошивки</label>
            <div className="list-input-container">
              <input
                type="text"
                value={recommendedToolsInput}
                onChange={(e) => setRecommendedToolsInput(e.target.value)}
                placeholder="Например: KESSv2"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItemToList('recommendedTuningTools', recommendedToolsInput, setRecommendedToolsInput))}
              />
              <button type="button" onClick={() => addItemToList('recommendedTuningTools', recommendedToolsInput, setRecommendedToolsInput)}>
                Добавить
              </button>
            </div>
            <div className="chip-list">
              {(formData.recommendedTuningTools || []).map((tool, index) => (
                <span key={index} className="chip">
                  {tool}
                  <button type="button" onClick={() => removeItemFromList('recommendedTuningTools', index)}>×</button>
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Информация о прошивке</h3>
          
          <div className="form-group">
            <label htmlFor="changelog">История изменений</label>
            <textarea
              id="changelog"
              name="changelog"
              value={formData.changelog || ''}
              onChange={handleInputChange}
              rows={3}
              placeholder="Опишите изменения в этой версии прошивки"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="author">Автор прошивки</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="knownIssues">Известные проблемы</label>
            <textarea
              id="knownIssues"
              name="knownIssues"
              value={formData.knownIssues || ''}
              onChange={handleInputChange}
              rows={2}
              placeholder="Опишите известные проблемы или ограничения"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="installationInstructions">Инструкция по установке</label>
            <textarea
              id="installationInstructions"
              name="installationInstructions"
              value={formData.installationInstructions || ''}
              onChange={handleInputChange}
              rows={3}
              placeholder="Опишите процесс установки прошивки"
            />
          </div>
        </div>
        
        <div className="form-section">
          <h3>Настройки безопасности</h3>
          
          <div className="form-row">
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isEncrypted"
                  checked={formData.isEncrypted}
                  onChange={handleInputChange}
                />
                Прошивка зашифрована
              </label>
            </div>
            
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="requiresUnlockCode"
                  checked={formData.requiresUnlockCode}
                  onChange={handleInputChange}
                />
                Требуется код разблокировки
              </label>
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Файл прошивки</h3>
          
          <div className="form-group">
            <label htmlFor="file">Файл прошивки *</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              accept=".bin,.hex,.mot,.s19"
              required
            />
            <div className="file-info">
              {formData.file ? formData.file.name : 'Файл не выбран'}
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Отмена
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Загрузка...' : 'Загрузить прошивку'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FirmwareUploadForm;