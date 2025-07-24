import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [stats, setStats] = useState({
    totalClassifications: 0,
    diseasesDetected: 0,
    accuracyRate: 0,
    plantsHelped: 0
  });

  const features = [
    {
      icon: '🔬',
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms analyze plant images to identify diseases with high accuracy.',
      image: '/images/ai-detection.jpg'
    },
    {
      icon: '⚡',
      title: 'Instant Results',
      description: 'Get disease identification results within seconds of uploading your plant image.',
      image: '/images/instant-results.jpg'
    },
    {
      icon: '💊',
      title: 'Treatment Recommendations',
      description: 'Receive detailed treatment plans and prevention strategies for identified diseases.',
      image: '/images/treatment.jpg'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Access our platform from any device, anywhere, anytime for on-the-go plant care.',
      image: '/images/mobile-friendly.jpg'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Upload Image',
      description: 'Take a clear photo of your plant showing the affected areas',
      icon: '📸'
    },
    {
      step: 2,
      title: 'AI Analysis',
      description: 'Our advanced AI analyzes the image for disease symptoms',
      icon: '🧠'
    },
    {
      step: 3,
      title: 'Get Results',
      description: 'Receive detailed diagnosis with confidence ratings',
      icon: '📊'
    },
    {
      step: 4,
      title: 'Apply Treatment',
      description: 'Follow our recommended treatment and prevention plans',
      icon: '🌱'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Baripada, Odisha',
      avatar: '/images/avatar1.jpg',
      rating: 5,
      text: 'This tool saved my tomato crop! The AI detected early blight before I even noticed symptoms.'
    },
    {
      name: 'Rajesh Kumar',
      location: 'Bhubaneswar, Odisha',
      avatar: '/images/avatar2.jpg',
      rating: 5,
      text: 'As a farmer, this has been invaluable for quick disease identification. Highly recommended!'
    },
    {
      name: 'Sunita Patel',
      location: 'Cuttack, Odisha',
      avatar: '/images/avatar3.jpg',
      rating: 4,
      text: 'Great tool for home gardeners. The treatment recommendations are very helpful.'
    }
  ];

  useEffect(() => {
    // Animate stats counter
    const animateStats = () => {
      const targetStats = {
        totalClassifications: 50000,
        diseasesDetected: 150,
        accuracyRate: 94,
        plantsHelped: 25000
      };

      Object.keys(targetStats).forEach(key => {
        let current = 0;
        const target = targetStats[key];
        const increment = target / 100;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 20);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.disconnect();
        }
      });
    });

    const statsElement = document.querySelector('.home__stats');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__text">
              <h1 className="hero__title">
                Identify Plant Diseases with
                <span className="hero__title-highlight"> AI Precision</span>
              </h1>
              <p className="hero__description">
                Upload a photo of your plant and get instant disease identification
                with detailed treatment recommendations. Help your plants thrive with
                our advanced AI-powered diagnostic tool.
              </p>
              <div className="hero__actions">
                <Link to="/classify" className="hero__cta-primary">
                  Start Classification
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </Link>
                <button className="hero__cta-secondary">
                  Watch Demo
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="hero__visual">
              <div className="hero__image-container">
                <img
                  src="/images/hero-plant.jpg"
                  alt="Healthy plant with AI analysis overlay"
                  className="hero__image"
                />
                <div className="hero__overlay">
                  <div className="analysis-popup">
                    <div className="analysis-popup__header">
                      <span className="analysis-popup__icon">✅</span>
                      <span className="analysis-popup__title">Analysis Complete</span>
                    </div>
                    <div className="analysis-popup__content">
                      <div className="analysis-popup__result">
                        <span className="analysis-popup__disease">Healthy Plant</span>
                        <span className="analysis-popup__confidence">96% Confidence</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="home__stats">
        <div className="stats__container">
          <div className="stats__grid">
            <div className="stat__item">
              <div className="stat__number">{stats.totalClassifications.toLocaleString()}+</div>
              <div className="stat__label">Classifications Made</div>
            </div>
            <div className="stat__item">
              <div className="stat__number">{stats.diseasesDetected}+</div>
              <div className="stat__label">Diseases Detected</div>
            </div>
            <div className="stat__item">
              <div className="stat__number">{stats.accuracyRate}%</div>
              <div className="stat__label">Accuracy Rate</div>
            </div>
            <div className="stat__item">
              <div className="stat__number">{stats.plantsHelped.toLocaleString()}+</div>
              <div className="stat__label">Plants Helped</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home__features">
        <div className="features__container">
          <div className="features__header">
            <h2 className="features__title">Why Choose Our Platform?</h2>
            <p className="features__subtitle">
              Advanced technology meets practical plant care solutions
            </p>
          </div>

          <div className="features__showcase">
            <div className="features__list">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`feature__item ${currentFeature === index ? 'feature__item--active' : ''}`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div className="feature__icon">{feature.icon}</div>
                  <div className="feature__content">
                    <h3 className="feature__title">{feature.title}</h3>
                    <p className="feature__description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="features__visual">
              <img
                src={features[currentFeature].image}
                alt={features[currentFeature].title}
                className="features__image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="home__how-it-works">
        <div className="how-it-works__container">
          <div className="how-it-works__header">
            <h2 className="how-it-works__title">How It Works</h2>
            <p className="how-it-works__subtitle">
              Get plant disease diagnosis in 4 simple steps
            </p>
          </div>

          <div className="how-it-works__steps">
            {howItWorks.map((step, index) => (
              <div key={index} className="step__item">
                <div className="step__icon-container">
                  <div className="step__number">{step.step}</div>
                  <div className="step__icon">{step.icon}</div>
                </div>
                <div className="step__content">
                  <h3 className="step__title">{step.title}</h3>
                  <p className="step__description">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="step__connector">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="home__testimonials">
        <div className="testimonials__container">
          <div className="testimonials__header">
            <h2 className="testimonials__title">What Our Users Say</h2>
            <p className="testimonials__subtitle">
              Trusted by farmers and gardeners across India
            </p>
          </div>

          <div className="testimonials__grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial__item">
                <div className="testimonial__rating">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`star ${i < testimonial.rating ? 'star--filled' : ''}`}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="testimonial__text">"{testimonial.text}"</p>
                <div className="testimonial__author">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="testimonial__avatar"
                  />
                  <div className="testimonial__info">
                    <div className="testimonial__name">{testimonial.name}</div>
                    <div className="testimonial__location">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home__cta">
        <div className="cta__container">
          <div className="cta__content">
            <h2 className="cta__title">Ready to Help Your Plants?</h2>
            <p className="cta__description">
              Join thousands of users who trust our AI-powered plant disease detection system
            </p>
            <div className="cta__actions">
              <Link to="/classify" className="cta__button cta__button--primary">
                Start Free Classification
              </Link>
              <Link to="/about" className="cta__button cta__button--secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="cta__visual">
            <div className="cta__plants">
              <div className="plant-icon plant-icon--1">🌱</div>
              <div className="plant-icon plant-icon--2">🌿</div>
              <div className="plant-icon plant-icon--3">🍃</div>
              <div className="plant-icon plant-icon--4">🌾</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
