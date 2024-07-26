import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import { Home } from "../Pages/Home";
import PrivateRoutes from "../Components/PrivateRoutes";
import { ResumeDashboard } from "../Pages/ResumeDashboard";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/home"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      />
      <Route path="/resumedashbord" element={<ResumeDashboard />} />
    </Routes>
  );
};