import React from 'react';
import YouTubeAnalyzer from './components/YouTubeAnalyzer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4">
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <YouTubeAnalyzer />
      </main>
      
      <footer className="bg-white border-t mt-auto">
      </footer>
    </div>
  );
}

export default App;