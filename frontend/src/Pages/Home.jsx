import { Link } from "react-router-dom";
import { Navbar } from "../Components/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
        <div className="flex w-full max-w-6xl mt-20">
          <div className="flex-1 flex flex-col justify-center p-6 text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Transform Your Career with Cutting-Edge AI!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Harness the power of AI to craft a resume that stands out. Our advanced tools help you showcase your skills and achievements in the most impactful way. Start building your future with a resume that speaks volumes.
            </p>
            <div className="mt-6">
              <div>
                <Link to={"/resumedashbord"}
                  className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
                >
                  <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                    Start Resume
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-6">
            <img
              src="https://www.techyv.com/sites/default/users/Images-Folder/Canvas.jpg"
              alt="Resume Building"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};
