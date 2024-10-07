import './index.css';
import App from './pages/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import EditUserPage from './pages/EditPage';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccount';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <Routes>
      <Route path="/" element={<App />} />  {/* Main page */}
      <Route path="/login" element={<LoginPage />} />  {/* Login page */}
      <Route path="/create-account" element={<CreateAccountPage />} />  {/* Account creation page */}
      <Route path="/edit/:id" element={<EditUserPage />} />  {/* Edit user page */}
    </Routes>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
