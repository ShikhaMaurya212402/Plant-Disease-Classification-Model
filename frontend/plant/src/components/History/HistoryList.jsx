import React, { useState, useEffect, useMemo } from 'react';
import HistoryItem from './HistoryItem';
import Loader from '../common/Loader';
import './HistoryList.css';

const HistoryList = ({ 
  historyData = [],
  isLoading = false,
  onItemSelect,
  onItemDelete,
  onItemView,
  onClearAll
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  const itemsPerPage = 12;

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = historyData.filter(item => {
      const matchesSearch = item.diseaseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.plantType?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterBy === 'all' || 
                          (filterBy === 'diseased' && item.confidence > 70) ||
                          (filterBy === 'healthy' && item.confidence <= 70) ||
                          (filterBy === 'recent' && isRecent(item.createdAt));
      
      return matchesSearch && matchesFilter;
    });

    // Sort data
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'confidence':
          return b.confidence - a.confidence;
        case 'disease':
          return (a.diseaseName || '').localeCompare(b.diseaseName || '');
        default:
          return 0;
      }
    });
  }, [historyData, searchTerm, filterBy, sortBy]);

  const isRecent = (date) => {
    const now = new Date();
    const itemDate = new Date(date);
    const daysDiff = (now - itemDate) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7;
  };

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterBy, sortBy]);

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === paginatedData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedData.map(item => item.id));
    }
  };

  const handleDeleteSelected = () => {
    if (onItemDelete && selectedItems.length > 0) {
      selectedItems.forEach(id => onItemDelete(id));
      setSelectedItems([]);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="history-list history-list--loading">
        <Loader 
          type="plant" 
          size="large" 
          text="Loading your classification history..." 
        />
      </div>
    );
  }

  return (
    <div className="history-list">
      {/* Header */}
      <div className="history-list__header">
        <div className="history-list__title-section">
          <h2 className="history-list__title">Classification History</h2>
          <p className="history-list__subtitle">
            {historyData.length} {historyData.length === 1 ? 'classification' : 'classifications'} total
          </p>
        </div>
        
        <div className="history-list__actions">
          <button 
            className="history-list__view-toggle"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
          >
            {viewMode === 'grid' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 18h5v-6h-5v6zm-6 0h5V6H4v12zm12 0h5v-6h-5v6zM10 6v5h11V6H10z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="history-list__controls">
        {/* Search */}
        <div className="history-list__search">
          <div className="search-input">
            <svg className="search-input__icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Search by disease or plant type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input__field"
            />
            {searchTerm && (
              <button
                className="search-input__clear"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="history-list__filters">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="history-list__filter-select"
          >
            <option value="all">All Results</option>
            <option value="diseased">Diseased Plants</option>
            <option value="healthy">Healthy Plants</option>
            <option value="recent">Recent (7 days)</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="history-list__sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="confidence">Highest Confidence</option>
            <option value="disease">Disease Name</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {filteredAndSortedData.length > 0 && (
        <div className="history-list__bulk-actions">
          <label className="bulk-select">
            <input
              type="checkbox"
              checked={selectedItems.length === paginatedData.length && paginatedData.length > 0}
              onChange={handleSelectAll}
            />
            <span className="bulk-select__text">
              {selectedItems.length > 0 
                ? `${selectedItems.length} selected` 
                : 'Select all'
              }
            </span>
          </label>

          {selectedItems.length > 0 && (
            <div className="bulk-actions">
              <button
                className="bulk-action-button bulk-action-button--danger"
                onClick={handleDeleteSelected}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
                Delete Selected
              </button>
              
              {onClearAll && (
                <button
                  className="bulk-action-button bulk-action-button--secondary"
                  onClick={onClearAll}
                >
                  Clear All History
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {filteredAndSortedData.length === 0 ? (
        <div className="history-list__empty">
          {historyData.length === 0 ? (
            <>
              <div className="history-list__empty-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3 className="history-list__empty-title">No Classification History</h3>
              <p className="history-list__empty-description">
                Start classifying plant diseases to build your history. Your past classifications will appear here.
              </p>
              <button 
                className="history-list__empty-button"
                onClick={() => window.location.href = '/classify'}
              >
                Start Classifying
              </button>
            </>
          ) : (
            <>
              <div className="history-list__empty-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <h3 className="history-list__empty-title">No Results Found</h3>
              <p className="history-list__empty-description">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button 
                className="history-list__empty-button"
                onClick={() => {
                  setSearchTerm('');
                  setFilterBy('all');
                }}
              >
                Clear Filters
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Items Grid/List */}
          <div className={`history-list__items history-list__items--${viewMode}`}>
            {paginatedData.map((item) => (
              <HistoryItem
                key={item.id}
                item={item}
                viewMode={viewMode}
                isSelected={selectedItems.includes(item.id)}
                onSelect={() => handleSelectItem(item.id)}
                onView={() => onItemView && onItemView(item)}
                onDelete={() => onItemDelete && onItemDelete(item.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="history-list__pagination">
              <button
                className="pagination-button pagination-button--prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
                Previous
              </button>

              <div className="pagination-info">
                <span className="pagination-info__text">
                  Page {currentPage} of {totalPages}
                </span>
                <span className="pagination-info__total">
                  ({filteredAndSortedData.length} items)
                </span>
              </div>

              <button
                className="pagination-button pagination-button--next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryList;
