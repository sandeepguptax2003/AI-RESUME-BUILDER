import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import ContactSection from "./Contact Section";
import EducationSection from "./Education";
import ExperienceSection from "./ExperienceSection";
import Header from "./Header";
import ProfileSection from "./ProfileSection";
import SkillsSection from "./Skills";

export const TemplateSelection = () => {
  const componentRef = useRef();
  const [jobDescription, setJobDescription] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    const element = componentRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("resume.pdf");
  };

  const handleGenerateSuggestions = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('You must be logged in to use this feature.');
        setLoading(false);
        return;
      }
  
      const response = await axios.post(
        "https://ai-resume-builder-backend-3nc0.onrender.com/api/resumes/ai-suggestions",
        { jobDescription },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setAiResponse(response.data.suggestions);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      setError("Failed to fetch suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="bg-white p-5 shadow-lg max-w-4xl mx-auto mt-10"
        ref={componentRef}
      >
        <Header />
        <ContactSection />
        <div className="grid grid-cols-3" style={{ gap: "50%" }}>
          <div className="col-span-1 ml-10">
            <SkillsSection />
          </div>
          <div className="col-span-2 ml-10">
            <ProfileSection />
          </div>
        </div>
        <div className="grid grid-cols-3" style={{ gap: "50%" }}>
          <div className="col-span-1 ml-10">
            <EducationSection />
          </div>
          <div className="col-span-2 ml-10">
            <ExperienceSection />
          </div>
        </div>
      </div>

      {/* Resume Download Button */}
      <button
        onClick={handleDownload}
        className="bg-blue-500 mt-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400"
      >
        Download Resume
      </button>

      {/* AI Suggestions Section */}
      <div className="bg-white p-5 shadow-lg max-w-4xl mx-auto mt-10 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">AI Suggestions</h2>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="jobDescription">
            Enter Job Description...
          </label>
          <textarea
            id="jobDescription"
            className="w-full h-40 p-2 border rounded-lg"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter job description here..."
          />
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">AI-Tailored Response</h3>
          <div className="p-4 border rounded-lg bg-gray-50 min-h-[100px]">
            {loading ? "Loading suggestions..." : aiResponse || error || "Your AI-generated suggestions will appear here..."}
          </div>
        </div>
        <button
          onClick={handleGenerateSuggestions}
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-all duration-150"
        >
          Generate Suggestions
        </button>
      </div>
    </>
  );
};

export default TemplateSelection;
