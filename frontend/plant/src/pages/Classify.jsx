import React, { useState, useCallback } from 'react';
import ImageUpload from '../components/ImageUpload/ImageUpload';
import ClassificationResult from '../components/Classification/ClassificationResult';
import Loader from '../components/common/Loader';
import './Classify.css';

const Classify = () => {
  const [currentStep, setCurrentStep] = useState('upload'); // upload, analyzing, results
  const [selectedImages, setSelectedImages] = useState([]);
  const [classificationResults, setClassificationResults] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Mock classification service
  const classifyImage = async (imageFile) => {
    // Simulate API call with progress
    setIsAnalyzing(true);
    setAnalysisError(null);
    setCurrentStep('analyzing');
    
    try {
      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setAnalysisProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Mock API response
      const mockResults = [
        {
          id: '1',
          name: 'Tomato Late Blight',
          scientificName: 'Phytophthora infestans',
          confidence: 89,
          severity: 'High',
          description: 'Late blight is a serious disease that affects tomato plants, causing dark lesions on leaves and stems.',
          causedBy: 'Fungal pathogen',
          affectedParts: ['Leaves', 'Stems', 'Fruits'],
          symptoms: [
            'Dark brown to black lesions on leaves',
            'White fuzzy growth on leaf undersides',
            'Yellowing of infected areas',
            'Rapid spread in humid conditions'
          ],
          prevention: 'Ensure good air circulation and avoid overhead watering',
          imageUrl: '/images/tomato-late-blight.jpg',
          treatments: [
            {
              name: 'Copper-based Fungicide',
              type: 'chemical',
              description: 'Apply copper sulfate solution to affected areas',
              dosage: '2-3 grams per liter of water',
              frequency: 'Every 7-10 days',
              duration: '3-4 weeks',
              application: 'Spray on leaves and stems',
              precautions: ['Wear protective gear', 'Apply in cool weather'],
              effectiveness: 85
            },
            {
              name: 'Neem Oil Treatment',
              type: 'organic',
              description: 'Natural fungicide with systemic properties',
              dosage: '5ml per liter of water',
              frequency: 'Every 5-7 days',
              duration: '2-3 weeks',
              application: 'Foliar spray',
              precautions: ['Apply in evening', 'Test on small area first'],
              effectiveness: 70
            }
          ]
        },
        {
          id: '2',
          name: 'Bacterial Leaf Spot',
          scientificName: 'Xanthomonas campestris',
          confidence: 65,
          severity: 'Medium',
          description: 'Bacterial infection causing small, dark spots on leaves.',
          causedBy: 'Bacterial pathogen',
          affectedParts: ['Leaves'],
          symptoms: ['Small dark spots', 'Yellow halos around spots'],
          prevention: 'Use disease-free seeds and avoid overhead irrigation',
          imageUrl: '/images/bacterial-leaf-spot.jpg',
          treatments: [
            {
              name: 'Copper Hydroxide',
              type: 'chemical',
              description: 'Bactericide for leaf spot control',
              dosage: '2 grams per liter',
              frequency: 'Weekly',
              duration: '2 weeks',
              application: 'Foliar spray',
              precautions: ['Use before flowering'],
              effectiveness: 75
            }
          ]
        }
      ];

      setClassificationResults(mockResults);
      setCurrentStep('results');
    } catch (error) {
      setAnalysisError('Failed to analyze the image. Please try again.');
      setCurrentStep('upload');
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  const handleImageSelect = useCallback(async (images) => {
    const imageArray = Array.isArray(images) ? images : [images];
    setSelectedImages(imageArray);
    
    if (imageArray.length > 0) {
      await classifyImage(imageArray[0].file);
    }
  }, []);

  const handleImageRemove = useCallback((imageId, remainingImages) => {
    setSelectedImages(remainingImages || []);
    if (!remainingImages || remainingImages.length === 0) {
      setClassificationResults(null);
      setCurrentStep('upload');
    }
  }, []);

  const handleRetryAnalysis = useCallback(() => {
    if (selectedImages.length > 0) {
      classifyImage(selectedImages[0].file);
    }
  }, [selectedImages]);

  const handleStartNew = () => {
    setSelectedImages([]);
    setClassificationResults(null);
    setAnalysisError(null);
    setCurrentStep('upload');
  };

  const renderStepIndicator = () => (
    <div className="classify__steps">
      <div className="steps__container">
        <div className={`step ${currentStep === 'upload' ? 'step--active' : currentStep !== 'upload' ? 'step--completed' : ''}`}>
          <div className="step__icon">
            {currentStep === 'upload' ? '📸' : '✅'}
          </div>
          <span className="step__label">Upload Image</span>
        </div>
        
        <div className="step__connector">
          <div className={`connector__line ${currentStep !== 'upload' ? 'connector__line--active' : ''}`}></div>
        </div>
        
        <div className={`step ${currentStep === 'analyzing' ? 'step--active' : currentStep === 'results' ? 'step--completed' : ''}`}>
          <div className="step__icon">
            {currentStep === 'analyzing' ? '🔄' : currentStep === 'results' ? '✅' : '🧠'}
          </div>
          <span className="step__label">AI Analysis</span>
        </div>
        
        <div className="step__connector">
          <div className={`connector__line ${currentStep === 'results' ? 'connector__line--active' : ''}`}></div>
        </div>
        
        <div className={`step ${currentStep === 'results' ? 'step--active' : ''}`}>
          <div className="step__icon">📊</div>
          <span className="step__label">Results</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="classify">
      <div className="classify__container">
        {/* Header */}
        <div className="classify__header">
          <h1 className="classify__title">Plant Disease Classification</h1>
          <p className="classify__subtitle">
            Upload an image of your plant to get instant disease identification and treatment recommendations
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Main Content */}
        <div className="classify__content">
          {currentStep === 'upload' && (
            <div className="classify__upload-section">
              <ImageUpload
                onImageSelect={handleImageSelect}
                onImageRemove={handleImageRemove}
                maxFileSize={10 * 1024 * 1024} // 10MB
                acceptedTypes={['image/jpeg', 'image/jpg', 'image/png', 'image/webp']}
                multiple={false}
                disabled={isAnalyzing}
              />
              
              {/* Tips Section */}
              <div className="classify__tips">
                <h3 className="tips__title">📷 Photography Tips for Best Results</h3>
                <div className="tips__grid">
                  <div className="tip__item">
                    <div className="tip__icon">☀️</div>
                    <h4>Good Lighting</h4>
                    <p>Take photos in natural daylight for clear, well-lit images</p>
                  </div>
                  <div className="tip__item">
                    <div className="tip__icon">🔍</div>
                    <h4>Focus on Symptoms</h4>
                    <p>Capture close-up shots of affected leaves, stems, or fruits</p>
                  </div>
                  <div className="tip__item">
                    <div className="tip__icon">📐</div>
                    <h4>Multiple Angles</h4>
                    <p>Include different perspectives of the affected areas</p>
                  </div>
                  <div className="tip__item">
                    <div className="tip__icon">🚫</div>
                    <h4>Avoid Blur</h4>
                    <p>Ensure images are sharp and not blurry or out of focus</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'analyzing' && (
            <div className="classify__analysis-section">
              <div className="analysis__container">
                <Loader 
                  type="plant" 
                  size="large" 
                  text="Analyzing your plant image..." 
                />
                
                <div className="analysis__progress">
                  <div className="progress__bar">
                    <div 
                      className="progress__fill"
                      style={{ width: `${analysisProgress}%` }}
                    ></div>
                  </div>
                  <span className="progress__text">{analysisProgress}% Complete</span>
                </div>

                <div className="analysis__steps">
                  <div className={`analysis__step ${analysisProgress >= 25 ? 'analysis__step--active' : ''}`}>
                    <span className="analysis__step-icon">🔍</span>
                    <span className="analysis__step-text">Processing image</span>
                  </div>
                  <div className={`analysis__step ${analysisProgress >= 50 ? 'analysis__step--active' : ''}`}>
                    <span className="analysis__step-icon">🧠</span>
                    <span className="analysis__step-text">Running AI analysis</span>
                  </div>
                  <div className={`analysis__step ${analysisProgress >= 75 ? 'analysis__step--active' : ''}`}>
                    <span className="analysis__step-icon">🔬</span>
                    <span className="analysis__step-text">Identifying diseases</span>
                  </div>
                  <div className={`analysis__step ${analysisProgress >= 100 ? 'analysis__step--active' : ''}`}>
                    <span className="analysis__step-icon">📋</span>
                    <span className="analysis__step-text">Generating report</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'results' && (
            <div className="classify__results-section">
              <ClassificationResult
                results={classificationResults}
                isLoading={isAnalyzing}
                error={analysisError}
                imageData={selectedImages[0]?.previewUrl}
                onRetry={handleRetryAnalysis}
                confidence={classificationResults?.[0]?.confidence || 0}
              />
              
              <div className="classify__result-actions">
                <button 
                  className="result-action result-action--secondary"
                  onClick={handleStartNew}
                >
                  Analyze Another Image
                </button>
                <button 
                  className="result-action result-action--primary"
                  onClick={() => {
                    // Save to history functionality
                    console.log('Saving classification to history...');
                  }}
                >
                  Save to History
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="classify__faq">
          <h3 className="faq__title">Frequently Asked Questions</h3>
          <div className="faq__grid">
            <div className="faq__item">
              <h4 className="faq__question">What image formats are supported?</h4>
              <p className="faq__answer">We support JPEG, PNG, and WebP formats up to 10MB in size.</p>
            </div>
            <div className="faq__item">
              <h4 className="faq__question">How accurate is the AI detection?</h4>
              <p className="faq__answer">Our AI model has an average accuracy rate of 94% across common plant diseases.</p>
            </div>
            <div className="faq__item">
              <h4 className="faq__question">Can I classify multiple plants?</h4>
              <p className="faq__answer">Yes, you can analyze multiple images. Each classification is processed individually.</p>
            </div>
            <div className="faq__item">
              <h4 className="faq__question">Are my images stored?</h4>
              <p className="faq__answer">Images are only temporarily stored for analysis and automatically deleted after processing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classify;
