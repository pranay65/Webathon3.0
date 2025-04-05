import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

    nav("/joblisting");

    console.log("Submitted Job:", formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 max-w-4xl mx-auto bg-gradient-to-br from-white via-indigo-50 to-pink-50 rounded-2xl shadow-2xl mt-10 border border-gray-200"
    >
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
        Post a Freelance Job
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="name"
          placeholder="Job Title"
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl border border-gray-300 hover:shadow-md focus:ring-2 focus:ring-indigo-300 transition"
        />
        <input
          name="seller"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl border border-gray-300 hover:shadow-md focus:ring-2 focus:ring-pink-300 transition"
        />
        <input
          name="category"
          placeholder="Category (e.g., Design, Development)"
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl border border-gray-300 hover:shadow-md focus:ring-2 focus:ring-indigo-300 transition"
        />
        <input
          name="price"
          type="number"
          placeholder="Price in ₹"
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl border border-gray-300 hover:shadow-md focus:ring-2 focus:ring-pink-300 transition"
        />

        <input
          name="image"
          type="url"
          placeholder="Image URL (optional)"
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-gray-300 hover:shadow-md focus:ring-2 focus:ring-pink-300 transition"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl border border-gray-300 resize-none hover:shadow-md focus:ring-2 focus:ring-indigo-300 transition"
          rows={4}
        />

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <button
            type="submit"
            className="w-full text-white font-bold py-3 text-lg bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 rounded-xl shadow-md"
          >
            🚀 Post Job
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default JobPosting;
