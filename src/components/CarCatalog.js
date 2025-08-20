import React, { useState } from 'react';
import { carBrands, bmwDatabase } from '../data/carData';
import './CarCatalog.css';

const CarCatalog = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  return (
    <div className="car-catalog">
      <h1>Каталог автомобилей</h1>
      
      <div className="catalog-content">
        {/* Список марок */}
        <div className="brands-list">
          <h2>Марки автомобилей</h2>
          <div className="brands-grid">
            {carBrands.map(brand => (
              <div
                key={brand.id}
                className={`brand-card ${selectedBrand?.id === brand.id ? 'selected' : ''}`}
                onClick={() => handleBrandSelect(brand)}
              >
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
                <span className="brand-name">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Детальная информация */}
        <div className="details-panel">
          {selectedBrand && selectedBrand.name === 'BMW' ? (
            <div className="bmw-details">
              <h2>BMW - Детальная информация</h2>
              
              {!selectedModel ? (
                <div className="models-list">
                  <h3>Модели BMW</h3>
                  {bmwDatabase.models.map(model => (
                    <div
                      key={model.id}
                      className="model-card"
                      onClick={() => handleModelSelect(model)}
                    >
                      <h4>{model.name}</h4>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="model-details">
                  <button 
                    className="back-button"
                    onClick={() => setSelectedModel(null)}
                  >
                    ← Назад к моделям
                  </button>
                  
                  <h3>Модель: {selectedModel.name}</h3>
                  
                  {selectedModel.generations.map((generation, index) => (
                    <div key={index} className="generation-card">
                      <h4>Поколение ({generation.years})</h4>
                      <p><strong>Кузов:</strong> {generation.body}</p>
                      
                      <div className="engines-list">
                        <h5>Двигатели:</h5>
                        <ul>
                          {generation.engines.map((engine, engineIndex) => (
                            <li key={engineIndex}>{engine}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : selectedBrand ? (
            <div className="brand-info">
              <h2>{selectedBrand.name}</h2>
              <p>Информация о других марках будет добавлена позже.</p>
              <p>Для просмотра детальной информации выберите BMW.</p>
            </div>
          ) : (
            <div className="no-selection">
              <p>Выберите марку автомобиля для просмотра информации</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCatalog;