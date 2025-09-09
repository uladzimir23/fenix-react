import * as React from 'react';
import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { carBrands, bmwDatabase, CarBrand, CarModel, Generation } from '../../data/carData';
import { getTuningOptionsByEngine } from '../../data/tuningOptionsData';
import { TuningOption } from '../../api/services/tunnigOptions';
import './CarFilter.css';
import Icon from "../ui/Icon";

const CarFilter: React.FC = () => {
  const [searchTerms, setSearchTerms] = useState({
    brands: '',
    models: '',
    generations: '',
    engines: '',
    tuning: ''
  });
  const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);
  const [selectedEngine, setSelectedEngine] = useState<string | null>(null);
  const [selectedTuningOption, setSelectedTuningOption] = useState<TuningOption | null>(null);
  const [viewMode, setViewMode] = useState<'brands' | 'models' | 'generations' | 'engines' | 'tuning'>('brands');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms(prev => ({
      ...prev,
      [viewMode]: e.target.value
    }));
  };

  const currentSearchTerm = searchTerms[viewMode];

  const filteredBrands = carBrands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerms.brands.toLowerCase())
  );

  const getModels = (): CarModel[] => {
    if (selectedBrand?.name === 'BMW') {
      return bmwDatabase.models.filter(model =>
        model.name.toLowerCase().includes(searchTerms.models.toLowerCase())
      );
    }
    return [];
  };

  const getGenerations = (): Generation[] => {
    if (selectedModel && selectedBrand?.name === 'BMW') {
      return selectedModel.generations.filter(generation =>
        generation.body.toLowerCase().includes(searchTerms.generations.toLowerCase()) ||
        generation.years.toLowerCase().includes(searchTerms.generations.toLowerCase())
      );
    }
    return [];
  };

  const getEngines = (): string[] => {
    if (selectedGeneration) {
      return selectedGeneration.engines.filter(engine =>
        engine.toLowerCase().includes(searchTerms.engines.toLowerCase())
      );
    }
    return [];
  };

  const getTuningOptions = (): TuningOption[] => {
    if (selectedEngine) {
      return getTuningOptionsByEngine(selectedEngine).filter(option =>
        option.name.toLowerCase().includes(searchTerms.tuning.toLowerCase()) ||
        option.category.toLowerCase().includes(searchTerms.tuning.toLowerCase()) ||
        (option.description && option.description.toLowerCase().includes(searchTerms.tuning.toLowerCase()))
      );
    }
    return [];
  };

  const handleBrandSelect = (brand: CarBrand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedGeneration(null);
    setSelectedEngine(null);
    setSelectedTuningOption(null);
    setViewMode('models');
  };

  const handleModelSelect = (model: CarModel) => {
    setSelectedModel(model);
    setSelectedGeneration(null);
    setSelectedEngine(null);
    setSelectedTuningOption(null);
    setViewMode('generations');
  };

  const handleGenerationSelect = (generation: Generation) => {
    setSelectedGeneration(generation);
    setSelectedEngine(null);
    setSelectedTuningOption(null);
    setViewMode('engines');
  };

  const handleEngineSelect = (engine: string) => {
    setSelectedEngine(engine);
    setSelectedTuningOption(null);
    setViewMode('tuning');
  };

  const handleTuningOptionSelect = (option: TuningOption) => {
    setSelectedTuningOption(option);
  };

  const clearAllFilters = () => {
    setSearchTerms({
      brands: '',
      models: '',
      generations: '',
      engines: '',
      tuning: ''
    });
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedGeneration(null);
    setSelectedEngine(null);
    setSelectedTuningOption(null);
    setViewMode('brands');
  };

  const goBack = () => {
    switch (viewMode) {
      case 'tuning':
        setViewMode('engines');
        setSelectedTuningOption(null);
        break;
      case 'engines':
        setViewMode('generations');
        setSelectedEngine(null);
        break;
      case 'generations':
        setViewMode('models');
        setSelectedGeneration(null);
        break;
      case 'models':
        setViewMode('brands');
        setSelectedModel(null);
        setSelectedBrand(null);
        break;
      default:
        setViewMode('brands');
    }
  };

  const getPlaceholderText = () => {
    switch (viewMode) {
      case 'brands': return 'Поиск по марке...';
      case 'models': return 'Поиск по модели...';
      case 'generations': return 'Поиск по поколению...';
      case 'engines': return 'Поиск по двигателю...';
      case 'tuning': return 'Поиск по опциям тюнинга...';
      default: return 'Поиск...';
    }
  };

  const hasActiveFilters = selectedBrand || selectedModel || selectedGeneration || selectedEngine || selectedTuningOption || 
    Object.values(searchTerms).some(term => term !== '');

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
                onClick={() => handleModelSelect(model)}
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
                <h3>{generation.body}</h3>
                <p>{generation.years}</p>
              </div>
            ))}
          </div>
        );

      case 'engines':
        return (
          <div className="content-grid">
            {getEngines().map((engine, index) => (
              <div
                key={index}
                className="content-card"
                onClick={() => handleEngineSelect(engine)}
              >
                <h3>{engine}</h3>
              </div>
            ))}
          </div>
        );

      case 'tuning':
        return (
          <div className="content-grid tuning-grid">
            {getTuningOptions().map((option) => (
              <div
                key={option.id}
                className="content-card detailed tuning-option"
                onClick={() => handleTuningOptionSelect(option)}
              >
                <h3>{option.name}</h3>
                <p className="category">{option.category}</p>
                {option.price && <p className="price">{option.price} ₽</p>}
                <div className="description">
                  {option.description?.split('\n').map((line: string, i: number) => (
                    <p key={i}>{line}</p>
                  ))}
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
      <div className="filter-panel">
        <h2>Поиск автомобилей</h2>

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
                {selectedModel.name}
              </span>
            </>
          )}
          {selectedGeneration && (
            <>
              <span className="breadcrumb-separator">›</span>
              <span
                className={viewMode === 'engines' ? 'active' : ''}
                onClick={() => setViewMode('engines')}
              >
                {selectedGeneration.body}
              </span>
            </>
          )}
          {selectedEngine && (
            <>
              <span className="breadcrumb-separator">›</span>
              <span
                className={viewMode === 'tuning' ? 'active' : ''}
                onClick={() => setViewMode('tuning')}
              >
                Двигатель
              </span>
            </>
          )}
        </div>

        <div className="filter-group">
          <div className="search-input">
            <Icon icon={FaSearch} className="search-icon" />
            <input
              type="text"
              placeholder={getPlaceholderText()}
              value={currentSearchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {selectedBrand && (
          <div className="selection-info">
            <div className="selected-item">
              <span>{selectedBrand.name}</span>
              <Icon
                icon={FaTimes}
                className="remove-icon"
                onClick={() => {
                  setSelectedBrand(null);
                  setSelectedModel(null);
                  setSelectedGeneration(null);
                  setSelectedEngine(null);
                  setSelectedTuningOption(null);
                  setViewMode('brands');
                }}
              />
            </div>
          </div>
        )}

        {selectedModel && (
          <div className="selection-info">
            <div className="selected-item">
              <span>{selectedModel.name}</span>
              <Icon
                icon={FaTimes}
                className="remove-icon"
                onClick={() => {
                  setSelectedModel(null);
                  setSelectedGeneration(null);
                  setSelectedEngine(null);
                  setSelectedTuningOption(null);
                  setViewMode('models');
                }}
              />
            </div>
          </div>
        )}

        {selectedGeneration && (
          <div className="selection-info">
            <div className="selected-item">
              <span>{selectedGeneration.body} ({selectedGeneration.years})</span>
              <Icon
                icon={FaTimes}
                className="remove-icon"
                onClick={() => {
                  setSelectedGeneration(null);
                  setSelectedEngine(null);
                  setSelectedTuningOption(null);
                  setViewMode('generations');
                }}
              />
            </div>
          </div>
        )}

        {selectedEngine && (
          <div className="selection-info">
            <div className="selected-item">
              <span>{selectedEngine}</span>
              <Icon
                icon={FaTimes}
                className="remove-icon"
                onClick={() => {
                  setSelectedEngine(null);
                  setSelectedTuningOption(null);
                  setViewMode('engines');
                }}
              />
            </div>
          </div>
        )}

        {selectedTuningOption && (
          <div className="selection-info">
            <div className="selected-item">
              <span>{selectedTuningOption.name}</span>
              <Icon
                icon={FaTimes}
                className="remove-icon"
                onClick={() => {
                  setSelectedTuningOption(null);
                  setViewMode('tuning');
                }}
              />
            </div>
          </div>
        )}
        <div className='buttons-container'>

          {viewMode !== 'brands' && (
            <button className="back-button" onClick={goBack}>
              Назад
            </button>
          )}
          {hasActiveFilters && (
            <button className="clear-button" onClick={clearAllFilters}>
              Сбросить
            </button>
          )}
          
        </div>
      </div>

      <div className="results-panel">
        <div className="results-header">
          <h2>
            {viewMode === 'brands' && 'Все марки автомобилей'}
            {viewMode === 'models' && `Модели ${selectedBrand?.name}`}
            {viewMode === 'generations' && `Поколения ${selectedModel?.name}`}
            {viewMode === 'engines' && `Двигатели ${selectedGeneration?.body}`}
            {viewMode === 'tuning' && `Опции тюнинга для ${selectedEngine}`}
          </h2>
          {hasActiveFilters && (
            <button className="clear-results" onClick={clearAllFilters}>
              <Icon icon={FaTimes} /> Очистить
            </button>
          )}
        </div>
        {renderRightContent()}
      </div>
    </div>
  );
};

export default CarFilter;