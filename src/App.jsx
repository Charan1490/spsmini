import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import Parking from './pages/Parking'; // Add Parking page
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/parking" element={<Parking />} /> {/* Add Parking route */}
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;