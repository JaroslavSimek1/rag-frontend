import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import IngestionPage from './pages/IngestionPage';
import SearchPage from './pages/SearchPage';
import { Database, Search, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel px-6 py-3 flex items-center justify-between shadow-glow">
          <div className="flex items-center space-x-3">
            <div className="bg-accent p-2 rounded-xl">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-glow-gradient bg-clip-text text-transparent">
              A.S.S. Lover
            </span>
          </div>
          
          <div className="flex space-x-2">
            <Link 
              to="/" 
              className={`relative flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'text-white' 
                  : 'text-text-secondary hover:text-white hover:bg-surface'
              }`}
            >
              {location.pathname === '/' && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-accent/20 border border-accent/30 rounded-xl -z-10"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Database className="w-4 h-4 mr-2" />
              Ingestion
            </Link>
            
            <Link 
              to="/search" 
              className={`relative flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                location.pathname === '/search' 
                  ? 'text-white' 
                  : 'text-text-secondary hover:text-white hover:bg-surface'
              }`}
            >
              {location.pathname === '/search' && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-purple-500/20 border border-purple-500/30 rounded-xl -z-10"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Search className="w-4 h-4 mr-2" />
              RAG Search
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Background animation component for premium feel
function BackgroundGlow() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] mix-blend-screen animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-500/10 blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-pink-500/10 blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg text-text-primary selection:bg-accent/30">
        <BackgroundGlow />
        <Navigation />
        
        <main className="max-w-6xl mx-auto px-4 pt-32 pb-16">
          <Routes>
            <Route path="/" element={<IngestionPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
