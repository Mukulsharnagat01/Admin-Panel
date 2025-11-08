// client/src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Ensure your backend is running on port 5000
            const res = await axios.post('${API_URL}/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            onLogin();
            navigate('/admin');
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
            setError('Invalid credentials. Please check your email and password.');
        }
    };

    return (
        // Tailwind classes for centering, background, full width
        <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full ml-0">
            {/* Form container */}
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md text-center">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Admin Login</h2>
                {error && (
                    <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                        {error}
                    </p>
                )}
                <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@example.com"
                    />
                </div>
                <div className="mb-8 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="********"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 w-full text-lg"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;