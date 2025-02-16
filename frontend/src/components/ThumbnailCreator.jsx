import React, { useState } from 'react';
import { createThumbnail } from '../lib/api';

const ThumbnailCreator = () => {
  const [niche, setNiche] = useState('');
  const [thumbnailData, setThumbnailData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await createThumbnail(niche.trim());
      setThumbnailData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Thumbnail Creator</h2>
      <input
        type="text"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
        placeholder="Enter niche"
      />
      <button onClick={handleCreate} disabled={loading || !niche}>
        {loading ? 'Creating...' : 'Create Thumbnail'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {thumbnailData && (
        <div>
          <p>Thumbnail Response:</p>
          <pre>{JSON.stringify(thumbnailData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ThumbnailCreator;
