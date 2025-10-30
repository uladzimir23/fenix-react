import React from 'react';
import { FirmwareFile } from '../api/types/firmware';
import './FirmwareCard.css';

interface FirmwareCardProps {
  firmware: FirmwareFile;
  onDownload: (id: number) => void;
}

const FirmwareCard: React.FC<FirmwareCardProps> = ({ firmware, onDownload }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { text: string; class: string } } = {
      verified: { text: 'Проверено', class: 'status-verified' },
      pending: { text: 'На проверке', class: 'status-pending' },
      rejected: { text: 'Отклонено', class: 'status-rejected' },
    };
    
    const config = statusConfig[status] || { text: status, class: 'status-unknown' };
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  return (
    <div className="firmware-card">
      <div className="card-header">
        <h3>{firmware.name}</h3>
        <div className="card-meta">
          <span className="version">v{firmware.version}</span>
          {getStatusBadge(firmware.status)}
        </div>
      </div>
      
      <div className="card-content">
        <p className="description">{firmware.description}</p>
        
        <div className="specs-grid">
          <div className="spec-item">
            <span className="spec-label">Авто:</span>
            <span className="spec-value">{firmware.brand} {firmware.model}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Двигатель:</span>
            <span className="spec-value">{firmware.engine}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Категория:</span>
            <span className="spec-value">{firmware.category}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Топливо:</span>
            <span className="spec-value">{firmware.fuelType}</span>
          </div>
        </div>
        
        {firmware.horsepowerGain && firmware.torqueGain && (
          <div className="performance-gains">
            <div className="gain-item">
              <span className="gain-label">+{firmware.horsepowerGain} л.с.</span>
              <span className="gain-description">Мощность</span>
            </div>
            <div className="gain-item">
              <span className="gain-label">+{firmware.torqueGain} Нм</span>
              <span className="gain-description">Крутящий момент</span>
            </div>
          </div>
        )}
        
        <div className="file-info">
          <span className="file-size">{firmware.fileSize} MB</span>
          <span className="downloads">{firmware.downloadCount} скачиваний</span>
          <span className="rating">★ {firmware.rating.toFixed(1)}</span>
        </div>
        
        {firmware.supportedECUs && firmware.supportedECUs.length > 0 && (
          <div className="compatibility">
            <span className="compatibility-label">ЭБУ:</span>
            <div className="ecu-list">
              {firmware.supportedECUs.slice(0, 2).map(ecu => (
                <span key={ecu} className="ecu-tag">{ecu}</span>
              ))}
              {firmware.supportedECUs.length > 2 && (
                <span className="more-tag">+{firmware.supportedECUs.length - 2}</span>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="card-footer">
        <div className="upload-date">Загружено: {formatDate(firmware.uploadDate)}</div>
        <button 
          className="download-btn"
          onClick={() => onDownload(firmware.id)}
          disabled={firmware.status !== 'verified'}
        >
          {firmware.status === 'verified' ? 'Скачать' : 'Недоступно'}
        </button>
      </div>
    </div>
  );
};

export default FirmwareCard;