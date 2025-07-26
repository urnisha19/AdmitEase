import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const AdmissionForm = ({ selectedCollege, onSuccess }) => {
  const { user } = useAuth();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
  });

  const navigate = useNavigate();

  // Fetch Firebase token
  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const fetchedToken = await user.getIdToken();
        setToken(fetchedToken);
      }
    };
    fetchToken();
  }, [user]);

  // Fetch user profile (name + email)
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
        setFormData((prev) => ({
          ...prev,
          name: data.name || "",
          email: data.email || "",
        }));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (token && user?.email) {
      fetchProfile();
    }
  }, [token, user]);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+\d]?(?:[\d-\s]{7,15})$/;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!emailPattern.test(formData.email)) newErrors.email = "Invalid email";
    if (!phonePattern.test(formData.phone)) newErrors.phone = "Invalid phone";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCollege) {
      alert("Please select a college before submitting");
      return;
    }

    if (!validate()) return;

    setLoading(true);
    try {
      const submissionData = {
        ...formData,
        college: selectedCollege.name,
      };

      const response = await axios.post(
        "https://admitease-server.onrender.com/api/admissions",
        submissionData
      );

      if (response.status === 200 || response.status === 201) {
        const storedAdmissions =
          JSON.parse(localStorage.getItem("admissions")) || [];
        localStorage.setItem(
          "admissions",
          JSON.stringify([
            ...storedAdmissions,
            { ...formData, college: selectedCollege.name },
          ])
        );

        setSubmitted(true);
        setFormData({
          name: data.name || "",
          subject: "",
          email: data.email || "",
          phone: "",
          address: "",
          dob: "",
        });
        setErrors({});
        onSuccess();
        setTimeout(() => navigate("/my-college"), 1500);
      } else {
        alert("Submission failed. Try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-xl rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold mb-4 text-center">
        Fill Admission Form for:{" "}
        <span className="text-blue-600">{selectedCollege.name}</span>
      </h3>

      {submitted && (
        <div className="col-span-2 bg-green-100 text-green-800 p-4 rounded mb-4 text-center">
          🎉 Admission submitted successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        noValidate
      >
        {[
          {
            label: "Candidate Name",
            name: "name",
            type: "text",
            disabled: true,
          },
          { label: "Subject", name: "subject", type: "text" },
          {
            label: "Candidate Email",
            name: "email",
            type: "email",
            disabled: true,
          },
          { label: "Candidate Phone", name: "phone", type: "tel" },
          { label: "Address", name: "address", type: "text" },
          { label: "Date of Birth", name: "dob", type: "date" },
        ].map(({ label, name, type, disabled = false }) => (
          <div key={name} className="form-control">
            <label className="label">
              <span className="label-text">{label}</span>
            </label>
            <input
              type={type}
              placeholder={label}
              value={formData[name]}
              onChange={(e) =>
                setFormData({ ...formData, [name]: e.target.value })
              }
              disabled={disabled}
              className={`input input-bordered w-full ${
                disabled ? "bg-gray-200 text-gray-600" : ""
              } ${errors[name] ? "input-error" : ""}`}
            />
            {errors[name] && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors[name]}
                </span>
              </label>
            )}
            {disabled && (
              <p className="text-xs text-gray-500 mt-1">
                {name === "email"
                  ? "Email can’t be changed"
                  : name === "name"
                  ? "Name auto-filled from profile"
                  : ""}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`col-span-2 btn btn-primary text-white text-lg mt-4 ${
            loading ? "btn-disabled opacity-70" : ""
          }`}
        >
          {loading ? "Submitting..." : "Submit Admission"}
        </button>
      </form>
    </motion.div>
  );
};

export default AdmissionForm;
