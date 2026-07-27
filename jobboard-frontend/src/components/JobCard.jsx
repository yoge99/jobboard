import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">

      <h2 className="text-xl font-bold text-slate-800">
        {job.title}
      </h2>

      <p className="text-gray-600 mt-2">
        {job.company_name}
      </p>

      <p className="mt-2">
        📍 {job.location}
      </p>

      <p className="mt-2 text-indigo-600 font-semibold">
        {job.job_type}
      </p>

      <p className="mt-2 font-medium">
        ₹{job.salary_min} - ₹{job.salary_max}
      </p>

      <Link
        to={`/jobs/${job.id}`}
        className="mt-5 inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
      >
        View Details
      </Link>

    </div>
  );
};

export default JobCard;