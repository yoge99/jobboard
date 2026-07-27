import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {

  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    job_type: "full-time",
    salary_min: "",
    salary_max: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.post("/jobs", job);

      toast.success("Job Created Successfully");

      navigate("/my-jobs");

    } catch (err) {

      toast.error(err.response?.data?.message);

    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">

      <h1 className="text-3xl font-bold mb-6">
        Create Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          name="title"
          placeholder="Job Title"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded"
          rows="5"
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <select
          name="job_type"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        >
          <option>full-time</option>
          <option>part-time</option>
          <option>contract</option>
          <option>internship</option>
          <option>remote</option>
        </select>

        <input
          name="salary_min"
          placeholder="Minimum Salary"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="salary_max"
          placeholder="Maximum Salary"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <button className="bg-indigo-600 text-white px-8 py-3 rounded">
          Create Job
        </button>

      </form>

    </div>
  );
};

export default CreateJob;