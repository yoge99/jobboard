import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const MyJobs = () => {

  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {

    const res = await api.get("/jobs/mine/list");

    setJobs(res.data.data);

  };

  useEffect(() => {

    fetchJobs();

  }, []);

  const deleteJob = async (id) => {

    if (!window.confirm("Delete this Job?")) return;

    await api.delete(`/jobs/${id}`);

    toast.success("Deleted Successfully");

    fetchJobs();

  };

  return (

    <div className="max-w-6xl mx-auto mt-10">

      <h1 className="text-4xl font-bold mb-8">
        My Jobs
      </h1>

      <div className="space-y-5">

        {jobs.map((job) => (

          <div
            key={job.id}
            className="bg-white shadow rounded-xl p-5 flex justify-between items-center"
          >

            <div>

              <h2 className="font-bold text-xl">
                {job.title}
              </h2>

              <p>{job.location}</p>

              <p>{job.job_type}</p>

            </div>

            <button
              onClick={() => deleteJob(job.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default MyJobs;