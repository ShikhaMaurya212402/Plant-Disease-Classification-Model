import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__content">
              {/* Error Icon */}
              <div className="error-boundary__icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                  <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>

              {/* Error Message */}
              <div className="error-boundary__message">
                <h1 className="error-boundary__title">
                  Oops! Something went wrong
                </h1>
                <p className="error-boundary__description">
                  We're sorry, but something unexpected happened. Don't worry, 
                  our team has been notified and we're working on fixing this issue.
                </p>
              </div>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="error-boundary__details">
                  <details className="error-boundary__collapsible">
                    <summary className="error-boundary__summary">
                      View Error Details
                    </summary>
                    <div className="error-boundary__error-info">
                      <h3>Error:</h3>
                      <pre className="error-boundary__error-text">
                        {this.state.error.toString()}
                      </pre>
                      
                      {this.state.errorInfo && (
                        <>
                          <h3>Component Stack:</h3>
                          <pre className="error-boundary__error-text">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </>
                      )}
                    </div>
                  </details>
                </div>
              )}

              {/* Action Buttons */}
              <div className="error-boundary__actions">
                <button 
                  className="error-boundary__button error-boundary__button--primary"
                  onClick={this.handleRetry}
                >
                  Try Again
                </button>
                <button 
                  className="error-boundary__button error-boundary__button--secondary"
                  onClick={this.handleGoHome}
                >
                  Go to Home
                </button>
                <button 
                  className="error-boundary__button error-boundary__button--tertiary"
                  onClick={this.handleReload}
                >
                  Reload Page
                </button>
              </div>

              {/* Help Text */}
              <div className="error-boundary__help">
                <p className="error-boundary__help-text">
                  If this problem persists, please contact our support team at{' '}
                  <a 
                    href="mailto:support@plantcare.com" 
                    className="error-boundary__help-link"
                  >
                    support@plantcare.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
