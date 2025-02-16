import React from 'react';
import YouTubeAnalyzer from './components/YouTubeAnalyzer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            YouTube Channel Analyzer
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <YouTubeAnalyzer />
      </main>
      
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto py-4 text-center text-gray-600">
          YouTube Channel Analyzer © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

export default App;