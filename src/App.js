import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNav from './components/SideNav';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Catalog from './pages/Catalog';
import Files from './pages/Files';
import Messages from './pages/Messages';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <SideNav />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/files" element={<Files />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;