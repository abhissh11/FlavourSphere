import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../hooks/useAuth"

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await API.post("/auth/signin", form);
      login(data.token);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setErr(error?.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Signin</h2>
      {err && <p className="text-red-600 text-sm mb-2">{err}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="email" placeholder="Email" className="border w-full p-2 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="border w-full p-2 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-green-600 w-full text-white p-2 rounded">Signin</button>
      </form>
      <p className="text-center mt-3 text-sm">Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link></p>
    </div>
  );
}
