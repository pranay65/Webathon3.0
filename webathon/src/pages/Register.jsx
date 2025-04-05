import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

export default function RegisterPage() {
  const [userType, setUserType] = useState("buyer");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    skills: [""],
    certifications: [""],
  });

  const navigate = useNavigate();

  const handleChange = (e, index, field) => {
    if (field === "skills" || field === "certifications") {
      const updated = [...formData[field]];
      updated[index] = e.target.value;
      setFormData({ ...formData, [field]: updated });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      userType,
      name: formData.name,
      password: formData.password,
      ...(userType === "seller" && {
        skills: formData.skills.filter((s) => s.trim() !== ""),
        certifications: formData.certifications.filter((c) => c.trim() !== ""),
      }),
    };
    const res = await axios.post(
      "http://localhost:5400/user/register",
      dataToSend
    );
    if (res.data.status === 400) {
      alert("User already exists!");
    } else {
      alert("User created successfully!");
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 pt-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl mx-auto bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-200"
        >
          <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
            Register as {userType === "buyer" ? "Buyer" : "Seller"}
          </h1>

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setUserType("buyer")}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                userType === "buyer"
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Buyer
            </button>
            <button
              onClick={() => setUserType("seller")}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                userType === "seller"
                  ? "bg-gradient-to-r from-pink-500 to-indigo-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Seller
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 hover:shadow-md focus:ring-2 focus:ring-indigo-300 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 hover:shadow-md focus:ring-2 focus:ring-pink-300 transition"
              />
            </div>

            {userType === "seller" && (
              <>
                <div className="space-y-4">
                  {formData.skills.map((skill, index) => (
                    <input
                      key={index}
                      placeholder={`Skill ${index + 1}`}
                      value={skill}
                      onChange={(e) => handleChange(e, index, "skills")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 hover:shadow-md focus:ring-2 focus:ring-indigo-300 transition"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addField("skills")}
                    className="text-sm text-indigo-500 hover:underline"
                  >
                    + Add Skill
                  </button>
                </div>

                <div className="space-y-4 mt-4">
                  {formData.certifications.map((cert, index) => (
                    <input
                      key={index}
                      placeholder={`Certification ${index + 1}`}
                      value={cert}
                      onChange={(e) => handleChange(e, index, "certifications")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 hover:shadow-md focus:ring-2 focus:ring-pink-300 transition"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addField("certifications")}
                    className="text-sm text-pink-500 hover:underline"
                  >
                    + Add Certification
                  </button>
                </div>
              </>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <button
                type="submit"
                className="w-full py-3 text-white text-lg font-bold rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 shadow-md"
              >
                📝 Register
              </button>
            </motion.div>

            <p className="text-sm text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:underline font-semibold"
              >
                Login Now!
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
}
