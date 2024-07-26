import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const State = createContext();

function StateContext({ children }) {
  const [title, setTitle] = useState("");
  const [profile, setProfile] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [workExperience, setWorkExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);

  const addWorkExperience = (newExperience) => {
    setWorkExperience([...workExperience, newExperience]);
  };

  const editWorkExperience = (index, updatedExperience) => {
    const updatedWorkExperience = workExperience.map((exp, i) =>
      i === index ? updatedExperience : exp
    );
    setWorkExperience(updatedWorkExperience);
  };

  const deleteWorkExperience = (index) => {
    const updatedWorkExperience = workExperience.filter((_, i) => i !== index);
    setWorkExperience(updatedWorkExperience);
  };

  const addEducation = (newEducation) => {
    setEducation([...education, newEducation]);
  };

  const editEducation = (index, updatedEducation) => {
    const updatedEducationList = education.map((edu, i) =>
      i === index ? updatedEducation : edu
    );
    setEducation(updatedEducationList);
  };

  const deleteEducation = (index) => {
    const updatedEducationList = education.filter((_, i) => i !== index);
    setEducation(updatedEducationList);
  };

  const addSkill = (skill) => {
    setSkills([...skills, skill]);
  };

  const deleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const context = {
    title,
    setTitle,
    profile,
    setProfile,
    personalInfo,
    setPersonalInfo,
    workExperience,
    addWorkExperience,
    editWorkExperience,
    deleteWorkExperience,
    education,
    addEducation,
    editEducation,
    deleteEducation,
    skills,
    addSkill,
    deleteSkill,
  };

  return <State.Provider value={context}>{children}</State.Provider>;
}

export default StateContext;

StateContext.propTypes = {
  children: PropTypes.node.isRequired,
};