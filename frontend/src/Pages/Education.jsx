import { useContext } from "react";
import { State } from "../Context/StateContext";

const EducationSection = () => {
  const { education } = useContext(State);

  return (
    <div className=" text-left w-64 -mt-10" >
          <hr className="h-px my-8 bg-gray-500 border-0 dark:bg-gray-900 mb-5"></hr>
      <h3 className="text-xl font-bold mb-2">Education</h3>
      {education.length === 0 ? (
        <p className="text-gray-500">No education information available.</p>
      ) : (
        education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-semibold text-lg">{edu.institution}</h4>
            <p className="font-medium">{edu.degree }</p>
            <p>
              {edu.startDate} - {edu.endDate}
            </p>
            <p>{edu.description }</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EducationSection;