import React, { useState, useEffect } from 'react';
import HistoryList from '../components/History/HistoryList';
import Loader from '../components/common/Loader';
import './History.css';

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalStats, setTotalStats] = useState({
    totalClassifications: 0,
    diseasesFound: 0,
    healthyPlants: 0,
    avgConfidence: 0
  });

  // Mock history data
  const mockHistoryData = [
    {
      id: '1',
      diseaseName: 'Tomato Late Blight',
      plantType: 'Tomato',
      confidence: 89,
      severity: 'High',
      affectedParts: ['Leaves', 'Stems'],
      imageUrl: '/images/history/tomato-blight.jpg',
      createdAt: '2025-06-15T10:30:00Z',
      hasRecommendations: true,
      description: 'Serious fungal disease affecting tomato plants with dark lesions'
    },
    {
      id: '2',
      diseaseName: 'Healthy Plant',
      plantType: 'Rose',
      confidence: 96,
      severity: null,
      affectedParts: [],
      imageUrl: '/images/history/healthy-rose.jpg',
      createdAt: '2025-06-14T15:45:00Z',
      hasRecommendations: false,
      description: 'Plant appears healthy with no visible disease symptoms'
    },
    {
      id: '3',
      diseaseName: 'Apple Scab',
      plantType: 'Apple',
      confidence: 78,
      severity: 'Medium',
      affectedParts: ['Leaves', 'Fruits'],
      imageUrl: '/images/history/apple-scab.jpg',
      createdAt: '2025-06-13T08:20:00Z',
      hasRecommendations: true,
      description: 'Fungal disease causing dark, scabby lesions on apple leaves and fruits'
    },
    {
      id: '4',
      diseaseName: 'Powdery Mildew',
      plantType: 'Cucumber',
      confidence: 85,
      severity: 'Medium',
      affectedParts: ['Leaves'],
      imageUrl: '/images/history/powdery-mildew.jpg',
      createdAt: '2025-06-12T12:10:00Z',
      hasRecommendations: true,
      description: 'White powdery fungal growth on cucumber leaves'
    },
    {
      id: '5',
      diseaseName: 'Bacterial Wilt',
      plantType: 'Eggplant',
      confidence: 92,
      severity: 'High',
      affectedParts: ['Stems', 'Leaves'],
      imageUrl: '/images/history/bacterial-wilt.jpg',
      createdAt: '2025-06-11T16:30:00Z',
      hasRecommendations: true,
      description: 'Bacterial infection causing wilting and yellowing of eggplant'
    },
    {
      id: '6',
      diseaseName: 'Healthy Plant',
      plantType: 'Marigold',
      confidence: 94,
      severity: null,
      affectedParts: [],
      imageUrl: '/images/history/healthy-marigold.jpg',
      createdAt: '2025-06-10T11:15:00Z',
      hasRecommendations: false,
      description: 'Healthy marigold with vibrant flowers and green foliage'
    }
  ];

  useEffect(() => {
    const loadHistoryData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setHistoryData(mockHistoryData);

        // Calculate stats
        const stats = {
          totalClassifications: mockHistoryData.length,
          diseasesFound: mockHistoryData.filter(item => item.diseaseName !== 'Healthy Plant').length,
          healthyPlants: mockHistoryData.filter(item => item.diseaseName === 'Healthy Plant').length,
          avgConfidence: Math.round(
            mockHistoryData.reduce((sum, item) => sum + item.confidence, 0) / mockHistoryData.length
          )
        };
        setTotalStats(stats);

      } catch (err) {
        setError('Failed to load classification history');
      } finally {
        setIsLoading(false);
      }
    };

    loadHistoryData();
  }, []);

  const handleItemView = (item) => {
    // Navigate to detailed view or open modal
    console.log('Viewing item:', item);
    // Implementation would depend on routing setup
    // Example: navigate(`/history/${item.id}`) or setSelectedItem(item)
  };

  const handleItemDelete = (itemId) => {
    setHistoryData(prev => prev.filter(item => item.id !== itemId));
    // Update stats
    const updatedData = historyData.filter(item => item.id !== itemId);
    const stats = {
      totalClassifications: updatedData.length,
      diseasesFound: updatedData.filter(item => item.diseaseName !== 'Healthy Plant').length,
      healthyPlants: updatedData.filter(item => item.diseaseName === 'Healthy Plant').length,
      avgConfidence: updatedData.length > 0 ? Math.round(
        updatedData.reduce((sum, item) => sum + item.confidence, 0) / updatedData.length
      ) : 0
    };
    setTotalStats(stats);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all classification history? This action cannot be undone.')) {
      setHistoryData([]);
      setTotalStats({
        totalClassifications: 0,
        diseasesFound: 0,
        healthyPlants: 0,
        avgConfidence: 0
      });
    }
  };

  const handleExportHistory = () => {
    const dataStr = JSON.stringify(historyData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `plant-classification-history-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (isLoading) {
    return (
      <div className="history-page history-page--loading">
        <Loader
          type="plant"
          size="large"
          text="Loading your classification history..."
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-page history-page--error">
        <div className="error-container">
          <div className="error-icon">❌</div>
          <h2>Failed to Load History</h2>
          <p>{error}</p>
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="history-page__container">
        {/* Header Section */}
        <div className="history-page__header">
          <div className="header__content">
            <h1 className="history-page__title">Classification History</h1>
            <p className="history-page__subtitle">
              Track and manage your plant disease classification results
            </p>
          </div>

          <div className="header__actions">
            <button
              className="header__action-button header__action-button--secondary"
              onClick={handleExportHistory}
              disabled={historyData.length === 0}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
              Export History
            </button>

            <button
              className="header__action-button header__action-button--primary"
              onClick={() => window.location.href = '/classify'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              New Classification
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="history-page__stats">
          <div className="stats__grid">
            <div className="stat__card">
              <div className="stat__icon">📊</div>
              <div className="stat__content">
                <div className="stat__number">{totalStats.totalClassifications}</div>
                <div className="stat__label">Total Classifications</div>
              </div>
            </div>

            <div className="stat__card">
              <div className="stat__icon">🦠</div>
              <div className="stat__content">
                <div className="stat__number">{totalStats.diseasesFound}</div>
                <div className="stat__label">Diseases Detected</div>
              </div>
            </div>

            <div className="stat__card">
              <div className="stat__icon">🌱</div>
              <div className="stat__content">
                <div className="stat__number">{totalStats.healthyPlants}</div>
                <div className="stat__label">Healthy Plants</div>
              </div>
            </div>

            <div className="stat__card">
              <div className="stat__icon">🎯</div>
              <div className="stat__content">
                <div className="stat__number">{totalStats.avgConfidence}%</div>
                <div className="stat__label">Avg Confidence</div>
              </div>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="history-page__content">
          <HistoryList
            historyData={historyData}
            isLoading={false}
            onItemView={handleItemView}
            onItemDelete={handleItemDelete}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Tips Section */}
        {historyData.length > 0 && (
          <div className="history-page__tips">
            <h3 className="tips__title">💡 Managing Your History</h3>
            <div className="tips__grid">
              <div className="tip__item">
                <div className="tip__icon">🔍</div>
                <h4>Search & Filter</h4>
                <p>Use the search bar and filters to quickly find specific classifications</p>
              </div>
              <div className="tip__item">
                <div className="tip__icon">📈</div>
                <h4>Track Progress</h4>
                <p>Monitor your plant health over time using the classification timeline</p>
              </div>
              <div className="tip__item">
                <div className="tip__icon">💾</div>
                <h4>Export Data</h4>
                <p>Download your classification history for offline analysis or record keeping</p>
              </div>
              <div className="tip__item">
                <div className="tip__icon">🔄</div>
                <h4>Compare Results</h4>
                <p>Review past classifications to identify patterns and recurring issues</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
