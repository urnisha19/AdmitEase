import { useState, useEffect } from "react";
import axios from "axios";

const StudentReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/reviews");
        setReviews(res.data);
      } catch (err) {
        setError("Failed to load reviews.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Student Reviews</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading reviews...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-600">No reviews submitted yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {review.candidateName}
                </h4>
                <p className="text-md text-black-600 mb-1">
                  {review.collegeName}
                </p>
                <p className="text-gray-700 mb-3">{review.reviewText}</p>
                <div className="text-yellow-500 text-lg">
                  {"⭐".repeat(Number(review.rating))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentReviewsSection;
