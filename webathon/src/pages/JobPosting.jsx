import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

function JobPosting() {
  const [formData, setFormData] = useState({
    name: "",
    seller: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5400/jobs/add", formData, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    nav("/search");

    console.log("Submitted Job:", formData);
  };

  return (
    <>
      <Navbar />
      <div className="pt-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-10 max-w-3xl mx-auto bg-gradient-to-br from-white via-indigo-50 to-pink-50 rounded-3xl shadow-2xl mt-16 border border-gray-200"
        >
          <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
            Post a Freelance Job
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <input
                name="name"
                placeholder="Job Title"
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl border border-gray-300 hover:shadow-lg focus:ring-2 focus:ring-indigo-300 transition"
              />
              <input
                name="seller"
                placeholder="Username"
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl border border-gray-300 hover:shadow-lg focus:ring-2 focus:ring-pink-300 transition"
              />
              <input
                name="category"
                placeholder="Category (e.g., Design, Development)"
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl border border-gray-300 hover:shadow-lg focus:ring-2 focus:ring-indigo-300 transition"
              />
              <input
                name="price"
                type="number"
                placeholder="Price in ₹"
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl border border-gray-300 hover:shadow-lg focus:ring-2 focus:ring-pink-300 transition"
              />
              <input
                name="image"
                type="url"
                placeholder="Image URL (optional)"
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-300 hover:shadow-lg focus:ring-2 focus:ring-indigo-300 transition"
              />
              <textarea
                name="description"
                placeholder="Job Description"
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl border border-gray-300 resize-none hover:shadow-lg focus:ring-2 focus:ring-pink-300 transition"
                rows={5}
              />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <button
                type="submit"
                className="w-full text-white font-bold py-4 text-lg bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 rounded-xl shadow-lg"
              >
                🚀 Post Job
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default JobPosting;
