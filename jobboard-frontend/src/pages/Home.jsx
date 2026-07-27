import { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/JobCard";

const Home = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    const res = await api.get("/jobs");

    setJobs(res.data.data.jobs);

  };

  return (

    <div className="max-w-7xl mx-auto mt-10">

      <h1 className="text-4xl font-bold mb-8">
        Latest Jobs
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {jobs.map((job) => (

          <JobCard
            key={job.id}
            job={job}
          />

        ))}

      </div>

    </div>

  );

};

export default Home;