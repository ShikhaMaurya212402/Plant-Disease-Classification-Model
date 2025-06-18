import React, { useState } from 'react';
import './HistoryItem.css';

const HistoryItem = ({ 
  item, 
  viewMode = 'grid',
  isSelected = false,
  onSelect,
  onView,
  onDelete 
}) => {
  const [imageError, setImageError] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return '#4CAF50';
    if (confidence >= 60) return '#FF9800';
    return '#F44336';
  };

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 80) return 'High';
    if (confidence >= 60) return 'Medium';
    return 'Low';
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

  const handleImageError = () => {
    setImageError(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (showDeleteConfirm) {
      onDelete && onDelete(item.id);
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  const getItemClass = () => {
    let classes = `history-item history-item--${viewMode}`;
    
    if (isSelected) {
      classes += ' history-item--selected';
    }
    
    if (item.confidence <= 50) {
      classes += ' history-item--low-confidence';
    }
    
    return classes;
  };

  return (
    <div className={getItemClass()} onClick={onView}>
      {/* Selection Checkbox */}
      <div className="history-item__select" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="history-item__checkbox"
        />
      </div>

      {/* Image */}
      <div className="history-item__image-container">
        {imageError ? (
          <div className="history-item__image-error">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <span>Image not available</span>
          </div>
        ) : (
          <img
            src={item.imageUrl}
            alt={`Classification of ${item.diseaseName || 'plant'}`}
            className="history-item__image"
            loading="lazy"
            onError={handleImageError}
          />
        )}
        
        {/* Confidence Badge */}
        <div 
          className="history-item__confidence-badge"
          style={{ backgroundColor: getConfidenceColor(item.confidence) }}
        >
          {Math.round(item.confidence)}%
        </div>

        {/* Overlay for grid view */}
        {viewMode === 'grid' && (
          <div className="history-item__overlay">
            <button
              className="history-item__view-button"
              onClick={(e) => {
                e.stopPropagation();
                onView && onView();
              }}
            >
              View Details
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="history-item__content">
        {/* Header */}
        <div className="history-item__header">
          <div className="history-item__title-section">
            <h3 className="history-item__disease-name">
              {item.diseaseName || 'Healthy Plant'}
            </h3>
            {item.plantType && (
              <p className="history-item__plant-type">{item.plantType}</p>
            )}
          </div>
          
          {viewMode === 'list' && (
            <div className="history-item__confidence-info">
              <div className="confidence-meter-small">
                <div 
                  className="confidence-meter-small__fill"
                  style={{ 
                    width: `${item.confidence}%`,
                    backgroundColor: getConfidenceColor(item.confidence)
                  }}
                ></div>
              </div>
              <span className="confidence-label">
                {getConfidenceLabel(item.confidence)}
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="history-item__details">
          {item.severity && (
            <div className="history-item__detail">
              <span className="history-item__detail-label">Severity:</span>
              <span 
                className="history-item__detail-value history-item__severity"
                style={{ color: getSeverityColor(item.severity) }}
              >
                {item.severity}
              </span>
            </div>
          )}

          {item.affectedParts && item.affectedParts.length > 0 && (
            <div className="history-item__detail">
              <span className="history-item__detail-label">Affected:</span>
              <div className="history-item__tags">
                {item.affectedParts.slice(0, 2).map((part, index) => (
                  <span key={index} className="history-item__tag">
                    {part}
                  </span>
                ))}
                {item.affectedParts.length > 2 && (
                  <span className="history-item__tag history-item__tag--more">
                    +{item.affectedParts.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}

          {viewMode === 'list' && item.description && (
            <p className="history-item__description">
              {item.description.length > 100 
                ? `${item.description.substring(0, 100)}...`
                : item.description
              }
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="history-item__footer">
          <div className="history-item__timestamp">
            <svg className="history-item__timestamp-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="history-item__date">{formatDate(item.createdAt)}</span>
            <span className="history-item__time">{formatTime(item.createdAt)}</span>
          </div>

          <div className="history-item__actions">
            {viewMode === 'list' && (
              <button
                className="history-item__action-button history-item__action-button--view"
                onClick={(e) => {
                  e.stopPropagation();
                  onView && onView();
                }}
                title="View details"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
            )}

            <button
              className={`history-item__action-button ${
                showDeleteConfirm 
                  ? 'history-item__action-button--confirm' 
                  : 'history-item__action-button--delete'
              }`}
              onClick={handleDelete}
              title={showDeleteConfirm ? 'Confirm delete' : 'Delete item'}
            >
              {showDeleteConfirm ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              )}
            </button>

            {showDeleteConfirm && (
              <button
                className="history-item__action-button history-item__action-button--cancel"
                onClick={handleCancelDelete}
                title="Cancel delete"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Treatment indicator */}
        {item.hasRecommendations && (
          <div className="history-item__treatment-indicator">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 11H7v3h2v-3zm4 0h-2v3h2v-3zm4 0h-2v3h2v-3zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            </svg>
            <span>Treatment available</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryItem;
