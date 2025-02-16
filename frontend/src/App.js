import React from 'react';
import ChannelContent from './components/ChannelContent';
import ChannelAnalyzer from './components/ChannelAnalyzer';
import KeywordAnalyzer from './components/KeywordAnalyzer';
import Trending from './components/Trending';
import ScriptGenerator from './components/ScriptGenerator';
import ThumbnailCreator from './components/ThumbnailCreator';

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>YouTube Content Analysis Dashboard</h1>
      <ChannelContent />
      <hr />
      <ChannelAnalyzer />
      <hr />
      <KeywordAnalyzer />
      <hr />
      <Trending />
      <hr />
      <ScriptGenerator />
      <hr />
      <ThumbnailCreator />
    </div>
  );
}

export default App;
