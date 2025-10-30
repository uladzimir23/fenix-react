import React, { useState, useEffect } from 'react';
import { FirmwareFile } from '../../api/types/firmware';
import './FirmwareDetail.css';

interface FirmwareDetailProps {
  firmware: FirmwareFile;
  onClose: () => void;
  onBuy: (firmware: FirmwareFile) => void;
}

const FirmwareDetail: React.FC<FirmwareDetailProps> = ({ firmware, onClose, onBuy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Анимация появления после монтирования компонента
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300); // Время должно совпадать с CSS анимацией
  };

  const handleBuyClick = () => {
    onBuy(firmware);
  };

  return (
    <div className={`firmware-detail-overlay ${isVisible ? 'visible' : ''} ${isClosing ? 'closing' : ''}`}>
      <div className={`firmware-detail-modal ${isVisible ? 'visible' : ''} ${isClosing ? 'closing' : ''}`}>
        <div className="firmware-detail-header">
          <div className="header-content">
            {firmware.price && (
                    <div className="firmware-price">
                        <span className="price">{firmware.price} ₽</span>
                        <button className="buy-button" onClick={handleBuyClick}>
                        Купить
                        </button>
                    </div>
                    )}
            <div>
            <div className="firmware-meta-card-header">
                <div className='category-badge-wrapper'>
                <span className="category-badge">{firmware.category}</span>
                
                    <div className='firmware-meta-header-wrapper'>
                    <div className="car-info">
                        {firmware.brand} {firmware.model} • {firmware.engine}
                    </div>

                    <div className="firmware-meta-header">
                    <span className="version">Версия: {firmware.version}</span>
                    <span className="rating">★ {firmware.rating}</span>
                    <span className="downloads">📥 {firmware.downloadCount}</span>
                    </div>
                    </div>
                </div>
                <h2>{firmware.name}</h2>  
            </div>
            </div>
          </div>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="firmware-detail-content">
          <div className="firmware-detail-main">
            <div className="content-card detailed firmware-main-card">

              <div className="firmware-description">
                <h3>Описание</h3>
                <p>{firmware.description}</p>
              </div>

              <div className="firmware-specs">
                <h3>Характеристики</h3>
                <div className="specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Марка:</span>
                    <span className="spec-value">{firmware.brand}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Модель:</span>
                    <span className="spec-value">{firmware.model}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Двигатель:</span>
                    <span className="spec-value">{firmware.engine}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Тип топлива:</span>
                    <span className="spec-value">{firmware.fuelType}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Категория:</span>
                    <span className="spec-value">{firmware.category}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Мощность (до/после):</span>
                    <span className="spec-value">{firmware.originalHorsepower} → {firmware.tunedHorsepower} л.с.</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Крутящий момент (до/после):</span>
                    <span className="spec-value">{firmware.originalTorque} → {firmware.tunedTorque} Н·м</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Прирост:</span>
                    <span className="spec-value">+{firmware.horsepowerGain} л.с. / +{firmware.torqueGain} Н·м</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Изменение расхода:</span>
                    <span className="spec-value">{firmware.fuelConsumptionChange}</span>
                  </div>
                </div>
              </div>
            </div>

            {firmware.requiredHardware && firmware.requiredHardware.length > 0 && (
              <div className="content-card detailed firmware-second-card">
                <div className="firmware-requirements">
                  <h3>Необходимое оборудование</h3>
                  <ul>
                    {firmware.requiredHardware.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {firmware.compatibilityNotes && (
              <div className="content-card detailed firmware-second-card">
                <div className="firmware-compatibility">
                  <h3>Совместимость</h3>
                  <p>{firmware.compatibilityNotes}</p>
                </div>
              </div>
            )}

            {firmware.changelog && (
              <div className="content-card detailed firmware-second-card">
                <div className="firmware-changelog">
                  <h3>История изменений</h3>
                  <pre>{firmware.changelog}</pre>
                </div>
              </div>
            )}
          </div>

          <div className="firmware-detail-sidebar">
            <div className="content-card detailed firmware-second-card">
              <div className="author-info">
                <h3>Автор</h3>
                <p>{firmware.author || 'Не указан'}</p>
              </div>
            </div>

            <div className="content-card detailed firmware-second-card">
              <div className="file-info">
                <h3>Информация о файле</h3>
                <p>Размер: {firmware.fileSize} MB</p>
                <p>Имя файла: {firmware.fileName}</p>
                <p>Статус: {firmware.status === 'verified' ? 'Проверено' : 'На проверке'}</p>
                <p>Обновлено: {firmware.lastUpdated.toLocaleDateString()}</p>
              </div>
            </div>

            {firmware.recommendedTuningTools && firmware.recommendedTuningTools.length > 0 && (
              <div className="content-card detailed firmware-second-card">
                <div className="tools-info">
                  <h3>Рекомендуемые инструменты</h3>
                  <ul>
                    {firmware.recommendedTuningTools.map((tool, index) => (
                      <li key={index}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {firmware.knownIssues && (
              <div className="content-card detailed firmware-second-card">
                <div className="known-issues">
                  <h3>Известные проблемы</h3>
                  <p>{firmware.knownIssues}</p>
                </div>
              </div>
            )}

            {firmware.installationInstructions && (
              <div className="content-card detailed firmware-second-card">
                <div className="installation-info">
                  <h3>Инструкция по установке</h3>
                  <p>{firmware.installationInstructions}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirmwareDetail;