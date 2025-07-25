import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');


  const stats = [
    { number: '100,000+', label: 'Training Images', icon: '📸' },
    { number: '150+', label: 'Disease Types', icon: '🦠' },
    { number: '94%', label: 'Accuracy Rate', icon: '🎯' },
    { number: '50,000+', label: 'Classifications Made', icon: '📊' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🌟' },
    { id: 'technology', label: 'Technology', icon: '⚡' },
    { id: 'team', label: 'Our Team', icon: '👥' },
    { id: 'mission', label: 'Mission', icon: '🎯' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-content">
            <div className="overview-section">
              <h2>About Plant Disease Classifier</h2>
              <p className="overview-text">
                Our AI-powered plant disease classification system is designed to help farmers,
                gardeners, and agricultural professionals quickly identify and treat plant diseases.
                Using cutting-edge machine learning technology, we provide accurate disease detection
                with detailed treatment recommendations.
              </p>

              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-card__icon">{feature.icon}</div>
                    <h3 className="feature-card__title">{feature.title}</h3>
                    <p className="feature-card__description">{feature.description}</p>
                    <ul className="feature-card__details">
                      {feature.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'technology':
        return (
          <div className="tab-content">
            <div className="technology-section">
              <h2>Our Technology</h2>
              <p className="section-intro">
                We leverage state-of-the-art artificial intelligence and machine learning
                technologies to provide accurate plant disease detection.
              </p>

              <div className="tech-stack">
                <div className="tech-category">
                  <h3>AI & Machine Learning</h3>
                  <div className="tech-items">
                    <div className="tech-item">
                      <div className="tech-item__icon">🧠</div>
                      <div className="tech-item__content">
                        <h4>Deep Learning Models</h4>
                        <p>Convolutional Neural Networks trained on vast datasets of plant images</p>
                      </div>
                    </div>
                    <div className="tech-item">
                      <div className="tech-item__icon">👁️</div>
                      <div className="tech-item__content">
                        <h4>Computer Vision</h4>
                        <p>Advanced image processing and feature extraction algorithms</p>
                      </div>
                    </div>
                    <div className="tech-item">
                      <div className="tech-item__icon">🔄</div>
                      <div className="tech-item__content">
                        <h4>Transfer Learning</h4>
                        <p>Leveraging pre-trained models for faster and more accurate results</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tech-category">
                  <h3>Platform Technology</h3>
                  <div className="tech-items">
                    <div className="tech-item">
                      <div className="tech-item__icon">⚛️</div>
                      <div className="tech-item__content">
                        <h4>React.js Frontend</h4>
                        <p>Modern, responsive user interface built with React</p>
                      </div>
                    </div>
                    <div className="tech-item">
                      <div className="tech-item__icon">🚀</div>
                      <div className="tech-item__content">
                        <h4>Node.js Backend</h4>
                        <p>Scalable server architecture for handling AI model requests</p>
                      </div>
                    </div>
                    <div className="tech-item">
                      <div className="tech-item__icon">☁️</div>
                      <div className="tech-item__content">
                        <h4>Cloud Infrastructure</h4>
                        <p>Robust cloud deployment for global accessibility</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tech-category">
                  <h3>Data & Security</h3>
                  <div className="tech-items">
                    <div className="tech-item">
                      <div className="tech-item__icon">🗄️</div>
                      <div className="tech-item__content">
                        <h4>Secure Data Handling</h4>
                        <p>Encrypted data transmission and privacy-focused design</p>
                      </div>
                    </div>
                    <div className="tech-item">
                      <div className="tech-item__icon">📊</div>
                      <div className="tech-item__content">
                        <h4>Real-time Analytics</h4>
                        <p>Performance monitoring and continuous model improvement</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="model-performance">
                <h3>Model Performance</h3>
                <div className="performance-stats">
                  {stats.map((stat, index) => (
                    <div key={index} className="performance-stat">
                      <div className="performance-stat__icon">{stat.icon}</div>
                      <div className="performance-stat__number">{stat.number}</div>
                      <div className="performance-stat__label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

     

      case 'mission':
        return (
          <div className="tab-content">
            <div className="mission-section">
              <h2>Our Mission</h2>
              <div className="mission-content">
                <div className="mission-statement">
                  <div className="mission-icon">🌱</div>
                  <h3>Empowering Agriculture Through Technology</h3>
                  <p>
                    We believe that every farmer deserves access to advanced diagnostic tools.
                    Our mission is to democratize plant disease detection using AI technology,
                    making it accessible to farming communities worldwide.
                  </p>
                </div>

                <div className="values-grid">
                  <div className="value-item">
                    <div className="value-item__icon">🎯</div>
                    <h4>Accuracy</h4>
                    <p>Providing reliable, scientifically-backed disease identification to help farmers make informed decisions.</p>
                  </div>
                  <div className="value-item">
                    <div className="value-item__icon">🤝</div>
                    <h4>Accessibility</h4>
                    <p>Making advanced agricultural technology available to farmers regardless of their technical background.</p>
                  </div>
                  <div className="value-item">
                    <div className="value-item__icon">🌍</div>
                    <h4>Sustainability</h4>
                    <p>Promoting sustainable farming practices through early disease detection and prevention.</p>
                  </div>
                  <div className="value-item">
                    <div className="value-item__icon">📚</div>
                    <h4>Education</h4>
                    <p>Empowering users with knowledge about plant diseases and effective treatment methods.</p>
                  </div>
                </div>

                <div className="impact-section">
                  <h3>Our Impact</h3>
                  <div className="impact-stats">
                    <div className="impact-stat">
                      <div className="impact-stat__number">10,000+</div>
                      <div className="impact-stat__label">Farmers Helped</div>
                    </div>
                    <div className="impact-stat">
                      <div className="impact-stat__number">25%</div>
                      <div className="impact-stat__label">Crop Loss Reduction</div>
                    </div>
                    <div className="impact-stat">
                      <div className="impact-stat__number">5</div>
                      <div className="impact-stat__label">States Covered</div>
                    </div>
                  </div>
                </div>

                <div className="future-goals">
                  <h3>Future Goals</h3>
                  <div className="goals-list">
                    <div className="goal-item">
                      <span className="goal-icon">🚀</span>
                      <span className="goal-text">Expand to 20+ countries by 2026</span>
                    </div>
                    <div className="goal-item">
                      <span className="goal-icon">🔬</span>
                      <span className="goal-text">Develop pest detection capabilities</span>
                    </div>
                    <div className="goal-item">
                      <span className="goal-icon">📱</span>
                      <span className="goal-text">Launch mobile app for offline use</span>
                    </div>
                    <div className="goal-item">
                      <span className="goal-icon">🤖</span>
                      <span className="goal-text">Integrate IoT sensors for real-time monitoring</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="about-page">
      <div className="about-page__container">
        {/* Hero Section */}
        <div className="about-page__hero">
          <div className="hero__content">
            <h1 className="hero__title">
              About <span className="hero__title-highlight">PlantCare</span>
            </h1>
            <p className="hero__subtitle">
              Revolutionizing agriculture through AI-powered plant disease detection
            </p>
          </div>
          <div className="hero__visual">
            <div className="hero__image-container">
              <img
                src="/images/about-hero.jpg"
                alt="Agricultural technology and farming"
                className="hero__image"
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="about-page__tabs">
          <div className="tabs__container">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab__button ${activeTab === tab.id ? 'tab__button--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab__icon">{tab.icon}</span>
                <span className="tab__label">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="about-page__content">
          {renderTabContent()}
        </div>
            <div className="contact__cta">
              <a href="/classify" className="contact__button">
                Try Our Platform
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
