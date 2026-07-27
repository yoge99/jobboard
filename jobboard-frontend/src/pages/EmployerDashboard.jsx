import { Link } from "react-router-dom";

const EmployerDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10">

      <h1 className="text-4xl font-bold mb-8">
        Employer Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Link
          to="/create-job"
          className="bg-indigo-600 text-white p-8 rounded-xl text-center shadow"
        >
          Create Job
        </Link>

        <Link
          to="/my-jobs"
          className="bg-green-600 text-white p-8 rounded-xl text-center shadow"
        >
          My Jobs
        </Link>

        <Link
          to="/"
          className="bg-orange-500 text-white p-8 rounded-xl text-center shadow"
        >
          Browse Jobs
        </Link>

      </div>

    </div>
  );
};

export default EmployerDashboard;