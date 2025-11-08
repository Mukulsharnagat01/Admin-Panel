// server/routes/templateRoutes.js
const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');
const auth = require('../middleware/authMiddleware'); // For protecting admin routes

// @route   GET /api/templates
// @desc    Get all templates
// @access  Public
router.get('/', templateController.getAllTemplates);

// @route   GET /api/templates/:id
// @desc    Get single template by ID
// @access  Public
router.get('/:id', templateController.getTemplateById);

// @route   POST /api/templates
// @desc    Create a template
// @access  Private (Admin)
router.post('/', auth, templateController.createTemplate); // Protect with auth middleware

// @route   PUT /api/templates/:id
// @desc    Update a template
// @access  Private (Admin)
router.put('/:id', auth, templateController.updateTemplate); // Protect with auth middleware

// @route   DELETE /api/templates/:id
// @desc    Delete a template
// @access  Private (Admin)
router.delete('/:id', auth, templateController.deleteTemplate); // Protect with auth middleware

module.exports = router;