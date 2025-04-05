import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5400/user/login", formData);
    if (res.data.status === 400) {
      alert(res.data.message);
    } else if (res.data.status === 200) {
      window.localStorage.setItem("token", res.data.token);
      window.localStorage.setItem("name", res.data.dbUsername);

      alert("Succesfully Logged In");
      navigate("/");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 max-w-xl mx-auto bg-gradient-to-br from-white via-indigo-50 to-pink-50 rounded-2xl shadow-2xl mt-10 border border-gray-200"
    >
      <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
        Login
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl border border-gray-300 hover:shadow-md focus:ring-2 focus:ring-indigo-300 transition"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl border border-gray-300 hover:shadow-md focus:ring-2 focus:ring-pink-300 transition"
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <button
            type="submit"
            className="w-full text-white font-bold py-3 text-lg bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 rounded-xl shadow-md"
          >
            🔐 Login
          </button>
        </motion.div>
        New here? <Link to="/register">Register Now!</Link>
      </form>
    </motion.div>
  );
}
