import React, { useState } from 'react';
import { getChannelContent } from '../lib/api';

const ChannelContent = () => {
  const [channelId, setChannelId] = useState('');
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await getChannelContent(channelId.trim());
      setVideos(data.videos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Channel Content</h2>
      <input
        type="text"
        value={channelId}
        onChange={(e) => setChannelId(e.target.value)}
        placeholder="Enter channel ID (UC...)"
      />
      <button onClick={handleFetch} disabled={loading || !channelId}>
        {loading ? 'Loading...' : 'Fetch Channel Content'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {videos && (
        <div>
          <h3>Videos:</h3>
          <ul>
            {videos.map((item, index) => (
              <li key={index}>
                <strong>{item.snippet.title}</strong> – {item.snippet.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChannelContent;
