import React, { useState } from 'react';
import './DiseaseCard.css';

const DiseaseCard = ({ 
  disease, 
  isPrimary = false, 
  isAlternative = false,
  isSelected = false,
  onSelect,
  showDetails = true 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low':
      case 'mild':
        return '#4CAF50';
      case 'medium':
      case 'moderate':
        return '#FF9800';
      case 'high':
      case 'severe':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low':
      case 'mild':
        return '🟢';
      case 'medium':
      case 'moderate':
        return '🟡';
      case 'high':
      case 'severe':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const getCardClass = () => {
    let classes = 'disease-card';
    
    if (isPrimary) {
      classes += ' disease-card--primary';
    }
    
    if (isAlternative) {
      classes += ' disease-card--alternative';
    }
    
    if (isSelected) {
      classes += ' disease-card--selected';
    }
    
    return classes;
  };

  return (
    <div 
      className={getCardClass()}
      onClick={onSelect}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
    >
      {/* Card Header */}
      <div className="disease-card__header">
        <div className="disease-card__title-section">
          <h3 className="disease-card__name">{disease.name}</h3>
          {disease.scientificName && (
            <p className="disease-card__scientific-name">
              <em>{disease.scientificName}</em>
            </p>
          )}
        </div>
        
        {disease.confidence && (
          <div className="disease-card__confidence">
            <span className="disease-card__confidence-value">
              {Math.round(disease.confidence)}%
            </span>
            <span className="disease-card__confidence-label">match</span>
          </div>
        )}
      </div>

      {/* Disease Image */}
      {disease.imageUrl && !imageError && (
        <div className="disease-card__image-container">
          <img
            src={disease.imageUrl}
            alt={`${disease.name} symptoms`}
            className="disease-card__image"
            loading="lazy"
            onError={handleImageError}
          />
          <div className="disease-card__image-overlay">
            <span className="disease-card__image-label">Reference Image</span>
          </div>
        </div>
      )}

      {/* Card Body */}
      <div className="disease-card__body">
        {/* Severity Indicator */}
        {disease.severity && (
          <div className="disease-card__severity">
            <span className="disease-card__severity-icon">
              {getSeverityIcon(disease.severity)}
            </span>
            <span className="disease-card__severity-label">Severity:</span>
            <span 
              className="disease-card__severity-value"
              style={{ color: getSeverityColor(disease.severity) }}
            >
              {disease.severity}
            </span>
          </div>
        )}

        {/* Description */}
        <p className="disease-card__description">
          {isExpanded 
            ? disease.description 
            : disease.description?.length > 120 
              ? `${disease.description.substring(0, 120)}...`
              : disease.description
          }
          {disease.description?.length > 120 && (
            <button
              className="disease-card__expand-button"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>

        {/* Additional Details */}
        {showDetails && (
          <div className="disease-card__details">
            {disease.causedBy && (
              <div className="disease-card__detail">
                <span className="disease-card__detail-label">Caused by:</span>
                <span className="disease-card__detail-value">{disease.causedBy}</span>
              </div>
            )}
            
            {disease.affectedParts && disease.affectedParts.length > 0 && (
              <div className="disease-card__detail">
                <span className="disease-card__detail-label">Affects:</span>
                <div className="disease-card__tags">
                  {disease.affectedParts.map((part, index) => (
                    <span key={index} className="disease-card__tag">
                      {part}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {disease.symptoms && disease.symptoms.length > 0 && (
              <div className="disease-card__detail">
                <span className="disease-card__detail-label">Key symptoms:</span>
                <ul className="disease-card__symptoms">
                  {disease.symptoms.slice(0, 3).map((symptom, index) => (
                    <li key={index} className="disease-card__symptom">
                      {symptom}
                    </li>
                  ))}
                  {disease.symptoms.length > 3 && (
                    <li className="disease-card__symptom disease-card__symptom--more">
                      +{disease.symptoms.length - 3} more
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Prevention Tips */}
        {disease.prevention && (
          <div className="disease-card__prevention">
            <div className="disease-card__prevention-header">
              <span className="disease-card__prevention-icon">🛡️</span>
              <span className="disease-card__prevention-title">Prevention</span>
            </div>
            <p className="disease-card__prevention-text">{disease.prevention}</p>
          </div>
        )}
      </div>

      {/* Card Footer */}
      {isPrimary && (
        <div className="disease-card__footer">
          <div className="disease-card__primary-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Most Likely Match
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseCard;
