import { useContext } from "react";
import { State } from "../Context/StateContext";

const SkillsSection = () => {
  const { skills } = useContext(State);

  return (
    <>
      <div className="mb-4 text-left w-96" >
        <h3 className="text-xl font-bold">Skills</h3>
        {skills.length === 0 ? (
          <p className="text-gray-500"></p>
        ) : (
          <ul className="list-disc ml-5">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SkillsSection;