import React, { useState } from 'react';
import { getTrending } from '../lib/api';

const Trending = () => {
  const [niche, setNiche] = useState('');
  const [trendingData, setTrendingData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await getTrending(niche.trim());
      setTrendingData(data.trending);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Trending Videos</h2>
      <input
        type="text"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
        placeholder="Enter niche (e.g. tech)"
      />
      <button onClick={handleFetch} disabled={loading || !niche}>
        {loading ? 'Loading...' : 'Get Trending'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {trendingData && (
        <div>
          <h3>Trending Results:</h3>
          <ul>
            {trendingData.map((item, idx) => (
              <li key={idx}>
                <strong>{item.snippet.title}</strong> – {item.snippet.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Trending;
