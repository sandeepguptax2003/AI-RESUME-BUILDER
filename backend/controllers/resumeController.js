const Resume = require('../models/Resume');
const openaiService = require('../services/openaiService');

//Function to handle the creation of a new resume
exports.createResume = async (req, res) => {
  try {
    const { title, sections } = req.body;
    const userId = req.user.userId;

    //Create a new Resume
    const newResume = new Resume({
      userId,
      title,
      sections: sections.map(({ title, content }) => ({ title, content }))
    });

    await newResume.save();
    
    res.status(201).json({
      message: 'Resume created successfully',
      resume: {
        id: newResume._id,
        userId: newResume.userId,
        title: newResume.title,
        sections: newResume.sections,
        createdAt: newResume.createdAt,
        updatedAt: newResume.updatedAt
      }
    });
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ message: 'Error creating resume', error: error.stack });
  }
};

//Function to fetch all resumes
exports.getResumes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const resumes = await Resume.find({ userId });
    
    if (resumes.length === 0) {
      return res.status(200).json({ message: 'There are no resumes currently. Please create one.' });
    }
    
    res.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ message: 'Error fetching resumes', error: error.stack });
  }
};

//Function to fetch a specific resume by its ID
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ message: 'Error fetching resume', error: error.stack });
  }
};

//Function to update an existing resume
exports.updateResume = async (req, res) => {
  try {
    const { title, sections } = req.body;
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.userId });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    resume.title = title;
    resume.sections = sections;
    resume.updatedAt = Date.now();

    await resume.save();
    res.json({ message: 'Resume updated successfully', resume });
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({ message: 'Error updating resume', error: error.stack });
  }
};

//Function to delete resume by ID
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ message: 'Error deleting resume', error: error.stack });
  }
};

//Function to get AI-based suggestions for a job description
exports.getAISuggestions = async (req, res) => {
  console.log('Received request body:', req.body);
  try {
    const { jobDescription } = req.body;
    
    if (!jobDescription) {
      return res.status(400).json({ message: "Job description is required" });
    }

    const suggestions = await openaiService.getAISuggestions(null, jobDescription);
    res.json({ suggestions });
  } catch (error) {
    console.error('Error in getAISuggestions:', error);
    res.status(500).json({ 
      message: "Error getting AI suggestions", 
      error: error.message 
    });
  }
};

