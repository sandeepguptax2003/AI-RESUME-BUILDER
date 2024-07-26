import { useContext } from "react";
import {State} from "../Context/StateContext";
const Header = () => {
  const { title, personalInfo } = useContext(State);
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
      <h2 className="text-lg font-semibold mt-5">{title}</h2>

      <hr className="h-px my-8 bg-gray-500 border-0 dark:bg-gray-900"></hr>
    </div>
  );
};

export default Header