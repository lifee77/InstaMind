import React, { useState } from 'react';
import { analyzeChannelKeyword } from '../lib/api';

const KeywordAnalyzer = () => {
  const [channelId, setChannelId] = useState('');
  const [keywordResult, setKeywordResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await analyzeChannelKeyword(channelId.trim());
      setKeywordResult(data.keyword);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Channel Keyword Analyzer</h2>
      <input
        type="text"
        value={channelId}
        onChange={(e) => setChannelId(e.target.value)}
        placeholder="Enter channel ID"
      />
      <button onClick={handleAnalyze} disabled={loading || !channelId}>
        {loading ? 'Loading...' : 'Analyze Keyword'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {keywordResult && (
        <div>
          <p>Keyword: <strong>{keywordResult}</strong></p>
        </div>
      )}
    </div>
  );
};

export default KeywordAnalyzer;
