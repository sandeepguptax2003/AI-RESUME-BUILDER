import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState(""); // This will be sent as username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const response = await axios.post(
        "https://ai-resume-builder-backend-3nc0.onrender.com/api/auth/register",
        {
          username: name, // Send as 'username' to match backend
          email,
          password,
        }
      );
      console.log(response);
      toast.success("Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      const errorMessage =
        err.response?.data?.msg || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <body className="bg-[#002D74]">
      <section className="flex items-center justify-center min-h-screen">
        <div
          className="bg-gray-100 p-5 flex rounded-2xl shadow-lg"
          style={{ width: "70%" }}
        >
          <div className="md:w-4/5 px-7">
            <h2 className="text-2xl font-bold text-[#002D74]">Register</h2>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Username</label> {/* Updated label */}
                <input
                  type="text"
                  placeholder="Enter Your Username"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoComplete="off"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mt-5">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
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
                  placeholder="Enter Password"
                  minLength="1"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Registering..." : "Register"} {/* Loading text */}
              </button>
            </form>
            <div className="text-sm flex justify-between items-center mt-3">
              <p>Already have an account?</p>
              <Link to={"/"}>
                <button className="py-2 px-5 ml-3 bg-[#E0F7FA] border rounded-xl hover:scale-110 duration-300 border-blue-400">
                  Login
                </button>
              </Link>
            </div>
          </div>
          <div className="w-4/5 md:block hidden">
            <img
              src="https://blog.tatanexarc.com/wp-content/uploads/2023/03/How-much-does-GeM-registration-cost-1.jpg"
              className="rounded-2xl h-full"
              alt="page img"
            />
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

export default Signup;
