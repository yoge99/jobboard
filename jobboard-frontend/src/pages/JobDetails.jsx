import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  const [resume, setResume] = useState("");

  const [cover, setCover] = useState("");

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    const res = await api.get(`/jobs/${id}`);
    setJob(res.data.data);
  };

  const applyJob = async () => {
    try {
      await api.post(`/jobs/${id}/applications`, {
        resume_link: resume,
        cover_letter: cover,
      });

      toast.success("Applied Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  if (!job) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">

      <h1 className="text-4xl font-bold">{job.title}</h1>

      <p className="mt-3 text-gray-600">{job.company_name}</p>

      <p className="mt-2">📍 {job.location}</p>

      <p className="mt-5">{job.description}</p>

      <div className="mt-8 space-y-3">

        <input
          placeholder="Resume Link"
          className="border w-full p-3 rounded"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />

        <textarea
          rows="5"
          placeholder="Cover Letter"
          className="border w-full p-3 rounded"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />

        <button
          onClick={applyJob}
          className="bg-indigo-600 text-white px-6 py-3 rounded"
        >
          Apply
        </button>

      </div>

    </div>
  );
};

export default JobDetails;