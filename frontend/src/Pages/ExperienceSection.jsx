import { useContext } from "react";
import { State } from "../Context/StateContext";

const ExperienceSection = () => {
  const { workExperience } = useContext(State);

  return (
    <div className="mb-4 text-left">
      <h3 className="text-xl font-bold mb-2">Experience</h3>
      {workExperience.length === 0 ? (
        <p className="text-gray-500">
          No work experience information available.
        </p>
      ) : (
        workExperience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-semibold text-lg">{exp.position}</h4>
            <p className="font-medium">{exp.company}</p>
            <p>
              {exp.startDate} - {exp.endDate}
            </p>
            <p>{exp.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ExperienceSection;