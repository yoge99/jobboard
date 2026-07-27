import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import EmployerDashboard from "./pages/EmployerDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";

import CreateJob from "./pages/CreateJob";
import MyJobs from "./pages/MyJobs";

import Applications from "./pages/Applications";
import MyApplications from "./pages/MyApplications";

import JobDetails from "./pages/JobDetails";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* Employer */}

        <Route
          path="/employer/dashboard"
          element={
            <ProtectedRoute role="employer">
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-job"
          element={
            <ProtectedRoute role="employer">
              <CreateJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute role="employer">
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications/:id"
          element={
            <ProtectedRoute role="employer">
              <Applications />
            </ProtectedRoute>
          }
        />

        {/* Jobseeker */}

        <Route
          path="/jobseeker/dashboard"
          element={
            <ProtectedRoute role="jobseeker">
              <JobSeekerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute role="jobseeker">
              <MyApplications />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;