import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Tasks from './pages/Tasks';

const App = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/tasks" /> : <Home />} />
                <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/" />} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
