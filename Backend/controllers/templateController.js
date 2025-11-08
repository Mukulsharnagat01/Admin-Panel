// server/controllers/templateController.js
const Template = require('../models/Template');

// Get all templates
exports.getAllTemplates = async (req, res) => {
    try {
        const templates = await Template.find();
        res.json(templates);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get single template by ID
exports.getTemplateById = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);
        if (!template) {
            return res.status(404).json({ msg: 'Template not found' });
        }
        res.json(template);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create a new template (Admin Only)
exports.createTemplate = async (req, res) => {
    const { name, description, previewImageUrl, category } = req.body;
    try {
        let template = await Template.findOne({ name });
        if (template) {
            return res.status(400).json({ msg: 'Template with this name already exists' });
        }

        template = new Template({
            name,
            description,
            previewImageUrl,
            category,
        });

        await template.save();
        res.status(201).json(template);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update a template (Admin Only)
exports.updateTemplate = async (req, res) => {
    const { name, description, previewImageUrl, category } = req.body;
    const templateFields = {};
    if (name) templateFields.name = name;
    if (description) templateFields.description = description;
    if (previewImageUrl) templateFields.previewImageUrl = previewImageUrl;
    if (category) templateFields.category = category;

    try {
        let template = await Template.findById(req.params.id);
        if (!template) {
            return res.status(404).json({ msg: 'Template not found' });
        }

        template = await Template.findByIdAndUpdate(
            req.params.id,
            { $set: templateFields },
            { new: true } // Return the updated document
        );

        res.json(template);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete a template (Admin Only)
exports.deleteTemplate = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);
        if (!template) {
            return res.status(404).json({ msg: 'Template not found' });
        }

        await Template.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Template removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};