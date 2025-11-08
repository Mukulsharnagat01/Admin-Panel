// client/src/pages/TemplateForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TemplateForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const [category, setCategory] = useState('General');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams(); // Get ID if in edit mode

    useEffect(() => {
        if (id) {
            const fetchTemplate = async () => {
                setLoading(true);
                try {
                    const res = await axios.get(`${API_URL}/api/templates/${id}`, {
                        headers: { 'x-auth-token': localStorage.getItem('token') }
                    });
                    const { name, description, previewImageUrl, category } = res.data;
                    setName(name);
                    setDescription(description);
                    setPreviewImageUrl(previewImageUrl);
                    setCategory(category);
                } catch (err) {
                    console.error('Error fetching template for edit:', err);
                    setError('Failed to load template for editing. It might not exist or you lack permission.');
                } finally {
                    setLoading(false);
                }
            };
            fetchTemplate();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const templateData = { name, description, previewImageUrl, category };
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        };

        try {
            if (id) {
                await axios.put(`${API_URL}/api/templates/${id}`, templateData, config);
                setSuccess('Template updated successfully!');
            } else {
                await axios.post('${API_URL}/api/templates', templateData, config);
                setSuccess('Template created successfully!');
            }
            setTimeout(() => navigate('/admin/templates'), 1500);
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data.msg || 'An error occurred.' : 'An error occurred. Check network or server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{id ? 'Edit Template' : 'Create New Template'}</h2>

                {error && (
                    <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
                        {success}
                    </p>
                )}

                {loading && id && !name ? ( // Show loading only when fetching existing template for edit
                    <p className="text-center text-gray-600 text-lg">Loading template data...</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Template Name:</label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                            <textarea
                                id="description"
                                rows="4"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="previewImageUrl" className="block text-gray-700 text-sm font-bold mb-2">Preview Image URL:</label>
                            <input
                                type="url"
                                id="previewImageUrl"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                value={previewImageUrl}
                                onChange={(e) => setPreviewImageUrl(e.target.value)}
                                required
                            />
                            {previewImageUrl && (
                                <div className="mt-4 text-center">
                                    <img src={previewImageUrl} alt="Template Preview" className="max-w-xs h-auto border border-gray-300 rounded-md shadow-md mx-auto" />
                                </div>
                            )}
                        </div>
                        <div className="mb-8">
                            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
                            <input
                                type="text"
                                id="category"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/templates')}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Saving...' : (id ? 'Update Template' : 'Create Template')}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default TemplateForm;