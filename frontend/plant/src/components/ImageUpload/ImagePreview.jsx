import React, { useState } from 'react';
import './ImagePreview.css';

const ImagePreview = ({ 
  image, 
  onRemove, 
  disabled = false, 
  formatFileSize,
  showDetails = true,
  size = 'medium' 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (!disabled && onRemove) {
      onRemove(image.id);
    }
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getPreviewClass = () => {
    let classes = 'image-preview';
    classes += ` image-preview--${size}`;
    
    if (disabled) {
      classes += ' image-preview--disabled';
    }
    
    if (hasError) {
      classes += ' image-preview--error';
    }
    
    if (isExpanded) {
      classes += ' image-preview--expanded';
    }
    
    return classes;
  };

  return (
    <>
      <div className={getPreviewClass()}>
        {/* Image Container */}
        <div className="image-preview__image-container" onClick={handleExpand}>
          {isLoading && (
            <div className="image-preview__loader">
              <div className="image-preview__loader-spinner"></div>
            </div>
          )}
          
          {hasError ? (
            <div className="image-preview__error">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              <span>Failed to load</span>
            </div>
          ) : (
            <img
              src={image.previewUrl}
              alt={image.name}
              className="image-preview__image"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
          
          {/* Overlay */}
          <div className="image-preview__overlay">
            <button
              className="image-preview__expand-button"
              onClick={(e) => {
                e.stopPropagation();
                handleExpand();
              }}
              aria-label="View full size"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 9h6v6h-6z"/>
                <path d="M3 3v6h2V5h4V3H3zM3 21h6v-2H5v-4H3v6zM21 3h-6v2h4v4h2V3zM21 21v-6h-2v4h-4v2h6z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Image Details */}
        {showDetails && (
          <div className="image-preview__details">
            <div className="image-preview__info">
              <h4 className="image-preview__name" title={image.name}>
                {image.name.length > 20 ? `${image.name.substring(0, 20)}...` : image.name}
              </h4>
              <p className="image-preview__size">
                {formatFileSize ? formatFileSize(image.size) : `${Math.round(image.size / 1024)} KB`}
              </p>
            </div>
            
            {/* Upload Progress */}
            {image.uploadProgress !== undefined && image.uploadProgress < 100 && (
              <div className="image-preview__progress">
                <div className="image-preview__progress-bar">
                  <div 
                    className="image-preview__progress-fill"
                    style={{ width: `${image.uploadProgress}%` }}
                  ></div>
                </div>
                <span className="image-preview__progress-text">
                  {image.uploadProgress}%
                </span>
              </div>
            )}
          </div>
        )}

        {/* Remove Button */}
        <button
          className="image-preview__remove-button"
          onClick={handleRemove}
          disabled={disabled}
          aria-label="Remove image"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        {/* Success Indicator */}
        {image.uploadProgress === 100 && (
          <div className="image-preview__success">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
        )}
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div className="image-preview__modal" onClick={handleExpand}>
          <div className="image-preview__modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="image-preview__modal-header">
              <h3 className="image-preview__modal-title">{image.name}</h3>
              <button
                className="image-preview__modal-close"
                onClick={handleExpand}
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            <div className="image-preview__modal-image">
              <img src={image.previewUrl} alt={image.name} />
            </div>
            <div className="image-preview__modal-info">
              <p><strong>Size:</strong> {formatFileSize ? formatFileSize(image.size) : `${Math.round(image.size / 1024)} KB`}</p>
              <p><strong>Type:</strong> {image.file?.type || 'Unknown'}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreview;
