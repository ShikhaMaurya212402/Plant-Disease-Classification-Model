import React, { useRef, useState, useCallback } from 'react';
import './DropZone.css';

const DropZone = ({ 
  onFilesSelected, 
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  multiple = false,
  disabled = false,
  isUploading = false,
  maxFiles = 5
}) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragCounter(prev => prev + 1);
    
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragCounter(prev => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        setIsDragOver(false);
      }
      return newCounter;
    });
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragOver(false);
    setDragCounter(0);
    
    if (disabled || isUploading) return;
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => 
      acceptedTypes.includes(file.type)
    );
    
    if (imageFiles.length > 0) {
      const filesToProcess = multiple 
        ? imageFiles.slice(0, maxFiles)
        : [imageFiles[0]];
      
      onFilesSelected(filesToProcess);
    }
  }, [disabled, isUploading, acceptedTypes, multiple, maxFiles, onFilesSelected]);

  const handleFileInputChange = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  }, [onFilesSelected]);

  const handleClick = () => {
    if (!disabled && !isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getDropZoneClass = () => {
    let classes = 'drop-zone';
    
    if (isDragOver) {
      classes += ' drop-zone--drag-over';
    }
    
    if (disabled) {
      classes += ' drop-zone--disabled';
    }
    
    if (isUploading) {
      classes += ' drop-zone--uploading';
    }
    
    return classes;
  };

  const formatAcceptedTypes = () => {
    return acceptedTypes
      .map(type => type.split('/')[1].toUpperCase())
      .join(', ');
  };

  return (
    <div
      className={getDropZoneClass()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Upload image files"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="drop-zone__input"
        accept={acceptedTypes.join(',')}
        multiple={multiple}
        onChange={handleFileInputChange}
        disabled={disabled}
      />
      
      <div className="drop-zone__content">
        {isUploading ? (
          <>
            <div className="drop-zone__icon drop-zone__icon--loading">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                <path d="M22 12c0-5.52-4.48-10-10-10" stroke="currentColor" strokeWidth="2">
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from="0 12 12"
                    to="360 12 12"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>
            <h3 className="drop-zone__title">Uploading...</h3>
            <p className="drop-zone__description">Please wait while we process your images</p>
          </>
        ) : (
          <>
            <div className="drop-zone__icon">
              {isDragOver ? (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                </svg>
              ) : (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21,15 16,10 5,21"/>
                </svg>
              )}
            </div>
            
            <h3 className="drop-zone__title">
              {isDragOver ? 'Drop images here' : 'Upload Plant Images'}
            </h3>
            
            <p className="drop-zone__description">
              {isDragOver ? (
                'Release to upload your images'
              ) : (
                <>
                  Drag and drop your images here, or{' '}
                  <span className="drop-zone__browse">browse files</span>
                </>
              )}
            </p>
            
            <div className="drop-zone__info">
              <div className="drop-zone__info-item">
                <span className="drop-zone__info-label">Supported formats:</span>
                <span className="drop-zone__info-value">{formatAcceptedTypes()}</span>
              </div>
              {multiple && (
                <div className="drop-zone__info-item">
                  <span className="drop-zone__info-label">Max files:</span>
                  <span className="drop-zone__info-value">{maxFiles}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
      {/* Upload suggestions */}
      <div className="drop-zone__tips">
        <h4 className="drop-zone__tips-title">💡 Tips for better results:</h4>
        <ul className="drop-zone__tips-list">
          <li>Use well-lit, clear images</li>
          <li>Focus on affected plant areas</li>
          <li>Include different angles if possible</li>
        </ul>
      </div>
    </div>
  );
};

export default DropZone;
