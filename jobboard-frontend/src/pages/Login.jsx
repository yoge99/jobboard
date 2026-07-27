import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
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

      const res = await api.post("/auth/login", form);

      login(res.data.data.token, res.data.data.user);

      toast.success(res.data.message);

      if (res.data.data.user.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/jobseeker/dashboard");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }

  };

  return (
    <div className="flex justify-center mt-20">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96"
      >

        <h2 className="text-3xl font-bold mb-6">
          Login
        </h2>

        <input
          className="border w-full p-3 mb-4 rounded"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          className="border w-full p-3 mb-4 rounded"
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />

        <button
          className="w-full bg-indigo-600 text-white p-3 rounded"
        >
          Login
        </button>

        <p className="mt-5 text-center">
          Don't have an account?

          <Link
            to="/register"
            className="text-indigo-600 ml-1"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Login;