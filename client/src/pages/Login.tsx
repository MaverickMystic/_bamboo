import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import {api} from "../utils/api.ts"
import { useAuth } from "../hooks/useAuth";
export default function Login() {
  const navigate = useNavigate();
const { refreshUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoading(true);

await api.post("/login", {
  username,
  password,
});

refreshUser();
      navigate("/admin"); 

    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white -translate-y-30 rounded-2xl -mt-10 shadow-md p-10 w-full max-w-md">

        {/* Logo & Heading */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-2 bg-green-700 rounded-full flex items-center justify-center">
            <img
              className="rounded-full w-12 h-12"
              src="https://i.pinimg.com/1200x/27/8a/45/278a455cfe2c0a6b809887675f706f91.jpg"
              alt=""
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Welcome back!
          </h2>
          <p className="text-sm text-gray-500">Log in to your account</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          
          {/* Username */}
          <div className="relative">
            <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-greensage hover:bg-green-900"
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

      </div>
    </div>
  );
}