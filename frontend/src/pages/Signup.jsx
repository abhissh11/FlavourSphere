import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await API.post("/auth/signup", form);
      navigate("/signin");
    } catch (error) {
      setErr(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
      {err && <p className="text-red-600 text-sm mb-2">{err}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Name" className="border w-full p-2 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" className="border w-full p-2 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="border w-full p-2 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-green-600 w-full text-white p-2 rounded">Create account</button>
      </form>
      <p className="text-center mt-3 text-sm">Have an account? <Link to="/signin" className="text-blue-600">Signin</Link></p>
    </div>
  );
}
