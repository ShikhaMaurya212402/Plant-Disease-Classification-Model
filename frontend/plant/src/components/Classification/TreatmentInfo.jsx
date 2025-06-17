import React, { useState } from 'react';
import './TreatmentInfo.css';

const TreatmentInfo = ({ disease, treatments = [] }) => {
  const [activeTab, setActiveTab] = useState('treatments');
  const [expandedTreatment, setExpandedTreatment] = useState(null);

  const tabs = [
    { id: 'treatments', label: 'Treatments', icon: '💊' },
    { id: 'prevention', label: 'Prevention', icon: '🛡️' },
    { id: 'care', label: 'Plant Care', icon: '🌱' }
  ];

  const renderTreatments = () => {
    if (!treatments || treatments.length === 0) {
      return (
        <div className="treatment-info__empty">
          <div className="treatment-info__empty-icon">💡</div>
          <h4>No specific treatments available</h4>
          <p>Consider consulting with a plant specialist for professional advice.</p>
        </div>
      );
    }

    return (
      <div className="treatment-info__treatments">
        {treatments.map((treatment, index) => (
          <div 
            key={index} 
            className={`treatment-info__treatment ${expandedTreatment === index ? 'treatment-info__treatment--expanded' : ''}`}
          >
            <div 
              className="treatment-info__treatment-header"
              onClick={() => setExpandedTreatment(expandedTreatment === index ? null : index)}
            >
              <div className="treatment-info__treatment-title">
                <span className="treatment-info__treatment-icon">
                  {treatment.type === 'chemical' ? '🧪' : 
                   treatment.type === 'organic' ? '🌿' : 
                   treatment.type === 'biological' ? '🦠' : '💊'}
                </span>
                <h4 className="treatment-info__treatment-name">{treatment.name}</h4>
                <span className={`treatment-info__treatment-type treatment-info__treatment-type--${treatment.type}`}>
                  {treatment.type}
                </span>
              </div>
              <svg 
                className={`treatment-info__expand-arrow ${expandedTreatment === index ? 'treatment-info__expand-arrow--up' : ''}`}
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>

            <div className="treatment-info__treatment-content">
              <p className="treatment-info__treatment-description">
                {treatment.description}
              </p>

              {expandedTreatment === index && (
                <div className="treatment-info__treatment-details">
                  {treatment.dosage && (
                    <div className="treatment-detail">
                      <span className="treatment-detail__label">Dosage:</span>
                      <span className="treatment-detail__value">{treatment.dosage}</span>
                    </div>
                  )}

                  {treatment.frequency && (
                    <div className="treatment-detail">
                      <span className="treatment-detail__label">Frequency:</span>
                      <span className="treatment-detail__value">{treatment.frequency}</span>
                    </div>
                  )}

                  {treatment.duration && (
                    <div className="treatment-detail">
                      <span className="treatment-detail__label">Duration:</span>
                      <span className="treatment-detail__value">{treatment.duration}</span>
                    </div>
                  )}

                  {treatment.application && (
                    <div className="treatment-detail">
                      <span className="treatment-detail__label">Application:</span>
                      <span className="treatment-detail__value">{treatment.application}</span>
                    </div>
                  )}

                  {treatment.precautions && treatment.precautions.length > 0 && (
                    <div className="treatment-detail">
                      <span className="treatment-detail__label">Precautions:</span>
                      <ul className="treatment-detail__list">
                        {treatment.precautions.map((precaution, i) => (
                          <li key={i}>{precaution}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {treatment.effectiveness && (
                    <div className="treatment-info__effectiveness">
                      <span className="treatment-info__effectiveness-label">Effectiveness:</span>
                      <div className="treatment-info__effectiveness-bar">
                        <div 
                          className="treatment-info__effectiveness-fill"
                          style={{ width: `${treatment.effectiveness}%` }}
                        ></div>
                      </div>
                      <span className="treatment-info__effectiveness-value">
                        {treatment.effectiveness}%
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderPrevention = () => (
    <div className="treatment-info__prevention">
      <div className="prevention-tips">
        <h4 className="prevention-tips__title">🛡️ Prevention Tips</h4>
        <div className="prevention-tips__grid">
          <div className="prevention-tip">
            <div className="prevention-tip__icon">💧</div>
            <h5>Proper Watering</h5>
            <p>Water at soil level, avoid wetting leaves</p>
          </div>
          <div className="prevention-tip">
            <div className="prevention-tip__icon">🌞</div>
            <h5>Good Air Circulation</h5>
            <p>Ensure adequate spacing between plants</p>
          </div>
          <div className="prevention-tip">
            <div className="prevention-tip__icon">🧹</div>
            <h5>Garden Hygiene</h5>
            <p>Remove infected plant debris regularly</p>
          </div>
          <div className="prevention-tip">
            <div className="prevention-tip__icon">🌡️</div>
            <h5>Environmental Control</h5>
            <p>Maintain optimal temperature and humidity</p>
          </div>
        </div>
      </div>

      {disease?.preventionTips && (
        <div className="specific-prevention">
          <h4 className="specific-prevention__title">
            Specific Prevention for {disease.name}
          </h4>
          <ul className="specific-prevention__list">
            {disease.preventionTips.map((tip, index) => (
              <li key={index} className="specific-prevention__item">
                <span className="specific-prevention__bullet">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderPlantCare = () => (
    <div className="treatment-info__care">
      <div className="care-guidelines">
        <h4 className="care-guidelines__title">🌱 General Plant Care</h4>
        
        <div className="care-section">
          <h5 className="care-section__title">Watering Schedule</h5>
          <div className="care-schedule">
            <div className="care-schedule__item">
              <span className="care-schedule__icon">🌅</span>
              <span className="care-schedule__time">Morning</span>
              <span className="care-schedule__action">Check soil moisture</span>
            </div>
            <div className="care-schedule__item">
              <span className="care-schedule__icon">☀️</span>
              <span className="care-schedule__time">Midday</span>
              <span className="care-schedule__action">Avoid watering in direct sun</span>
            </div>
            <div className="care-schedule__item">
              <span className="care-schedule__icon">🌆</span>
              <span className="care-schedule__time">Evening</span>
              <span className="care-schedule__action">Water if needed</span>
            </div>
          </div>
        </div>

        <div className="care-section">
          <h5 className="care-section__title">Nutritional Support</h5>
          <div className="nutrition-info">
            <div className="nutrition-item">
              <span className="nutrition-item__icon">🍃</span>
              <span className="nutrition-item__nutrient">Nitrogen (N)</span>
              <span className="nutrition-item__purpose">Leaf growth</span>
            </div>
            <div className="nutrition-item">
              <span className="nutrition-item__icon">🌸</span>
              <span className="nutrition-item__nutrient">Phosphorus (P)</span>
              <span className="nutrition-item__purpose">Root & flower development</span>
            </div>
            <div className="nutrition-item">
              <span className="nutrition-item__icon">💪</span>
              <span className="nutrition-item__nutrient">Potassium (K)</span>
              <span className="nutrition-item__purpose">Disease resistance</span>
            </div>
          </div>
        </div>

        <div className="care-section">
          <h5 className="care-section__title">Monitoring Checklist</h5>
          <div className="monitoring-checklist">
            <label className="checklist-item">
              <input type="checkbox" />
              <span className="checklist-item__text">Check for new symptoms weekly</span>
            </label>
            <label className="checklist-item">
              <input type="checkbox" />
              <span className="checklist-item__text">Monitor soil moisture daily</span>
            </label>
            <label className="checklist-item">
              <input type="checkbox" />
              <span className="checklist-item__text">Inspect leaves for pests</span>
            </label>
            <label className="checklist-item">
              <input type="checkbox" />
              <span className="checklist-item__text">Remove dead or infected parts</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  if (!disease && (!treatments || treatments.length === 0)) {
    return (
      <div className="treatment-info__empty">
        <div className="treatment-info__empty-icon">📋</div>
        <h3>No treatment information available</h3>
        <p>Select a disease from the classification results to view treatment options.</p>
      </div>
    );
  }

  return (
    <div className="treatment-info">
      <div className="treatment-info__header">
        <h2 className="treatment-info__title">
          Treatment Information
          {disease && <span className="treatment-info__disease-name">for {disease.name}</span>}
        </h2>
        
        <div className="treatment-info__tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`treatment-info__tab ${activeTab === tab.id ? 'treatment-info__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="treatment-info__tab-icon">{tab.icon}</span>
              <span className="treatment-info__tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="treatment-info__content">
        {activeTab === 'treatments' && renderTreatments()}
        {activeTab === 'prevention' && renderPrevention()}
        {activeTab === 'care' && renderPlantCare()}
      </div>

      <div className="treatment-info__disclaimer">
        <div className="disclaimer-icon">⚠️</div>
        <div className="disclaimer-content">
          <h4>Important Disclaimer</h4>
          <p>
            This information is for educational purposes only. Always consult with agricultural 
            experts or plant pathologists for professional diagnosis and treatment recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TreatmentInfo;
