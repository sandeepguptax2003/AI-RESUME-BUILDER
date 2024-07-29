import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/icons8-fill-and-sign.gif";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="bg-gray-100 py-4">
      <nav className="flex items-center justify-between mx-auto w-11/12 lg:w-9/12">
        <div className="flex items-center">
          <Link to={"/home"}>
            <img src={logo} alt="Logo" className="w-20 cursor-pointer" />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-lg">
            <span className="text-green-600 text-xl font-bold">
              
            </span>
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg focus:outline-none"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};
