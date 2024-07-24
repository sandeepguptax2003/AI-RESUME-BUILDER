const express = require('express');
const router = express.Router();
const { 
    createResume, 
    getResumes, 
    getResumeById, 
    updateResume, 
    deleteResume, 
    getAISuggestions 
} = require('../controllers/resumeController');
const auth = require('../middleware/auth');

// All routes in this file should be protected
router.use(auth);

// Create a new resume
router.post('/', createResume);

// Get all resumes for the logged-in user
router.get('/', getResumes);

// Get a specific resume by ID
router.get('/:id', getResumeById);

// Update a resume
router.put('/:id', updateResume);

// Delete a resume
router.delete('/:id', deleteResume);

// Get AI suggestions for a resume
router.post('/ai-suggestions/:id', getAISuggestions);

module.exports = router;