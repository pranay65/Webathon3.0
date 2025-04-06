import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const ReviewForm = ({ kname }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const name=kname;

  const handleSubmit = async () => {

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5400/reviews/review",
        {
          name,
          rating,
          reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("📦 Review submitted:", response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("❌ Error submitting review:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Something went wrong while submitting the review."
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      {!submitted ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>

          <div className="flex mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={32}
                className={`cursor-pointer transition-colors ${
                  (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <textarea
            placeholder="Write your review here..."
            className="w-full p-3 border rounded mb-4 resize-none"
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-semibold text-green-600 mb-2">
            ✅ Thank you for your review!
          </h3>
          <p className="text-gray-700">Your feedback helps us maintain quality standards.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
