import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:5400/jobs/");
        const flatJobs = res.data.payload.map((item) => ({
          _id: item._id,
          ...item.job,
        }));
        setJobs(flatJobs);
        setFilteredJobs(flatJobs);
        console.log(jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    fetchData();
  }, []);

  const sendToGemini = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
You are an intelligent assistant that helps filter freelance services based on user needs.
Here is the user query: "${query}"

Given the following service listings (in JSON format), return only the ones that are relevant to the user query.
Respond strictly in JSON array format.

Listings:
${JSON.stringify(jobs)}

Only return an array of matching job objects.
`;

      const result = await model.generateContent(prompt);
      const rawText = await result.response.text();
      const cleanJSON = rawText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const filtered = JSON.parse(cleanJSON);
      setFilteredJobs(filtered);

      setFilteredJobs(filtered);
    } catch (err) {
      console.error("Gemini error:", err);
      alert("Something went wrong while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSent = async (name, seller) => {
    const serverURL = process.env.REACT_APP_SERVER_URL;

    const data = {
      name,
      seller,
    };
    await axios.post(`${serverURL}/requests/add`, data, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    nav("/");

    alert("Succesfully requested!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 pt-24">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
          Explore Freelance Services
        </h2>

        <div className="flex gap-4 items-center justify-center mb-10">
          <input
            type="text"
            placeholder="Ask what you're looking for..."
            className="w-full max-w-xl p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={sendToGemini}
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
          >
            🔍 Search
          </motion.button>
        </div>

        {loading && (
          <p className="text-center text-gray-500 mb-6 animate-pulse">
            Filtering results...
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
              <p className="text-pink-600 font-bold mb-4">₹{job.price}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRequestSent(job.name, job.seller)}
                className="w-full mt-2 py-2 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-xl shadow-md transition-all hover:from-pink-500 hover:to-indigo-500"
              >
                📩 Request Service
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
