import React, { useState } from 'react';
import { marked } from 'marked';

const ThumbnailAndScriptGenerator = () => {
  const [channelId, setChannelId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/generate-thumbnail-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ channel_id: channelId.trim() }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to generate thumbnail and script');
      }

      const data = await response.json();

      // Convert base64 image data if necessary
      if (data.thumbnail && !data.thumbnail.startsWith('http')) {
        data.thumbnail = `data:image/png;base64,${data.thumbnail}`;
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Thumbnail & Script Generator</h2>
      <input
        type="text"
        value={channelId}
        onChange={(e) => setChannelId(e.target.value)}
        placeholder="Enter YouTube channel ID (e.g., UC...)"
        style={{ width: '300px', padding: '0.5rem' }}
      />
      <button 
        onClick={handleGenerate} 
        disabled={loading || !channelId} 
        style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
        {loading ? 'Generating...' : 'Generate Thumbnail & Script'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Results</h3>
          <p><strong>Channel ID:</strong> {result.channel_id}</p>
          <p><strong>Niche:</strong> {result.niche}</p>

          <h4>Script:</h4>
          <div 
            style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '5px' }} 
            dangerouslySetInnerHTML={{ __html: marked(result.script) }} 
          />

          <h4>Thumbnail:</h4>
          {result.thumbnail ? (
            <img 
              src={result.thumbnail} 
              alt="Generated Thumbnail" 
              style={{ maxWidth: '100%', borderRadius: '5px', marginTop: '1rem' }}
            />
          ) : (
            <p>No thumbnail generated.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ThumbnailAndScriptGenerator;
