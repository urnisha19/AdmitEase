import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import axios from "axios";

const Login = () => {
  const { loginUser, googleSignIn, facebookSignIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const storeTokenAndSync = async () => {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      localStorage.setItem("access-token", token);

      try {
        await axios.post(
          "http://localhost:3000/api/users",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        await axios.get(
          `http://localhost:3000/api/users/${auth.currentUser.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (err) {
        console.warn("User sync error:", err.response?.data || err.message);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
      await storeTokenAndSync();
      toast.success("Login successful!");
      setPassword("");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
      if (import.meta.env.DEV) console.error("Login error:", err);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      await storeTokenAndSync();
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    try {
      await facebookSignIn();
      await storeTokenAndSync();
      toast.success("Logged in with Facebook!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md p-8 rounded-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            autoComplete="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-3 text-sm">
          Forgot password?{" "}
          <Link to="/reset-password" className="text-blue-500 hover:underline">
            Reset here
          </Link>
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded text-white ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            <FaGoogle /> Continue with Google
          </button>
          <button
            onClick={handleFacebookSignIn}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-800 hover:bg-blue-900"
            }`}
          >
            <FaFacebook /> Continue with Facebook
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
