import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function JobListing() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:5400/jobs/");
        const flatJobs = res.data.payload.map((item) => ({
          _id: item._id,
          ...item.job,
        }));
        setJobs(flatJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    fetchData();
  }, []);

  const categories = ["All", ...new Set(jobs.map((job) => job.category))];

  const filteredJobs =
    selectedCategory === "All"
      ? jobs
      : jobs.filter((job) => job.category === selectedCategory);

  return (
    <div>
      <div className="p-8 max-w-6xl mx-auto mt-10">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
          Explore Freelance Jobs
        </h1>

        <div className="flex justify-center mb-6 flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 border hover:border-indigo-400 transition-all"
            >
              <img
                src={job.image}
                alt={job.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-bold mb-2 text-indigo-600">
                {job.name}
              </h2>
              <p className="text-gray-600 mb-1">
                By <span className="font-semibold">{job.seller}</span>
              </p>
              <p className="text-gray-700 mb-1">Category: {job.category}</p>
              <p className="text-pink-600 font-bold">₹{job.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobListing;
