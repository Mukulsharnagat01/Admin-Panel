// client/src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // useLocation to highlight active link

const Sidebar = ({ onLogout }) => {
    const location = useLocation();

    const navLinks = [
        { path: "/admin", name: "Dashboard" },
        { path: "/admin/templates", name: "Templates" },
        // Add more admin links here as needed
        // { path: "/admin/users", name: "Users" },
        // { path: "/admin/settings", name: "Settings" },
    ];

    return (
        // Tailwind classes for fixed sidebar, dark background, shadow, padding
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-6 shadow-lg z-20">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-100">Admin Panel</h3>
            </div>
            <ul className="list-none p-0">
                {navLinks.map((link) => (
                    <li key={link.path} className="mb-4">
                        <Link
                            to={link.path}
                            // Dynamically apply active styles based on current path
                            className={`block px-4 py-2 rounded-md transition-colors duration-200
                ${location.pathname === link.path ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
            {/* Logout button */}
            <button
                onClick={onLogout}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-5/6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;