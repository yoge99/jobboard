import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const Applications = () => {
  const { id } = useParams();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const res = await api.get(`/jobs/${id}/applications`);
    setApplications(res.data.data);
  };

  const updateStatus = async (appId, status) => {
    await api.patch(`/applications/${appId}/status`, { status });

    toast.success("Status Updated");

    fetchApplications();
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">

      <h1 className="text-4xl font-bold mb-8">
        Applications
      </h1>

      {applications.map((app) => (
        <div
          key={app.id}
          className="bg-white shadow rounded-xl p-5 mb-5"
        >

          <h2 className="font-bold">
            {app.applicant_name}
          </h2>

          <p>{app.applicant_email}</p>

          <a
            href={app.resume_link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600"
          >
            Resume
          </a>

          <p className="my-3">
            {app.cover_letter}
          </p>

          <select
            value={app.status}
            onChange={(e) =>
              updateStatus(app.id, e.target.value)
            }
            className="border p-2 rounded"
          >
            <option>pending</option>
            <option>reviewed</option>
            <option>accepted</option>
            <option>rejected</option>
          </select>

        </div>
      ))}

    </div>
  );
};

export default Applications;