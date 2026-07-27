import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    name: "",

    email: "",

    password: "",

    role: "jobseeker",

    company_name: "",

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/auth/register", form);

      toast.success("Registered Successfully");

      navigate("/login");

    } catch (err) {

      toast.error(err.response?.data?.message);

    }

  };

  return (

    <div className="flex justify-center mt-12">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-[450px]"
      >

        <h2 className="text-3xl font-bold mb-6">
          Register
        </h2>

        <input
          name="name"
          placeholder="Name"
          className="border p-3 w-full rounded mb-4"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-3 w-full rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-3 w-full rounded mb-4"
          onChange={handleChange}
        />

        <select
          name="role"
          className="border p-3 w-full rounded mb-4"
          onChange={handleChange}
        >

          <option value="jobseeker">
            Job Seeker
          </option>

          <option value="employer">
            Employer
          </option>

        </select>

        {form.role === "employer" && (

          <input
            name="company_name"
            placeholder="Company Name"
            className="border p-3 w-full rounded mb-4"
            onChange={handleChange}
          />

        )}

        <button
          className="bg-indigo-600 text-white p-3 w-full rounded"
        >
          Register
        </button>

      </form>

    </div>

  );

};

export default Register;