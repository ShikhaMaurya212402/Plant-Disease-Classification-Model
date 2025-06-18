import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const teamMembers = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Lead AI Researcher',
      image: '/images/team/priya-sharma.jpg',
      bio: 'PhD in Plant Pathology with 10+ years experience in agricultural AI solutions.',
      expertise: ['Machine Learning', 'Plant Pathology', 'Computer Vision']
    },
    {
      name: 'Rajesh Kumar',
      role: 'Senior Developer',
      image: '/images/team/rajesh-kumar.jpg',
      bio: 'Full-stack developer specializing in React and AI model deployment.',
      expertise: ['React.js', 'Node.js', 'AI Integration']
    },
    {
      name: 'Dr. Sunita Patel',
      role: 'Plant Disease Expert',
      image: '/images/team/sunita-patel.jpg',
      bio: 'Agricultural scientist with expertise in crop disease management.',
      expertise: ['Disease Diagnosis', 'Treatment Plans', 'Agriculture']
    },
    {
      name: 'Amit Singh',
      role: 'UI/UX Designer',
      image: '/images/team/amit-singh.jpg',
      bio: 'Designer focused on creating intuitive agricultural technology interfaces.',
      expertise: ['UI Design', 'User Research', 'Accessibility']
    }
  ];

  const features = [
    {
      icon: '🔬',
      title: 'Advanced AI Technology',
      description: 'Our deep learning models are trained on over 100,000 plant images from agricultural institutions worldwide.',
      details: ['Convolutional Neural Networks', 'Transfer Learning', 'Real-time Processing']
    },
    {
      icon: '📱',
      title: 'User-Friendly Interface',
      description: 'Designed for farmers, gardeners, and agricultural professionals with intuitive navigation.',
      details: ['Mobile Responsive', 'Offline Capability', 'Multi-language Support']
    },
    {
      icon: '🌍',
      title: 'Global Disease Database',
      description: 'Comprehensive database covering diseases across different climates and geographical regions.',
      details: ['150+ Disease Types', 'Regional Variations', 'Seasonal Patterns']
    },
    {
      icon: '💊',
      title: 'Treatment Recommendations',
      description: 'Evidence-based treatment plans with both organic and chemical solutions.',
      details: ['Organic Solutions', 'Chemical Treatments', 'Prevention Methods']
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Project Inception',
      description: 'Started research and development with focus on Indian agricultural needs.',
      icon: '🌱'
    },
    {
      year: '2024',
      title: 'AI Model Development',
      description: 'Completed training of our core disease detection models with 94% accuracy.',
      icon: '🧠'
    },
    {
      year: '2024',
      title: 'Beta Testing',
      description: 'Successful testing with 500+ farmers across Odisha and neighboring states.',
      icon: '🧪'
    },
    {
      year: '2025',
      title: 'Public Launch',
      description: 'Official launch of the platform with comprehensive disease database.',
      icon: '🚀'
    }
  ];

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

      case 'team':
        return (
          <div className="tab-content">
            <div className="team-section">
              <h2>Meet Our Team</h2>
              <p className="section-intro">
                Our diverse team combines expertise in agriculture, AI technology, and user experience 
                to create solutions that truly serve farming communities.
              </p>

              <div className="team-grid">
                {teamMembers.map((member, index) => (
                  <div key={index} className="team-card">
                    <div className="team-card__image">
                      <img src={member.image} alt={member.name} />
                    </div>
                    <div className="team-card__content">
                      <h3 className="team-card__name">{member.name}</h3>
                      <div className="team-card__role">{member.role}</div>
                      <p className="team-card__bio">{member.bio}</p>
                      <div className="team-card__expertise">
                        {member.expertise.map((skill, i) => (
                          <span key={i} className="expertise-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="timeline">
                <h3>Our Journey</h3>
                <div className="timeline-container">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-item__icon">{milestone.icon}</div>
                      <div className="timeline-item__content">
                        <div className="timeline-item__year">{milestone.year}</div>
                        <h4 className="timeline-item__title">{milestone.title}</h4>
                        <p className="timeline-item__description">{milestone.description}</p>
                      </div>
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

        {/* Contact Section */}
        <div className="about-page__contact">
          <div className="contact__container">
            <h2 className="contact__title">Get In Touch</h2>
            <p className="contact__subtitle">
              Have questions or want to collaborate? We'd love to hear from you.
            </p>
            
            <div className="contact__grid">
              <div className="contact__item">
                <div className="contact__icon">📧</div>
                <h3>Email Us</h3>
                <p>info@plantcare.com</p>
                <p>support@plantcare.com</p>
              </div>
              
              <div className="contact__item">
                <div className="contact__icon">📱</div>
                <h3>Call Us</h3>
                <p>+91 98765 43210</p>
                <p>Mon-Fri: 9AM-6PM IST</p>
              </div>
              
              <div className="contact__item">
                <div className="contact__icon">📍</div>
                <h3>Visit Us</h3>
                <p>Agricultural Technology Center</p>
                <p>Baripada, Odisha, India</p>
              </div>
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
