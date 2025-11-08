// server/models/Template.js
const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    previewImageUrl: { type: String, required: true }, // URL to a static image of the template
    // You might want a more complex structure here later, e.g., JSON for editable fields
    // contentSchema: { type: Object, required: false }
    category: { type: String, default: 'General' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Template', TemplateSchema);