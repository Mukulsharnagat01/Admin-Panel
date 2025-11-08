// client/src/components/Header.js
import React from 'react';

const Header = () => {
    return (
        // Tailwind classes for background, padding, border, shadow, margin-bottom
        <header className="bg-white p-4 border-b border-gray-200 shadow-sm mb-6 rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800">Business Card Admin</h1>
            {/* Add user info, search, etc. here later */}
        </header>
    );
};

export default Header;