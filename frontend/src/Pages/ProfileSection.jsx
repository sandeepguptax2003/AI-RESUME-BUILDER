import { useContext } from "react";
import { State } from "../Context/StateContext";
const ProfileSection = () => {
  const { profile } = useContext(State); 
  return (
    <div className="mb-4 text-left">
      <h3 className="text-xl font-bold">Profile</h3>
      <p>{profile}</p>
      <hr className="h-px my-8 bg-gray-500 border-0 dark:bg-gray-900"></hr>
    </div>
  );
};

export default ProfileSection;