import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          JobBoard
        </Link>

        <div className="space-x-4">

          <Link to="/">Home</Link>

          {!user && (
            <>
              <Link to="/login">Login</Link>

              <Link to="/register">Register</Link>
            </>
          )}

          {user?.role === "employer" && (
            <>
              <Link to="/employer/dashboard">
                Dashboard
              </Link>

              <Link to="/create-job">
                Create Job
              </Link>

              <Link to="/my-jobs">
                My Jobs
              </Link>
            </>
          )}

          {user?.role === "jobseeker" && (
            <>
              <Link to="/jobseeker/dashboard">
                Dashboard
              </Link>

              <Link to="/my-applications">
                My Applications
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;