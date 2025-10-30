import React, { useState, useEffect } from 'react';
import { FirmwareFile } from '../api/types/firmware';
import FirmwareUploadForm from '../components/forms/FirmwareUploadForm';
import FirmwareCard from '../components/FirmwareCard';
import SearchFilters from '../components/SearchFilters';
import './Files.css';

const Files: React.FC = () => {
  const [firmwareFiles, setFirmwareFiles] = useState<FirmwareFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FirmwareFile[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    loadFirmwareFiles();
  }, []);

  
  const loadFirmwareFiles = async () => {
    try {
      setIsLoading(true);
      // В реальном приложении здесь будет вызов API
      // const data = await firmwareService.getAll();
      
      // Используем мок-данные для демонстрации
      setTimeout(() => {
        const { mockFirmwareFiles } = require('../data/firmwareData');
        setFirmwareFiles(mockFirmwareFiles);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setError('Ошибка при загрузке файлов');
      setIsLoading(false);
      console.error('Error loading firmware files:', err);
    }
  };

  const filterAndSortFiles = () => {
    let filtered = [...firmwareFiles];

    // Фильтрация по поисковому запросу
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(query) ||
        file.description.toLowerCase().includes(query) ||
        file.brand.toLowerCase().includes(query) ||
        file.model.toLowerCase().includes(query) ||
        file.engine.toLowerCase().includes(query)
      );
    }

    // Фильтрация по категории
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(file => file.category === selectedCategory);
    }

    // Фильтрация по бренду
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(file => file.brand === selectedBrand);
    }

    // Сортировка
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.downloadCount - a.downloadCount);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredFiles(filtered);
  };

  const handleUploadSuccess = (newFile: FirmwareFile) => {
    setFirmwareFiles(prev => [newFile, ...prev]);
    setIsUploadModalOpen(false);
  };

  const handleDownload = async (id: number) => {
    try {
      // В реальном приложении здесь будет вызов API
      // await firmwareService.incrementDownloadCount(id);
      
      // Обновляем счетчик загрузок локально
      setFirmwareFiles(prev => 
        prev.map(file => 
          file.id === id 
            ? { ...file, downloadCount: file.downloadCount + 1 } 
            : file
        )
      );
      
      alert('Файл будет скачан');
    } catch (err) {
      console.error('Error downloading file:', err);
    }
  };

  const getUniqueBrands = () => {
    const brands = firmwareFiles.map(file => file.brand);
    return ['all', ...Array.from(new Set(brands))];
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="files-page">
      <div className="page-header">
        <h1>База прошивок</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setIsUploadModalOpen(true)}
        >
          Загрузить прошивку
        </button>
      </div>

      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        sortBy={sortBy}
        setSortBy={setSortBy}
        brands={getUniqueBrands()}
      />

      <div className="files-stats">
        <p>Найдено прошивок: {filteredFiles.length}</p>
      </div>

      {isLoading ? (
        <div className="loading">Загрузка...</div>
      ) : filteredFiles.length === 0 ? (
        <div className="no-results">
          <p>Прошивки не найдены. Попробуйте изменить параметры поиска.</p>
        </div>
      ) : (
        <div className="firmware-grid">
          {filteredFiles.map(file => (
            <FirmwareCard
              key={file.id}
              firmware={file}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}

      {isUploadModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="modal-close"
              onClick={() => setIsUploadModalOpen(false)}
            >
              ×
            </button>
            <FirmwareUploadForm
              onSuccess={handleUploadSuccess}
              onCancel={() => setIsUploadModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Files;