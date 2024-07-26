import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://ai-resume-builder-backend-3nc0.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token, name } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userName", name);

      toast.success("Login successful!");
      setEmail("");
      setPassword("");
      setIsLoading(false);
      navigate("/home");
    } catch (err) {
      const errorMessage =
        err.response?.data?.msg || "Login failed. Please try again.";
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <body className="bg-[#EDF2F7] mt-10">
      <section className="border-red-500 flex items-center justify-center">
        <div
          className="bg-gray-100 p-5 flex rounded-2xl shadow-lg "
          style={{ width: "70%" }}
        >
          <div className="w-4/5 md:block hidden">
            <img
              src="https://blog.tatanexarc.com/wp-content/uploads/2023/03/How-much-does-GeM-registration-cost-1.jpg"
              className="rounded-2xl h-full"
              alt="page img"
            />
          </div>
          <div className="md:w-4/5 px-7">
            <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mt-5">
                  Email Address
                </label>
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="Enter Your Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  autoComplete="off"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>
            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you don’t have an account...</p>
              <Link to={"/signup"}>
                <button className="py-2 px-5 ml-3 bg-blue-200 border rounded-xl hover:scale-110 duration-300 border-blue-400">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </body>
  );
};

export default Login;
