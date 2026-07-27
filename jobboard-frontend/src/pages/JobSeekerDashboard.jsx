import { Link } from "react-router-dom";

const JobSeekerDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10">

      <h1 className="text-4xl font-bold mb-8">
        Job Seeker Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <Link
          to="/"
          className="bg-indigo-600 text-white p-8 rounded-xl text-center"
        >
          Browse Jobs
        </Link>

        <Link
          to="/my-applications"
          className="bg-green-600 text-white p-8 rounded-xl text-center"
        >
          My Applications
        </Link>

      </div>

    </div>
  );
};

export default JobSeekerDashboard;