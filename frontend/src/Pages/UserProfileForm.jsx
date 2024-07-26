import { useContext, useState } from "react";
import { State } from "../Context/StateContext";
import { FaTimes } from "react-icons/fa";

export const UserProfileForm = () => {
  const {
    profile,
    setProfile,
    title,
    setTitle,
    personalInfo,
    setPersonalInfo,
    workExperience,
    addWorkExperience,
    deleteWorkExperience,
    editWorkExperience,
    education,
    addEducation,
    deleteEducation,
    editEducation,
    skills,
    addSkill,
    deleteSkill,
  } = useContext(State);

  // Local state for new entries and editing
  const [newExperience, setNewExperience] = useState({});
  const [newEducation, setNewEducation] = useState({});
  const [newSkill, setSkills] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const handleSkillAdd = (e) => {
    if (e.key === "Enter") {
      addSkill(newSkill);
      setSkills(""); // Clear input
    }
  };

  const handleAddExperience = () => {
    if (editMode) {
      editWorkExperience(editingIndex, newExperience);
      setEditMode(false);
      setEditingIndex(null);
    } else {
      addWorkExperience(newExperience);
    }
    setNewExperience({});
  };

  const handleAddEducation = () => {
    if (editMode) {
      editEducation(editingIndex, newEducation);
      setEditMode(false);
      setEditingIndex(null);
    } else {
      addEducation(newEducation);
    }
    setNewEducation({});
  };

  const handleEditExperience = (index) => {
    setNewExperience(workExperience[index]);
    setEditMode(true);
    setEditingIndex(index);
  };

  const handleEditEducation = (index) => {
    setNewEducation(education[index]);
    setEditMode(true);
    setEditingIndex(index);
  };

  const handleSubmit = async () => {
    const data = {
      profile,
      title,
      personalInfo,
      workExperience,
      education,
      skills,
    };

    try {
      const response = await fetch(
        "https://resume-assignment.onrender.com/api/resumes/postresume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Resume posted successfully.");
      } else {
        console.error("Error posting resume:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6 flex flex-col">
      {/* Title  */}
      <section className="border-b pb-4">
        <h2 className="text-xl font-semibold mb-2">Profile Summary</h2>
        <textarea
          type="text"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your profile summary"
        />
      </section>

      {/* Title */}
      <section className="border-b pb-4">
        <h2 className="text-xl font-semibold mb-2">Title</h2>
        <textarea
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your title"
        />
      </section>

      {/* Personal */}
      <section className="border-b pb-4">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={personalInfo.name}
            onChange={handlePersonalInfoChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handlePersonalInfoChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            value={personalInfo.phone}
            onChange={handlePersonalInfoChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone"
          />
          <input
            type="text"
            name="address"
            value={personalInfo.address}
            onChange={handlePersonalInfoChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Address"
          />
        </div>
      </section>

      {/* Work*/}
      <section className="border-b pb-4">
        <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
        {workExperience.map((exp, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium">
              {exp.company} - {exp.position}
            </p>
            <p className="text-sm text-gray-600">
              {exp.startDate} - {exp.endDate}
            </p>
            <p>{exp.description}</p>
            <button
              onClick={() => handleEditExperience(index)}
              className="text-blue-500 hover:underline mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteWorkExperience(index)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
        <div className="mt-4">
          <input
            type="text"
            name="company"
            value={newExperience.company || ""}
            onChange={handleExperienceChange}
            className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Company"
          />
          <input
            type="text"
            name="position"
            value={newExperience.position || ""}
            onChange={handleExperienceChange}
            className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Position"
          />
          <input
            type="text"
            name="startDate"
            value={newExperience.startDate || ""}
            onChange={handleExperienceChange}
            className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Start Date"
          />
          <input
            type="text"
            name="endDate"
            value={newExperience.endDate || ""}
            onChange={handleExperienceChange}
            className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="End Date"
          />
          <textarea
            name="description"
            value={newExperience.description || ""}
            onChange={handleExperienceChange}
            className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
          />
          <button
            onClick={handleAddExperience}
            className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
          >
            {editMode ? "Update Experience" : "Add Experience"}
          </button>
        </div>
      </section>

      {/* Education*/}
      <section className="border-b pb-4">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium">
              {edu.institution} - {edu.degree}
            </p>
            <p className="text-sm text-gray-600">
              {edu.startDate} - {edu.endDate}
            </p>
            <p>{edu.description}</p>
            <button
              onClick={() => handleEditEducation(index)}
              className="text-blue-500 hover:underline mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteEducation(index)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
        <div className="mt-4">
          <input
            type="text"
            name="institution"
            value={newEducation.institution || ""}
            onChange={handleEducationChange}
            className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Institution"
          />
          <input
            type="text"
            name="degree"
            value={newEducation.degree || ""}
            onChange={handleEducationChange}
            className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Degree"
          />
          <input
            type="text"
            name="startDate"
            value={newEducation.startDate || ""}
            onChange={handleEducationChange}
            className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Start Date"
          />
          <input
            type="text"
            name="endDate"
            value={newEducation.endDate || ""}
            onChange={handleEducationChange}
            className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="End Date"
          />
          <textarea
            name="description"
            value={newEducation.description || ""}
            onChange={handleEducationChange}
            className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
          />
          <button
            onClick={handleAddEducation}
            className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
          >
            {editMode ? "Update Education" : "Add Education"}
          </button>
        </div>
      </section>

      {/* Skills  */}
      <section className="border-b pb-4">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
            >
              {skill}
              <button
                onClick={() => deleteSkill(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <FaTimes />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setSkills(e.target.value)}
          onKeyDown={handleSkillAdd}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a skill and press Enter"
        />
      </section>

      
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default UserProfileForm;