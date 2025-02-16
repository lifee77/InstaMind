import React from 'react';
import ThumbnailAndScriptGenerator from './components/ThumbnailAndScriptGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4">
          <h1>YouTube Channel Thumbnail & Script Generator</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <ThumbnailAndScriptGenerator />
      </main>
      
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto py-4 text-center">© 2025 Dasha and Jeevan</div>
      </footer>
    </div>
  );
}

export default App;
