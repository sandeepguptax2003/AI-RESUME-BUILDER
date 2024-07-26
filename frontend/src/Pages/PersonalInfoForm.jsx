import  { useContext } from "react";
import { State } from "../Context/StateContext";

const PersonalInfoForm = () => {
  const { personalInfo } = useContext(State);
  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold">Contact</h3>
      <p>{personalInfo.phone}</p>
      <p>{personalInfo.email}</p>
      <p>{personalInfo.address}</p>
    </div>
  );
};

export default PersonalInfoForm