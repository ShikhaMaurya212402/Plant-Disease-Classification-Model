import React, { useState, useEffect } from 'react';
import DiseaseCard from './DiseaseCard';
import TreatmentInfo from './TreatmentInfo';
import Loader from '../common/Loader';
import './ClassificationResult.css';

const ClassificationResult = ({ 
  results, 
  isLoading, 
  error, 
  imageData,
  onRetry,
  confidence = 0 
}) => {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [showTreatments, setShowTreatments] = useState(false);

  useEffect(() => {
    if (results && results.length > 0) {
      setSelectedDisease(results[0]);
    }
  }, [results]);

  if (isLoading) {
    return (
      <div className="classification-result classification-result--loading">
        <Loader 
          type="plant" 
          size="large" 
          text="Analyzing your plant image..." 
        />
        <div className="classification-result__loading-steps">
          <div className="loading-step loading-step--active">
            <span className="loading-step__icon">🔍</span>
            <span className="loading-step__text">Scanning image</span>
          </div>
          <div className="loading-step">
            <span className="loading-step__icon">🧠</span>
            <span className="loading-step__text">AI Analysis</span>
          </div>
          <div className="loading-step">
            <span className="loading-step__icon">📊</span>
            <span className="loading-step__text">Generating results</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="classification-result classification-result--error">
        <div className="classification-result__error">
          <div className="classification-result__error-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3 className="classification-result__error-title">Analysis Failed</h3>
          <p className="classification-result__error-message">{error}</p>
          {onRetry && (
            <button 
              className="classification-result__retry-button"
              onClick={onRetry}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="classification-result classification-result--empty">
        <div className="classification-result__empty">
          <div className="classification-result__empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
          <h3 className="classification-result__empty-title">No Disease Detected</h3>
          <p className="classification-result__empty-message">
            Great news! Your plant appears to be healthy. No diseases were detected in the uploaded image.
          </p>
          <div className="classification-result__empty-tips">
            <h4>Keep your plant healthy:</h4>
            <ul>
              <li>Continue regular watering schedule</li>
              <li>Ensure adequate sunlight</li>
              <li>Monitor for any changes</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const topResult = results[0];
  const hasMultipleResults = results.length > 1;

  return (
    <div className="classification-result">
      {/* Header */}
      <div className="classification-result__header">
        <h2 className="classification-result__title">
          Disease Classification Results
        </h2>
        <div className="classification-result__confidence">
          <div className="confidence-meter">
            <div className="confidence-meter__label">Confidence</div>
            <div className="confidence-meter__bar">
              <div 
                className="confidence-meter__fill"
                style={{ width: `${topResult.confidence || confidence}%` }}
              ></div>
            </div>
            <div className="confidence-meter__value">
              {Math.round(topResult.confidence || confidence)}%
            </div>
          </div>
        </div>
      </div>

      {/* Image and Primary Result */}
      <div className="classification-result__main">
        {imageData && (
          <div className="classification-result__image">
            <img 
              src={imageData} 
              alt="Analyzed plant" 
              className="classification-result__uploaded-image"
            />
            <div className="classification-result__image-overlay">
              <span className="classification-result__image-label">Analyzed Image</span>
            </div>
          </div>
        )}
        
        <div className="classification-result__primary">
          <DiseaseCard 
            disease={topResult} 
            isPrimary={true}
            onSelect={() => setSelectedDisease(topResult)}
            isSelected={selectedDisease?.id === topResult.id}
          />
        </div>
      </div>

      {/* Additional Results */}
      {hasMultipleResults && (
        <div className="classification-result__alternatives">
          <h3 className="classification-result__alternatives-title">
            Other Possible Conditions
          </h3>
          <div className="classification-result__cards">
            {results.slice(1).map((disease) => (
              <DiseaseCard 
                key={disease.id} 
                disease={disease}
                onSelect={() => setSelectedDisease(disease)}
                isSelected={selectedDisease?.id === disease.id}
                isAlternative={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Treatment Information */}
      {selectedDisease && (
        <div className="classification-result__treatment-section">
          <div className="classification-result__treatment-toggle">
            <button 
              className={`treatment-toggle-button ${showTreatments ? 'treatment-toggle-button--active' : ''}`}
              onClick={() => setShowTreatments(!showTreatments)}
            >
              <span className="treatment-toggle-button__icon">
                {showTreatments ? '📚' : '💊'}
              </span>
              <span className="treatment-toggle-button__text">
                {showTreatments ? 'Hide' : 'View'} Treatment Options
              </span>
              <svg 
                className={`treatment-toggle-button__arrow ${showTreatments ? 'treatment-toggle-button__arrow--up' : ''}`}
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>
          </div>
          
          {showTreatments && (
            <TreatmentInfo 
              disease={selectedDisease}
              treatments={selectedDisease.treatments || []}
            />
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="classification-result__actions">
        <button 
          className="classification-result__action-button classification-result__action-button--secondary"
          onClick={() => window.history.back()}
        >
          Analyze Another Image
        </button>
        <button 
          className="classification-result__action-button classification-result__action-button--primary"
          onClick={() => {
            // Save to history functionality
            console.log('Saving to history...');
          }}
        >
          Save to History
        </button>
      </div>
    </div>
  );
};

export default ClassificationResult;
