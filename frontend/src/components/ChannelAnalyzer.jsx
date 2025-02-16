import React, { useState } from 'react';
import { analyzeChannel } from '../lib/api';

const ChannelAnalyzer = () => {
  const [channelId, setChannelId] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await analyzeChannel(channelId.trim());
      setAnalysis(data.analysis);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Channel Analyzer</h2>
      <input
        type="text"
        value={channelId}
        onChange={(e) => setChannelId(e.target.value)}
        placeholder="Enter channel ID"
      />
      <button onClick={handleAnalyze} disabled={loading || !channelId}>
        {loading ? 'Analyzing...' : 'Analyze Channel'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {analysis && (
        <div>
          <h3>Analysis Result:</h3>
          <p>Niche: {analysis.niche}</p>
        </div>
      )}
    </div>
  );
};

export default ChannelAnalyzer;
