import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!input.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/summarize', { text: input });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze text. Check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInput('');
    setResult(null);
    setError(null);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '#4caf50';
      case 'negative':
        return '#f44336';
      case 'neutral':
        return '#2196f3';
      default:
        return '#666';
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>📝 Text Analyzer</h1>
        <p>Analyze text and get summaries, key points, and sentiment</p>
      </header>

      <main className="main">
        {/* Input Section */}
        <section className="input-section">
          <label htmlFor="textInput">Paste your text here:</label>
          <textarea
            id="textInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter or paste text you want to analyze (max 10,000 characters)..."
            maxLength="10000"
            disabled={loading}
          />
          <div className="char-count">
            {input.length} / 10,000 characters
          </div>

          <div className="button-group">
            <button
              onClick={handleAnalyze}
              disabled={loading || !input.trim()}
              className="btn btn-primary"
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
            <button
              onClick={handleReset}
              disabled={loading}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </section>

        {/* Error Display */}
        {error && (
          <section className="error-section">
            <div className="error-message">
              ⚠️ {error}
            </div>
          </section>
        )}

        {/* Results Section */}
        {result && (
          <section className="results-section">
            <h2>Analysis Results</h2>

            {/* Summary */}
            <div className="result-card">
              <h3>Summary</h3>
              <p className="summary-text">{result.summary}</p>
            </div>

            {/* Key Points */}
            <div className="result-card">
              <h3>Key Points</h3>
              <ul className="key-points">
                {result.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Sentiment */}
            <div className="result-card">
              <h3>Sentiment</h3>
              <div
                className="sentiment-badge"
                style={{ backgroundColor: getSentimentColor(result.sentiment) }}
              >
                {result.sentiment.toUpperCase()}
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {!result && !loading && !error && (
          <section className="empty-state">
            <p>👆 Paste text above and click "Analyze" to get started</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
