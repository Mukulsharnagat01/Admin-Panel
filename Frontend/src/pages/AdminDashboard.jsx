// client/src/pages/AdminDashboard.js
import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h2>
            <p className="text-gray-600 mb-8">Welcome to the Business Card Templates Admin Panel.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Templates</h3>
                    <p className="text-4xl font-bold text-indigo-600">150+</p> {/* Placeholder, fetch real data */}
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">New Templates This Month</h3>
                    <p className="text-4xl font-bold text-green-600">12</p> {/* Placeholder */}
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Users (Future)</h3>
                    <p className="text-4xl font-bold text-blue-600">500+</p> {/* Placeholder */}
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Reviews</h3>
                    <p className="text-4xl font-bold text-yellow-600">3</p> {/* Placeholder */}
                </div>
            </div>
            <p className="text-gray-700">Use the sidebar to navigate template management and other administrative features.</p>
        </div>
    );
};

export default AdminDashboard;