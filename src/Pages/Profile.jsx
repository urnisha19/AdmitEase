/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Profile = () => {
  const { user } = useAuth();

  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");

  const [originalData, setOriginalData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const isNameValid = name.trim().length >= 2;
  const hasChanges = name !== originalData.name || photo !== originalData.photo;

  // Fetch Firebase token on mount
  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const fetchedToken = await user.getIdToken();
        setToken(fetchedToken);
      }
    };
    fetchToken();
  }, [user]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://admitease-server.onrender.com/api/users/profile/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data;
        setName(data.name || "");
        setEmail(data.email || "");
        setPhoto(data.photo || "");

        setOriginalData({
          name: data.name || "",
          photo: data.photo || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load profile.");
      }
    };

    if (token && user?.email) fetchProfile();
  }, [token, user]);

  const handleSave = async () => {
    if (!isNameValid) {
      setError("Name must be at least 2 characters.");
      return;
    }

    try {
      const res = await axios.put(
        `https://admitease-server.onrender.com/api/users/profile/${user.email}`,
        { name, photo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Profile updated successfully!");
      setOriginalData({ name, photo });
      setIsEditing(false);
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to update profile.");
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <p className="text-lg font-semibold text-red-600">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden mt-10 transition-shadow duration-300 hover:shadow-2xl">
      {/* Left Profile Summary */}
      <div className="w-full md:w-1/3 bg-gray-100 px-6 py-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r">
        {photo ? (
          <img
            src={photo}
            alt="User"
            className="w-24 h-24 rounded-full shadow-md mb-4 object-cover"
          />
        ) : (
          <div className="w-24 h-24 bg-blue-400 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-md">
            {name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
        <h2 className="text-xl font-bold text-blue-600">
          {name || "Unnamed User"}
        </h2>
        <p className="text-sm text-gray-700">{email}</p>
      </div>

      {/* Right Editable Form */}
      <div className="w-full md:w-2/3 p-6 md:p-8 bg-white">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Personal Details
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Name
            </label>
            <input
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Email
            </label>
            <input
              className="input input-bordered w-full bg-gray-200 text-gray-600"
              value={email}
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Email can’t be changed</p>
          </div>

          {/* Photo URL */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1 text-gray-700">
              Photo URL
            </label>
            <input
              className="input input-bordered w-full"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </form>

        {message && <div className="mt-4 text-green-600">{message}</div>}
        {error && <div className="mt-4 text-red-600">{error}</div>}

        <div className="mt-8 flex justify-center md:justify-start gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={!hasChanges || !isNameValid}
                className="btn btn-primary disabled:opacity-50"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setName(originalData.name);
                  setPhoto(originalData.photo);
                  setError(null);
                  setMessage(null);
                }}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
