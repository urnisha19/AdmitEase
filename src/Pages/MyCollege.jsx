/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => setRating(star)}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-7 w-7 transition-all duration-200 ${
            star <= rating
              ? "text-yellow-400 scale-110"
              : "text-gray-300 hover:text-yellow-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          role="button"
          aria-label={`${star} Star`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setRating(star);
          }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.96c.3.922-.755 1.688-1.54 1.118L10 13.348l-3.376 2.455c-.785.57-1.84-.196-1.54-1.118l1.286-3.96a1 1 0 00-.364-1.118L3.63 9.386c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.96z" />
        </svg>
      ))}
    </div>
  );
};

const MyCollege = () => {
  const { profile } = useContext(AuthContext);
  const [admissions, setAdmissions] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [selectedAdmissionIndex, setSelectedAdmissionIndex] = useState(0);

  const fetchAdmissions = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admissions");
      const allAdmissions = res.data || [];

      // Filter by logged-in user's email
      const userAdmissions = profile?.email
        ? allAdmissions.filter((a) => a.email === profile.email)
        : [];

      setAdmissions(userAdmissions);
    } catch (error) {
      toast.error("Failed to load admissions");
    }
  };

  const fetchReviews = async (collegeName) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/reviews?collegeName=${collegeName}`
      );
      setReviews(res.data || []);
    } catch (error) {
      toast.error("Failed to load reviews");
    }
  };

  useEffect(() => {
    if (profile?.email) {
      fetchAdmissions();
    }
  }, [profile?.email]);

  useEffect(() => {
    if (admissions.length > 0) {
      const collegeName = admissions[selectedAdmissionIndex]?.college;
      if (collegeName) fetchReviews(collegeName);
    }
  }, [admissions, selectedAdmissionIndex]);

  const handleAddReview = async () => {
    if (!reviewText.trim()) return toast.error("Please write a review.");
    if (admissions.length === 0) return toast.error("No admission data found.");

    const currentAdmission = admissions[selectedAdmissionIndex];

    const newReview = {
      collegeName: currentAdmission.college,
      candidateName: currentAdmission.name,
      reviewText,
      rating,
    };

    try {
      await axios.post("http://localhost:3000/api/reviews", newReview);
      toast.success("Review submitted!");
      setReviewText("");
      setRating(5);
      fetchReviews(currentAdmission.college);
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        <h2 className="text-4xl font-bold text-center text-blue-700">
          🎓 My College Dashboard
        </h2>

        {admissions.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No admissions found.
          </p>
        ) : (
          <>
            {admissions.length > 1 && (
              <div className="flex flex-wrap justify-center gap-3">
                {admissions.map((data, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAdmissionIndex(idx)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow ${
                      idx === selectedAdmissionIndex
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    {data.college}
                  </button>
                ))}
              </div>
            )}

            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                {admissions[selectedAdmissionIndex].college}
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700 text-base">
                <p>
                  <strong>Name:</strong>{" "}
                  {admissions[selectedAdmissionIndex].name}
                </p>
                <p>
                  <strong>Subject:</strong>{" "}
                  {admissions[selectedAdmissionIndex].subject}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {admissions[selectedAdmissionIndex].email}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {admissions[selectedAdmissionIndex].phone}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {admissions[selectedAdmissionIndex].address}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {admissions[selectedAdmissionIndex].dob}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Review Form */}
        {admissions.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-5 text-center text-blue-700">
              Write a Review
            </h3>
            <textarea
              className="w-full border border-gray-300 rounded-md p-4 mb-4 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              rows={5}
              placeholder="Your honest feedback helps others..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <div className="flex justify-center mb-4">
              <StarRating rating={rating} setRating={setRating} />
            </div>

            <button
              onClick={handleAddReview}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyCollege;
