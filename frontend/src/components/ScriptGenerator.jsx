import React, { useState } from 'react';
import { generateScript } from '../lib/api';

const ScriptGenerator = () => {
  const [niche, setNiche] = useState('');
  const [script, setScript] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await generateScript(niche.trim());
      setScript(data.script);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Script Generator</h2>
      <input
        type="text"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
        placeholder="Enter niche"
      />
      <button onClick={handleGenerate} disabled={loading || !niche}>
        {loading ? 'Generating...' : 'Generate Script'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {script && (
        <div>
          <h3>Generated Script:</h3>
          <pre>{script}</pre>
        </div>
      )}
    </div>
  );
};

export default ScriptGenerator;
