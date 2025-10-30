import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { carBrands, bmwDatabase, CarBrand, CarModel, Generation } from '../../data/carData';
import { TuningOption } from '../../api/services/tunnigOptions';
import { mockFirmwareFiles } from '../../data/firmwareData';
import { FirmwareFile } from '../../api/types/firmware';
import { 
  getFirmwareCountByBrand,
  getFirmwareCountByModel,
  getFirmwareCountByGeneration,
  getFirmwareCountByEngine
} from '../../data/firmwareData';
import './CarFilter.css';
import Icon from "../ui/Icon";
import { 
  getCategories,
  getTuningOptionsByEngine,
  getCategoryDescription
} from '../../data/tuningOptionsData';
import FirmwareDetail from '../firmware/FirmwareDetail';


interface TuningOptionWithCount extends TuningOption {
  count: number;
}

interface RemoveIconHoverState {
  brand: boolean;
  model: boolean;
  generation: boolean;
  engine: boolean;
  tuningOption: boolean;
  firmware: boolean;
}

interface ContentCardProps {
  children: React.ReactNode;
  delay: number;
  className?: string;
  onClick?: () => void;
}



const AnimatedCard: React.FC<ContentCardProps> = ({ 
  children, 
  delay, 
  className = "", 
  onClick 
}) => {
  return (
    <div 
      className={`content-card ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const CarFilter: React.FC = () => {
  const [searchTerms, setSearchTerms] = useState({
    brands: '',
    models: '',
    generations: '',
    engines: '',
    tuning: '',
    firmware: ''
  });
  const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);
  const [selectedEngine, setSelectedEngine] = useState<string | null>(null);
  const [selectedTuningOption, setSelectedTuningOption] = useState<TuningOption | null>(null);
  const [selectedFirmware, setSelectedFirmware] = useState<FirmwareFile | null>(null);
  const [viewMode, setViewMode] = useState<'brands' | 'models' | 'generations' | 'engines' | 'tuning' | 'firmware'>('brands');
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [hasScroll, setHasScroll] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const resultsContentRef = useRef<HTMLDivElement>(null);
  const [detailFirmware, setDetailFirmware] = useState<FirmwareFile | null>(null);


  const [removeIconHover, setRemoveIconHover] = useState<RemoveIconHoverState>({
    brand: false,
    model: false,
    generation: false,
    engine: false,
    tuningOption: false,
    firmware: false
  });

  useEffect(() => {
    setIsGridVisible(false);
    const timer = setTimeout(() => {
      setIsGridVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [viewMode]);

  useEffect(() => {
    const checkScroll = () => {
      if (resultsContentRef.current) {
        setHasScroll(resultsContentRef.current.scrollHeight > resultsContentRef.current.clientHeight);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [viewMode, isGridVisible]);

    // Заменить весь эффект обработки скролла (строки 80-100)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 1500);
    };

    const contentElement = resultsContentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const handleRemoveIconMouseEnter = (type: keyof RemoveIconHoverState) => {
    setRemoveIconHover(prev => ({ ...prev, [type]: true }));
  };

  const handleRemoveIconMouseLeave = (type: keyof RemoveIconHoverState) => {
    setRemoveIconHover(prev => ({ ...prev, [type]: false }));
  };

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

  const getModels = useCallback((): CarModel[] => {
    if (selectedBrand?.name === 'BMW') {
      return bmwDatabase.models.filter(model =>
        model.name.toLowerCase().includes(searchTerms.models.toLowerCase())
      );
    }
    return [];
  }, [selectedBrand, searchTerms.models]);

  const getGenerations = useCallback((): Generation[] => {
    if (selectedModel && selectedBrand?.name === 'BMW') {
      return selectedModel.generations.filter(generation =>
        generation.body.toLowerCase().includes(searchTerms.generations.toLowerCase()) ||
        generation.years.toLowerCase().includes(searchTerms.generations.toLowerCase())
      );
    }
    return [];
  }, [selectedModel, selectedBrand, searchTerms.generations]);

  const getEngines = useCallback((): string[] => {
    if (selectedGeneration) {
      return selectedGeneration.engines.filter(engine =>
        engine.toLowerCase().includes(searchTerms.engines.toLowerCase())
      );
    }
    return [];
  }, [selectedGeneration, searchTerms.engines]);

  const getTuningOptions = useCallback((): TuningOption[] => {
    if (selectedEngine) {
      return getTuningOptionsByEngine(selectedEngine).filter(option =>
        option.name.toLowerCase().includes(searchTerms.tuning.toLowerCase()) ||
        option.category.toLowerCase().includes(searchTerms.tuning.toLowerCase()) ||
        (option.description && option.description.toLowerCase().includes(searchTerms.tuning.toLowerCase()))
      );
    }
    return [];
  }, [selectedEngine, searchTerms.tuning]);

  const getFirmwareFiles = useCallback((): FirmwareFile[] => {
    if (selectedEngine) {
      return mockFirmwareFiles.filter(firmware => {
        const engineMatch = firmware.engine === selectedEngine;
        const categoryMatch = selectedTuningOption 
          ? firmware.category === selectedTuningOption.category
          : true;
        const searchMatch = 
          firmware.brand.toLowerCase().includes(searchTerms.firmware.toLowerCase()) ||
          firmware.model.toLowerCase().includes(searchTerms.firmware.toLowerCase()) ||
          firmware.engine.toLowerCase().includes(searchTerms.firmware.toLowerCase()) ||
          firmware.name.toLowerCase().includes(searchTerms.firmware.toLowerCase());
        
        return engineMatch && categoryMatch && searchMatch;
      });
    }
    return [];
  }, [selectedEngine, selectedTuningOption, searchTerms.firmware]);

  const getOtherFirmwareFiles = useCallback((): FirmwareFile[] => {
    if (selectedTuningOption && selectedEngine) {
      return mockFirmwareFiles.filter(firmware => {
        const engineMatch = firmware.engine === selectedEngine;
        const categoryDiff = firmware.category !== selectedTuningOption.category;
        return engineMatch && categoryDiff;
      });
    }
    return [];
  }, [selectedTuningOption, selectedEngine]);

  const handleBrandSelect = (brand: CarBrand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedGeneration(null);
    setSelectedEngine(null);
    setSelectedTuningOption(null);
    setSelectedFirmware(null);
    setViewMode('models');
  };

  const handleModelSelect = (model: CarModel) => {
    setSelectedModel(model);
    setSelectedGeneration(null);
    setSelectedEngine(null);
    setSelectedTuningOption(null);
    setSelectedFirmware(null);
    setViewMode('generations');
  };

  const handleGenerationSelect = (generation: Generation) => {
    setSelectedGeneration(generation);
    setSelectedEngine(null);
    setSelectedTuningOption(null);
    setSelectedFirmware(null);
    setViewMode('engines');
  };

  const handleEngineSelect = (engine: string) => {
    setSelectedEngine(engine);
    setSelectedTuningOption(null);
    setSelectedFirmware(null);
    setViewMode('tuning');
  };

  const handleTuningOptionSelect = (option: TuningOption) => {
    setSelectedTuningOption(option);
    setSelectedFirmware(null);
    setViewMode('firmware');
  };

  const handleFirmwareSelect = (firmware: FirmwareFile) => {
    setDetailFirmware(firmware);
  };

    // Добавим обработчик покупки
  const handleBuyFirmware = (firmware: FirmwareFile) => {
    // Здесь логика покупки
    console.log('Покупка прошивки:', firmware);
    alert(`Прошивка "${firmware.name}" добавлена в корзину!`);
  };

  // Добавим обработчик закрытия деталей
  const handleCloseDetail = () => {
    setDetailFirmware(null);
  };

  const clearAllFilters = () => {
    setSearchTerms({
      brands: '',
      models: '',
      generations: '',
      engines: '',
      tuning: '',
      firmware: ''
    });
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedGeneration(null);
    setSelectedEngine(null);
    setSelectedTuningOption(null);
    setSelectedFirmware(null);
    setViewMode('brands');
  };

  const goBack = () => {
    switch (viewMode) {
      case 'firmware':
        setViewMode('tuning');
        setSelectedFirmware(null);
        break;
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
      case 'tuning': return 'Поиск по опциям...';
      case 'firmware': return 'Поиск по прошивкам...';
      default: return 'Поиск...';
    }
  };

  const hasActiveFilters = selectedBrand || selectedModel || selectedGeneration || selectedEngine || selectedTuningOption || selectedFirmware || 
    Object.values(searchTerms).some(term => term !== '');

  const renderRightContent = () => {
    if (!isGridVisible) return null;
    
    switch (viewMode) {
      case 'brands':
        return (
          <div className="content-grid">
            {filteredBrands.map((brand, index) => {
              const count = getFirmwareCountByBrand(brand.name);
              return (
                <AnimatedCard
                  key={brand.id}
                  delay={index * 20}
                  onClick={() => handleBrandSelect(brand)}
                >
                  <div className="firmware-count-badge">
                    {count}
                  </div>
                  <img src={brand.logo} alt={brand.name} className="content-logo" />
                  <h3>{brand.name}</h3>
                  <p>{count} прошивок</p>
                </AnimatedCard>
              );
            })}
          </div>
        );
 
      case 'models':
        return (
          <div className="content-grid">
            {getModels().map((model, index) => {
              const count = getFirmwareCountByModel(selectedBrand!.name, model.name);
              return (
                <AnimatedCard
                  key={model.id}
                  delay={index * 20}
                  onClick={() => handleModelSelect(model)}
                >
                  <div className="firmware-count-badge">
                    {count}
                  </div>
                  <h3>{model.name}</h3>
                  <p>{count} прошивок</p>
                </AnimatedCard>
              );
            })}
          </div>
        );

      case 'generations':
        return (
          <div className="content-grid">
            {getGenerations().map((generation, index) => {
              const count = getFirmwareCountByGeneration(
                selectedBrand!.name, 
                selectedModel!.name, 
                generation.body
              );
              return (
                <AnimatedCard
                  key={index}
                  delay={index * 50}
                  className="detailed"
                  onClick={() => handleGenerationSelect(generation)}
                >
                  <div className="firmware-count-badge">
                    {count}
                  </div>
                  <h3>{generation.body}</h3>
                  <p>{generation.years}</p>
                  <p>{count} прошивок</p>
                </AnimatedCard>
              );
            })}
          </div>
        );

      case 'engines':
        return (
          <div className="content-grid">
            {getEngines().map((engine, index) => {
              const count = getFirmwareCountByEngine(engine);
              return (
                <AnimatedCard
                  key={index}
                  delay={index * 50}
                  onClick={() => handleEngineSelect(engine)}
                >
                  <div className="firmware-count-badge">
                    {count}
                  </div>
                  <h3>{engine}</h3>
                  <p>{count} прошивок</p>
                </AnimatedCard>
              );
            })}
          </div>
        );

      case 'tuning':
        if (!selectedEngine) {
          return <div>Двигатель не выбран</div>;
        }
      
        const allCategories = getCategories();
        const availableOptions: TuningOptionWithCount[] = [];
        const unavailableOptions: TuningOptionWithCount[] = [];
        
        allCategories.forEach((category, index) => {
          const existingOption = getTuningOptions().find(option => 
            option.category === category && option.engineCode === selectedEngine
          );
          
          const option = existingOption || {
            id: index + 10000,
            name: `${category} ${selectedEngine.split(' ')[0]}`,
            description: getCategoryDescription(category),
            category,
            engineCode: selectedEngine
          };
          
          const count = mockFirmwareFiles.filter(firmware => 
            firmware.engine === selectedEngine && 
            firmware.category === option.category
          ).length;
          
          if (count > 0) {
            availableOptions.push({...option, count});
          } else {
            unavailableOptions.push({...option, count});
          }
        });
      
        return (
          <div className="tuning-options-container">
            {availableOptions.length > 0 && (
              <div className="tuning-section">
                <h3 className="tuning-section-title">Доступные опции</h3>
                <div className="content-grid tuning-grid">
                  {availableOptions.map((option, index) => {
                    const correspondingFirmware = mockFirmwareFiles.find(firmware => 
                      firmware.engine === selectedEngine && 
                      firmware.category === option.category
                    );
                    
                    return (
                      <AnimatedCard
                        key={option.id}
                        delay={index * 30}
                        className="detailed tuning-option"
                        onClick={() => handleTuningOptionSelect(option)}
                      >
                        <div className="firmware-count-badge">
                          {option.count}
                        </div>
                        <h3>{option.name}</h3>
                        <p className="category">{option.category}</p>
                        {correspondingFirmware?.price && (
                          <p className="price">От {correspondingFirmware.price} ₽</p>
                        )}
                        <p className="count-info">{option.count} прошивок доступно</p>
                        <div className="description">
                          {option.description?.split('\n').map((line: string, i: number) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      </AnimatedCard>
                    );
                  })}
                </div>
              </div>
            )}
      
            {unavailableOptions.length > 0 && (
              <div className="tuning-section">
                <h3 className="tuning-section-title">Нет в наличии</h3>
                <div className="content-grid tuning-grid">
                  {unavailableOptions.map((option, index) => (
                    <AnimatedCard
                      key={option.id}
                      delay={index * 40}
                      className="detailed tuning-option unavailable"
                    >
                      <div className="firmware-count-badge unavailable-badge">
                        0
                      </div>
                      <h3>{option.name}</h3>
                      <p className="category">{option.category}</p>
                      <p className="unavailable-text">Нет в наличии</p>
                      <div className="description">
                        {option.description?.split('\n').map((line: string, i: number) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'firmware':
        const firmwareFiles = getFirmwareFiles();
        const otherFirmwareFiles = getOtherFirmwareFiles();
        
        return (
          <div className='firmware-container'>
            <h3 className="tuning-section-title">Доступные прошивки</h3>
            <div className="content-grid tuning-grid">
              {firmwareFiles.map((firmware, index) => (
                <AnimatedCard
                  key={firmware.id}
                  delay={index * 30}
                  className="detailed firmware-option"
                  onClick={() => handleFirmwareSelect(firmware)}
                >
                  <div className='firmware-wrapper'>
                    <div className='firmware-header-wrapper'>
                      <div className='firmware-header-container'>
                        <div className="firmware-header">
                          <h3>{firmware.name}</h3>
                          <span className="firmware-version">{firmware.version}</span>
                        </div>
                        <p className="category">{firmware.category}</p>
                      </div>
                      {firmware.price && (
                        <p className="price">Цена: {firmware.price} ₽</p>
                      )}
                    </div>
                    <div className="firmware-stats">
                      <div className="stat">
                        <span className="stat-label">Мощность:</span>
                        <span className="stat-value">{firmware.originalHorsepower} → {firmware.tunedHorsepower} л.с.</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Крутящий момент:</span>
                        <span className="stat-value">{firmware.originalTorque} → {firmware.tunedTorque} Н·м</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Прирост:</span>
                        <span className="stat-value">+{firmware.horsepowerGain} л.с. / +{firmware.torqueGain} Н·м</span>
                      </div>
                    </div>
                  </div>
                  <p className="description">{firmware.description.substring(0, 250)}...</p>
                  <div className="firmware-meta">
                    <span className="rating">★ {firmware.rating}</span>
                    <span className="downloads">📥 {firmware.downloadCount}</span>
                    <span className="date">{firmware.uploadDate.toLocaleDateString()}</span>
                  </div>
                </AnimatedCard>
              ))}
            </div>
            
            {otherFirmwareFiles.length > 0 && (
              <div className="other-firmwares-section">
                <h3 className="other-firmwares-title">
                  Другие прошивки на {selectedBrand?.name} {selectedModel?.name} {selectedGeneration?.body} {selectedEngine}
                </h3>
                <div className="content-grid tuning-grid">
                  {otherFirmwareFiles.map((firmware, index) => (
                    <AnimatedCard
                      key={firmware.id}
                      delay={index * 40}
                      className="detailed firmware-option"
                      onClick={() => setDetailFirmware(firmware)}
                    >
                      <div className='firmware-wrapper'>
                        <div className='firmware-header-wrapper'>
                          <div className='firmware-header-container'>
                            <div className="firmware-header">
                              <h3>{firmware.name}</h3>
                              <span className="firmware-version">{firmware.version}</span>
                            </div>
                            <p className="category">{firmware.category}</p>
                          </div>
                          {firmware.price && (
                            <p className="price">Цена: {firmware.price} ₽</p>
                          )}
                        </div>
                        <div className="firmware-stats">
                          <div className="stat">
                            <span className="stat-label">Мощность:</span>
                            <span className="stat-value">{firmware.originalHorsepower} → {firmware.tunedHorsepower} л.с.</span>
                          </div>
                          <div className="stat">
                            <span className="stat-label">Прирост:</span>
                            <span className="stat-value">+{firmware.horsepowerGain} л.с.</span>
                          </div>
                        </div>
                      </div>
                      <p className="description">{firmware.description.substring(0, 250)}...</p>
                      <div className="firmware-meta">
                        <span className="rating">★ {firmware.rating}</span>
                        <span className="downloads">📥 {firmware.downloadCount}</span>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const resultsContentClass = `results-content ${hasScroll ? 'has-scroll' : 'no-scroll'} ${isScrolling ? 'scrolling' : ''}`;

  return (
    <div className="car-filter-wrapper">
      <div className="car-filter-container">
        <div className="filter-panel">
          <div className='header-filter-panel'>
            <h2>Поиск прошивок</h2>
          </div>
          <div className='results-filter-panel'>
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
              {selectedTuningOption && (
                <>
                  <span className="breadcrumb-separator">›</span>
                  <span
                    className={viewMode === 'firmware' ? 'active' : ''}
                    onClick={() => setViewMode('firmware')}
                  >
                    {selectedTuningOption.name}
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
                <div className={`selected-item ${removeIconHover.brand ? 'remove-icon-hover' : ''}`}>
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
                      setSelectedFirmware(null);
                      setViewMode('brands');
                    }}
                    onMouseEnter={() => handleRemoveIconMouseEnter('brand')}
                    onMouseLeave={() => handleRemoveIconMouseLeave('brand')}
                  />
                </div>
              </div>
            )}

            {selectedModel && (
              <div className="selection-info">
                <div className={`selected-item ${removeIconHover.model ? 'remove-icon-hover' : ''}`}>
                  <span>{selectedModel.name}</span>
                  <Icon
                    icon={FaTimes}
                    className="remove-icon"
                    onClick={() => {
                      setSelectedModel(null);
                      setSelectedGeneration(null);
                      setSelectedEngine(null);
                      setSelectedTuningOption(null);
                      setSelectedFirmware(null);
                      setViewMode('models');
                    }}
                    onMouseEnter={() => handleRemoveIconMouseEnter('model')}
                    onMouseLeave={() => handleRemoveIconMouseLeave('model')}
                  />
                </div>
              </div>
            )}

            {selectedGeneration && (
              <div className="selection-info">
                <div className={`selected-item ${removeIconHover.generation ? 'remove-icon-hover' : ''}`}>
                  <span>{selectedGeneration.body} ({selectedGeneration.years})</span>
                  <Icon
                    icon={FaTimes}
                    className="remove-icon"
                    onClick={() => {
                      setSelectedGeneration(null);
                      setSelectedEngine(null);
                      setSelectedTuningOption(null);
                      setSelectedFirmware(null);
                      setViewMode('generations');
                    }}
                    onMouseEnter={() => handleRemoveIconMouseEnter('generation')}
                    onMouseLeave={() => handleRemoveIconMouseLeave('generation')}
                  />
                </div>
              </div>
            )}

            {selectedEngine && (
              <div className="selection-info">
                <div className={`selected-item ${removeIconHover.engine ? 'remove-icon-hover' : ''}`}>
                  <span>{selectedEngine}</span>
                  <Icon
                    icon={FaTimes}
                    className="remove-icon"
                    onClick={() => {
                      setSelectedEngine(null);
                      setSelectedTuningOption(null);
                      setSelectedFirmware(null);
                      setViewMode('engines');
                    }}
                    onMouseEnter={() => handleRemoveIconMouseEnter('engine')}
                    onMouseLeave={() => handleRemoveIconMouseLeave('engine')}
                  />
                </div>
              </div>
            )}

            {selectedTuningOption && (
              <div className="selection-info">
                <div className={`selected-item ${removeIconHover.tuningOption ? 'remove-icon-hover' : ''}`}>
                  <span>{selectedTuningOption.name}</span>
                  <Icon
                    icon={FaTimes}
                    className="remove-icon"
                    onClick={() => {
                      setSelectedTuningOption(null);
                      setSelectedFirmware(null);
                      setViewMode('tuning');
                    }}
                    onMouseEnter={() => handleRemoveIconMouseEnter('tuningOption')}
                    onMouseLeave={() => handleRemoveIconMouseLeave('tuningOption')}
                  />
                </div>
              </div>
            )}

            {selectedFirmware && (
              <div className="selection-info">
                <div className={`selected-item ${removeIconHover.firmware ? 'remove-icon-hover' : ''}`}>
                  <span>{selectedFirmware.name}</span>
                  <Icon
                    icon={FaTimes}
                    className="remove-icon"
                    onClick={() => {
                      setSelectedFirmware(null);
                      setViewMode('firmware');
                    }}
                    onMouseEnter={() => handleRemoveIconMouseEnter('firmware')}
                    onMouseLeave={() => handleRemoveIconMouseLeave('firmware')}
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
        </div>

        <div className="results-panel">
          <div className="results-header">
            <h2>
              {viewMode === 'brands' && `Все марки автомобилей`}
              {viewMode === 'models' && `Модели ${selectedBrand?.name}`}
              {viewMode === 'generations' && `Поколения ${selectedModel?.name}`}
              {viewMode === 'engines' && `Двигатели ${selectedGeneration?.body}`}
              {viewMode === 'tuning' && `Опции тюнинга для ${selectedEngine}`}              
              {viewMode === 'firmware' && `Прошивки ${selectedTuningOption?.name}`}
            </h2>
            {hasActiveFilters && (
              <button className="clear-results" onClick={clearAllFilters}>
                <Icon icon={FaTimes} /> Очистить
              </button>
            )}
          </div>
          <div className={resultsContentClass} ref={resultsContentRef}>
            {hasScroll && <div className="fade-overlay top-fade"></div>}
            {renderRightContent()}
            {hasScroll && <div className="fade-overlay bottom-fade"></div>}
          </div>
        </div>
        
      </div>
      {/* Модальное окно с деталями прошивки */}
      {detailFirmware && (
        <FirmwareDetail
          firmware={detailFirmware}
          onClose={handleCloseDetail}
          onBuy={handleBuyFirmware}
        />
      )}
    </div>
  );
};

export default CarFilter;