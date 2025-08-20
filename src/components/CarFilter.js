import React, { useState } from 'react';
import { FaSearch, FaTimes, FaChevronDown, FaCar, FaList, FaCalendar, FaCog } from 'react-icons/fa';
import { carBrands, bmwDatabase } from '../data/carData';
import './CarFilter.css';

const CarFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const [viewMode, setViewMode] = useState('brands'); // brands, models, generations

  // Фильтрация марок по поиску
  const filteredBrands = carBrands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Получение моделей выбранной марки
  const getModels = () => {
    if (selectedBrand?.name === 'BMW') {
      return bmwDatabase.models;
    }
    return [];
  };

  // Получение поколений выбранной модели
  const getGenerations = () => {
    if (selectedModel && selectedBrand?.name === 'BMW') {
      const model = bmwDatabase.models.find(m => m.name === selectedModel);
      return model ? model.generations : [];
    }
    return [];
  };

  // Обработчики выбора
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedGeneration(null);
    setViewMode('models');
  };

  const handleModelSelect = (modelName) => {
    setSelectedModel(modelName);
    setSelectedGeneration(null);
    setViewMode('generations');
  };

  const handleGenerationSelect = (generation) => {
    setSelectedGeneration(generation);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedGeneration(null);
    setViewMode('brands');
  };

  const goBack = () => {
    if (viewMode === 'generations') {
      setViewMode('models');
      setSelectedGeneration(null);
    } else if (viewMode === 'models') {
      setViewMode('brands');
      setSelectedModel(null);
      setSelectedBrand(null);
    }
  };

  const hasActiveFilters = selectedBrand || selectedModel || selectedGeneration || searchTerm;

  // Рендер контента в правой части
  const renderRightContent = () => {
    switch (viewMode) {
      case 'brands':
        return (
          <div className="content-grid">
            {filteredBrands.map(brand => (
              <div
                key={brand.id}
                className="content-card"
                onClick={() => handleBrandSelect(brand)}
              >
                <img src={brand.logo} alt={brand.name} className="content-logo" />
                <h3>{brand.name}</h3>
              </div>
            ))}
          </div>
        );

      case 'models':
        return (
          <div className="content-grid">
            {getModels().map(model => (
              <div
                key={model.id}
                className="content-card"
                onClick={() => handleModelSelect(model.name)}
              >
                <h3>{model.name}</h3>
                <p>{model.generations.length} поколений</p>
              </div>
            ))}
          </div>
        );

      case 'generations':
        return (
          <div className="content-grid">
            {getGenerations().map((generation, index) => (
              <div
                key={index}
                className="content-card detailed"
                onClick={() => handleGenerationSelect(generation)}
              >
                <h3>Поколение {generation.body}</h3>
                <p><strong>Годы:</strong> {generation.years}</p>
                <div className="engines-list">
                  <strong>Двигатели:</strong>
                  <ul>
                    {generation.engines.map((engine, engineIndex) => (
                      <li key={engineIndex}>{engine}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="car-filter-container">
      {/* Левая панель фильтров */}
      <div className="filter-panel">
        <h2>Поиск автомобилей</h2>
        
        {/* Хлебные крошки */}
        <div className="breadcrumbs">
          <span 
            className={viewMode === 'brands' ? 'active' : ''}
            onClick={() => setViewMode('brands')}
          >
            Марки
          </span>
          {selectedBrand && (
            <>
              <span className="breadcrumb-separator">›</span>
              <span 
                className={viewMode === 'models' ? 'active' : ''}
                onClick={() => setViewMode('models')}
              >
                {selectedBrand.name}
              </span>
            </>
          )}
          {selectedModel && (
            <>
              <span className="breadcrumb-separator">›</span>
              <span 
                className={viewMode === 'generations' ? 'active' : ''}
                onClick={() => setViewMode('generations')}
              >
                {selectedModel}
              </span>
            </>
          )}
        </div>

        {/* Поиск */}
        <div className="filter-group">
          <div className="search-input">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Поиск по марке..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={viewMode !== 'brands'}
            />
          </div>
        </div>

        {/* Информация о выборе */}
        {selectedBrand && (
          <div className="selection-info">
            <div className="selected-item">
              <strong></strong> 
              <span>{selectedBrand.name}</span>
              <FaTimes 
                className="remove-icon" 
                onClick={() => {
                  setSelectedBrand(null);
                  setSelectedModel(null);
                  setSelectedGeneration(null);
                  setViewMode('brands');
                }} 
              />
            </div>
          </div>
        )}

        {selectedModel && (
          <div className="selection-info">
            <div className="selected-item">
              <strong></strong> 
              <span>{selectedModel}</span>
              <FaTimes 
                className="remove-icon" 
                onClick={() => {
                  setSelectedModel(null);
                  setSelectedGeneration(null);
                  setViewMode('models');
                }} 
              />
            </div>
          </div>
        )}

        {selectedGeneration && (
          <div className="selection-info">
            <div className="selected-item">
              <strong></strong> 
              <span>{selectedGeneration.body} ({selectedGeneration.years})</span>
              <FaTimes 
                className="remove-icon" 
                onClick={() => setSelectedGeneration(null)} 
              />
            </div>
          </div>
        )}

        {/* Кнопка сброса */}
        {hasActiveFilters && (
          <button className="clear-button" onClick={clearAllFilters}>
            <FaTimes /> Сбросить все
          </button>
        )}

        {/* Кнопка назад */}
        {(viewMode === 'models' || viewMode === 'generations') && (
          <button className="back-button" onClick={goBack}>
            ← Назад
          </button>
        )}
      </div>

      {/* Правая панель результатов */}
      <div className="results-panel">
        <div className="results-header">
          <h2>
            {viewMode === 'brands' && 'Все марки автомобилей'}
            {viewMode === 'models' && `Модели ${selectedBrand?.name}`}
            {viewMode === 'generations' && `Поколения ${selectedModel}`}
            
            {hasActiveFilters && (
              <button className="clear-results" onClick={clearAllFilters}>
                <FaTimes /> Очистить
              </button>
            )}
          </h2>
        </div>

        {renderRightContent()}
      </div>
    </div>
  );
};

export default CarFilter;