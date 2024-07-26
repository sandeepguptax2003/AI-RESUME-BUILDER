import { Navbar } from "../Components/Navbar";
import TemplateSelection from "./TemplateSelection";
import UserProfileForm from "./UserProfileForm";
import  StateContext  from "../Context/StateContext";

export const ResumeDashboard = () => {
  return (
    <StateContext>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="flex flex-row">
          {/* Left Side: User Profile Form */}
          <div className="w-1/2 p-4">
            <UserProfileForm />
          </div>
          {/* Right Side: Template Selection */}
          <div className="w-1/2 p-4">
            <TemplateSelection />
          </div>
        </div>
      </div>
    </StateContext>
  );
};