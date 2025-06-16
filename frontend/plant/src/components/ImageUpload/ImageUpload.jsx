import React, { useState, useCallback } from 'react';
import DropZone from './DropZone';
import ImagePreview from './ImagePreview';
import './ImageUpload.css';

const ImageUpload = ({ 
  onImageSelect, 
  onImageRemove, 
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  multiple = false,
  disabled = false 
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = (file) => {
    if (!acceptedTypes.includes(file.type)) {
      return `Please select a valid image file (${acceptedTypes.join(', ')})`;
    }
    
    if (file.size > maxFileSize) {
      return `File size must be less than ${Math.round(maxFileSize / (1024 * 1024))}MB`;
    }
    
    return null;
  };

  const handleImageSelect = useCallback(async (files) => {
    setUploadError(null);
    setIsUploading(true);

    try {
      const validFiles = [];
      const errors = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const error = validateFile(file);
        
        if (error) {
          errors.push(`${file.name}: ${error}`);
        } else {
          // Create preview URL
          const previewUrl = URL.createObjectURL(file);
          validFiles.push({
            file,
            id: `${Date.now()}-${i}`,
            name: file.name,
            size: file.size,
            previewUrl,
            uploadProgress: 0
          });
        }
      }

      if (errors.length > 0) {
        setUploadError(errors.join('\n'));
      }

      if (validFiles.length > 0) {
        const newImages = multiple 
          ? [...selectedImages, ...validFiles]
          : validFiles.slice(0, 1);
        
        setSelectedImages(newImages);
        
        // Notify parent component
        if (onImageSelect) {
          onImageSelect(multiple ? newImages : newImages[0]);
        }
      }
    } catch (error) {
      setUploadError('An error occurred while processing the image(s)');
      console.error('Image upload error:', error);
    } finally {
      setIsUploading(false);
    }
  }, [selectedImages, multiple, maxFileSize, acceptedTypes, onImageSelect]);

  const handleImageRemove = useCallback((imageId) => {
    setSelectedImages(prev => {
      const updated = prev.filter(img => img.id !== imageId);
      
      // Clean up preview URL
      const removedImage = prev.find(img => img.id === imageId);
      if (removedImage?.previewUrl) {
        URL.revokeObjectURL(removedImage.previewUrl);
      }
      
      // Notify parent component
      if (onImageRemove) {
        onImageRemove(imageId, updated);
      }
      
      return updated;
    });
    
    setUploadError(null);
  }, [onImageRemove]);

  const handleClearAll = () => {
    selectedImages.forEach(img => {
      if (img.previewUrl) {
        URL.revokeObjectURL(img.previewUrl);
      }
    });
    
    setSelectedImages([]);
    setUploadError(null);
    
    if (onImageRemove) {
      onImageRemove(null, []);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="image-upload">
      <div className="image-upload__header">
        <h3 className="image-upload__title">
          Upload Plant Images
        </h3>
        <p className="image-upload__description">
          Upload clear images of your plant for accurate disease detection
        </p>
      </div>

      {/* Upload Guidelines */}
      <div className="image-upload__guidelines">
        <h4 className="image-upload__guidelines-title">Photo Guidelines:</h4>
        <ul className="image-upload__guidelines-list">
          <li>Use good lighting and focus on affected areas</li>
          <li>Include close-up shots of leaves, stems, or fruits</li>
          <li>Avoid blurry or dark images</li>
          <li>Maximum file size: {Math.round(maxFileSize / (1024 * 1024))}MB</li>
        </ul>
      </div>

      {/* Drop Zone */}
      {(!multiple && selectedImages.length === 0) || (multiple && selectedImages.length < 5) ? (
        <DropZone
          onFilesSelected={handleImageSelect}
          acceptedTypes={acceptedTypes}
          multiple={multiple}
          disabled={disabled || isUploading}
          isUploading={isUploading}
        />
      ) : null}

      {/* Error Message */}
      {uploadError && (
        <div className="image-upload__error">
          <div className="image-upload__error-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="image-upload__error-content">
            <h4>Upload Error</h4>
            <pre>{uploadError}</pre>
          </div>
        </div>
      )}

      {/* Image Previews */}
      {selectedImages.length > 0 && (
        <div className="image-upload__previews">
          <div className="image-upload__previews-header">
            <h4 className="image-upload__previews-title">
              Selected Images ({selectedImages.length})
            </h4>
            {multiple && selectedImages.length > 1 && (
              <button
                className="image-upload__clear-button"
                onClick={handleClearAll}
                disabled={disabled}
              >
                Clear All
              </button>
            )}
          </div>
          
          <div className="image-upload__previews-grid">
            {selectedImages.map((image) => (
              <ImagePreview
                key={image.id}
                image={image}
                onRemove={() => handleImageRemove(image.id)}
                disabled={disabled}
                formatFileSize={formatFileSize}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upload Stats */}
      {selectedImages.length > 0 && (
        <div className="image-upload__stats">
          <div className="image-upload__stat">
            <span className="image-upload__stat-label">Total Images:</span>
            <span className="image-upload__stat-value">{selectedImages.length}</span>
          </div>
          <div className="image-upload__stat">
            <span className="image-upload__stat-label">Total Size:</span>
            <span className="image-upload__stat-value">
              {formatFileSize(selectedImages.reduce((total, img) => total + img.size, 0))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
