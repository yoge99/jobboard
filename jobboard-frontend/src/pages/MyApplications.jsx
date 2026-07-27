// import { useEffect, useState } from "react";
// import api from "../services/api";

// const MyApplications = () => {

//   const [applications, setApplications] = useState([]);

//   useEffect(() => {

//     fetchApplications();

//   }, []);

//   const fetchApplications = async () => {

//     const res = await api.get("/applications/mine");

//     setApplications(res.data.data);

//   };

//   return (
//     <div
//   key={app.id}
//   className="bg-white rounded-2xl shadow-md p-6 mb-5 hover:shadow-xl transition"
// >
//   <div className="flex justify-between items-start">

//     <div>

//       <h2 className="text-2xl font-bold text-gray-800">
//         {app.job_title}
//       </h2>

//       <p className="text-gray-600 mt-2">
//         🏢 {app.company_name}
//       </p>

//       <p className="text-gray-600 mt-1">
//         📍 {app.location}
//       </p>

//       <p className="text-gray-600 mt-1">
//         📅 Applied on{" "}
//         {new Date(app.created_at).toLocaleDateString()}
//       </p>

//     </div>

//     <span
//       className={`px-4 py-2 rounded-full text-white font-semibold
//       ${
//         app.status === "accepted"
//           ? "bg-green-500"
//           : app.status === "pending"
//           ? "bg-yellow-500"
//           : app.status === "reviewed"
//           ? "bg-blue-500"
//           : "bg-red-500"
//       }`}
//     >
//       {app.status.toUpperCase()}
//     </span>

//   </div>

//   <div className="mt-6">
//     <a
//       href={app.resume_link}
//       target="_blank"
//       rel="noreferrer"
//       className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
//     >
//       View Resume
//     </a>
//   </div>
// </div>

//     // <div className="max-w-6xl mx-auto mt-10">

//     //   <h1 className="text-4xl font-bold mb-8">
//     //     My Applications
//     //   </h1>

//     //   {applications.map((app) => (

//     //     <div
//     //       key={app.id}
//     //       className="bg-white rounded-xl shadow p-5 mb-5"
//     //     >

//     //       <h2 className="font-bold text-xl">
//     //         {app.job_title}
//     //       </h2>

//     //       <p>{app.company_name}</p>

//     //       <p>{app.location}</p>

//     //       <span className="inline-block mt-3 bg-indigo-100 px-4 py-1 rounded">
//     //         {app.status}
//     //       </span>

//     //     </div>

//     //   ))}

//     // </div>

//   );

// };

// export default MyApplications;  


import { useEffect, useState } from "react";
import api from "../services/api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications/mine");
      setApplications(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">

      <h1 className="text-4xl font-bold mb-8">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">
          No applications found.
        </p>
      ) : (
        applications.map((app) => (
            <div
  key={app.id}
  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 p-6 mb-6"
>
  <div className="flex justify-between items-start">

    <div className="space-y-2">

      <h2 className="text-2xl font-bold text-gray-900">
        💼 {app.job_title || "Job Title"}
      </h2>

      <p className="text-gray-700 font-medium">
        🏢 {app.company_name || "Company"}
      </p>

      <p className="text-gray-500">
        📍 {app.location || "Location"}
      </p>

      {app.salary_min && app.salary_max && (
        <p className="text-green-600 font-semibold">
          💰 ₹{app.salary_min.toLocaleString()} - ₹{app.salary_max.toLocaleString()}
        </p>
      )}

      <p className="text-sm text-gray-400">
        📅 Applied on{" "}
        {app.created_at
          ? new Date(app.created_at).toLocaleDateString()
          : "N/A"}
      </p>

    </div>

    <span
      className={`px-4 py-2 rounded-full text-sm font-semibold ${
        app.status === "accepted"
          ? "bg-green-100 text-green-700"
          : app.status === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : app.status === "reviewed"
          ? "bg-blue-100 text-blue-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {app.status}
    </span>

  </div>

  <div className="mt-6 flex gap-3">

    <a
      href={app.resume_link}
      target="_blank"
      rel="noreferrer"
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
    >
      View Resume
    </a>

  </div>
</div>
        ))       
      )}
    </div>
  );
};

export default MyApplications;