// client/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import TemplateList from './pages/TemplateList.jsx';
import TemplateForm from './pages/TemplateForm.jsx';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import './index.css'; // Use index.css for global Tailwind imports

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {/* Tailwind classes for a flex container, min-h-screen for full height */}
      <div className="flex min-h-screen bg-gray-100">
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        {/* Adjusted main-content to handle sidebar width and occupy remaining space */}
        <div className={`flex-1 p-6 transition-all duration-300 ${isAuthenticated ? 'ml-64' : 'ml-0'}`}>
          {isAuthenticated && <Header />}
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/templates" element={<TemplateList />} />
              <Route path="/admin/templates/new" element={<TemplateForm />} />
              <Route path="/admin/templates/edit/:id" element={<TemplateForm />} />
            </Route>

            <Route path="*" element={isAuthenticated ? <Navigate to="/admin" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;