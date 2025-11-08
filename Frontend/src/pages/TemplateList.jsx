// client/src/pages/TemplateList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TemplateList = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const res = await axios.get('${API_URL}/api/templates', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setTemplates(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching templates:', err);
            setError('Failed to fetch templates. Please ensure the backend is running and you are authenticated.');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this template? This action cannot be undone.')) {
            try {
                await axios.delete(`${API_URL}/api/templates/${id}`, {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                fetchTemplates(); // Re-fetch templates after deletion
            } catch (err) {
                console.error('Error deleting template:', err);
                setError('Failed to delete template. You might not have the necessary permissions.');
            }
        }
    };

    if (loading) return <p className="p-6 text-lg text-gray-600">Loading templates...</p>;
    if (error) return (
        <div className="p-6">
            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
            </p>
            <button onClick={fetchTemplates} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Try Again
            </button>
        </div>
    );

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Manage Templates</h2>
                <Link to="/admin/templates/new" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    <span>Add New Template</span>
                </Link>
            </div>

            {templates.length === 0 ? (
                <p className="text-center text-gray-600 text-lg mt-10">No templates found. Start by adding a new one!</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {templates.map((template) => (
                                <tr key={template._id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900 font-medium">{template.name}</td>
                                    <td className="py-4 px-6 text-sm text-gray-500 max-w-xs truncate">{template.description}</td>
                                    <td className="py-4 px-6">
                                        <img
                                            src={template.previewImageUrl}
                                            alt={template.name}
                                            className="w-24 h-auto rounded-md shadow-sm border border-gray-200 object-cover"
                                        />
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{template.category}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                                        <Link to={`/admin/templates/edit/${template._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                        <button onClick={() => handleDelete(template._id)} className="text-red-600 hover:text-red-900 focus:outline-none">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TemplateList;