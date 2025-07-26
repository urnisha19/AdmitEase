import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;

    if (!name || !email || !password) {
      return toast.warn("All fields are required");
    }

    if (password.length < 6) {
      return toast.warn("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      // 1. Register user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2. Set display name in Firebase Auth
      await updateProfile(userCredential.user, { displayName: name });

      // 3. Get ID token
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("access-token", idToken);

      // 4. Sync to backend (send name/email)
      const { data: createdUser } = await axios.post(
        "https://admitease-server.onrender.com/api/users",
        {
          name,
        },
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );

      console.log("✅ Synced user:", createdUser);

      toast.success("Registration successful! Redirecting...");
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email is already in use.");
      } else {
        toast.error(err.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-600">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Enter your name"
              disabled={loading}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Enter your email"
              disabled={loading}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Minimum 6 characters"
              disabled={loading}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
