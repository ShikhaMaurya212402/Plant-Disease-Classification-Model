// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Classify from './pages/Classify';
import History from './pages/History';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />

        <main className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/classify" element={<Classify />} />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
            {/* fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
