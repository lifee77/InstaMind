import React, { useState } from 'react';
import { marked } from 'marked';
import './ThumbnailAndScriptGenerator.css'; // Import the CSS file

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
      console.log('API Response:', data);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Thumbnail & Script Generator
      </h1>

      {/* Input & Button Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Generate from Channel ID</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
            placeholder="Enter YouTube channel ID (e.g., UC...)"
            className="w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !channelId}
            className={`px-4 py-2 rounded text-white font-medium transition-colors ${
              loading || !channelId
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {error && <p className="mt-4 text-red-600 font-medium">Error: {error}</p>}
      </div>

      {/* Results Section */}
      {result && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Results</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-700">
                <strong>Channel ID:</strong> {result.channel_id}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Niche:</strong> {result.niche}
              </p>
            </div>

            <div>
              <h4 className="text-base font-medium mb-1">Script:</h4>
              <div
                className="bg-gray-100 p-4 rounded text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: marked(result.script) }}
              />
            </div>

            <div>
              <h4 className="text-base font-medium mb-1">Thumbnail:</h4>
              {result.thumbnail && result.thumbnail.startsWith('data:image/png;base64,') ? (
                <img
                  src={result.thumbnail}
                  alt="Generated Thumbnail"
                  className="w-full sm:w-auto rounded shadow mt-2"
                />
              ) : (
                <p className="text-sm text-gray-700">No thumbnail generated.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailAndScriptGenerator;
