// src/Pages/AiSuggestions.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AiSuggestions = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [error, setError] = useState('');

  const handleGenerateSuggestions = async () => {
    setError('');
    setSuggestions('');

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('You must be logged in to use this feature.');
        return;
      }

      const response = await axios.post(
        'https://ai-resume-builder-backend-3nc0.onrender.com/api/resumes/ai-suggestions',
        { jobDescription },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setSuggestions(response.data.suggestions);
    } catch (err) {
      setError('Failed to fetch suggestions. Please try again.');
    }
  };

  return (
    <div className="p-5 bg-gray-100 shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">AI Suggestions</h2>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Enter Job Description..."
        className="w-full p-2 mb-4 border rounded"
        rows="5"
      />
      {suggestions && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">AI-Tailored Response</h3>
          <p>{suggestions}</p>
        </div>
      )}
      {error && (
        <div className="mb-4 text-red-500">
          {error}
        </div>
      )}
      <button
        onClick={handleGenerateSuggestions}
        className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition-all duration-150"
      >
        Generate Suggestions
      </button>
    </div>
  );
};

export default AiSuggestions;
