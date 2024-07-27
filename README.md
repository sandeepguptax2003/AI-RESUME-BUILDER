# AI-Powered Resume Builder

An innovative full-stack application that leverages AI to help users create and optimize their resumes.

## 🌟 Live Demo

- Frontend: [https://ai-resume-builders.netlify.app/](https://ai-resume-builders.netlify.app/)
- Backend API: [https://ai-resume-builder-backend-3nc0.onrender.com](https://ai-resume-builder-backend-3nc0.onrender.com)

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT
- **Resume Management**: Create, edit, and delete resumes
- **AI-Powered Suggestions**: Get content suggestions using Gemini's API
- **Real-Time Preview**: See your resume update as you type

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- GeminiAI API

### Frontend
- React (Vite)
- React Router for navigation
- Axios for API requests
- TailwindCSS for styling
- React Icons
- React-toastify for notifications
- HTML2Canvas & jsPDF for PDF generation

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/resumes` | Create a new resume |
| GET | `/api/resumes` | Get all resumes |
| GET | `/api/resumes/:id` | Get a specific resume |
| PUT | `/api/resumes/:id` | Update a resume |
| DELETE | `/api/resumes/:id` | Delete a resume |
| POST | `/api/resumes/ai-suggestions` | Get AI-powered suggestions |

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- GeminiAI API key

### Installation

1. Clone the repository:git clone https://github.com/sandeepguptax2003/AI-RESUME-BUILDER.git
cd ai-powered-resume-builder

2. Install backend dependencies:
cd backend
npm install

3. Set up environment variables:
Create a `.env` file in the backend directory with the following:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_geminiai_api_key

4. Start the backend server:
nodemon app.js

5. Install frontend dependencies:
cd ../frontend
npm install

6. Start the frontend development server:
npm run dev

7. Open your browser and navigate to `http://localhost:5173`

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/sandeepguptax2003/AI-RESUME-BUILDER/issues).

## 📝 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
