import { useContext } from "react";
import { State } from "../Context/StateContext";

const ContactSection = () => {
  const { personalInfo } = useContext(State);

  return (
    <div className="mb-4">
      <div className="flex justify-center" style={{gap:'15%'}}>
        <p className="text-lg font-medium">Phone No: {personalInfo.phone}</p>
        <p className="text-lg font-medium">Email: {personalInfo.email}</p>
        <p className="text-lg font-medium">Address: {personalInfo.address}</p>
      </div>
      <hr className="h-px my-8 bg-gray-500 border-0 dark:bg-gray-900"></hr>
    </div>
  );
};

export default ContactSection;