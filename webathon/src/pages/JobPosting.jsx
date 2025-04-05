import React, { useState } from "react";
import { motion } from "framer-motion";

function JobPosting() {
  const [formData, setFormData] = useState({
    name: "",
    seller: "",
    category: "",
    price: "",
    rating: "",
    image: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Job:", formData);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const inputVariants = {
    focus: { 
      scale: 1.02, 
      boxShadow: "0 0 8px rgba(99, 102, 241, 0.4)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 flex items-center justify-center p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
      >
        {/* Decorative background element */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-200 to-pink-200 rounded-full opacity-20" />
        
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Create Your Job Listing
          </h2>
          <p className="text-center text-gray-500 mb-8">Find the perfect freelancer for your project</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={inputVariants} whileFocus="focus">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="e.g. Website Development"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">📝</span>
                </div>
              </motion.div>

              <motion.div variants={inputVariants} whileFocus="focus">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="seller"
                    value={formData.seller}
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="e.g. John Doe"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                </div>
              </motion.div>
            </div>

            <motion.div variants={inputVariants} whileFocus="focus">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all appearance-none"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                  <option value="writing">Writing</option>
                  <option value="marketing">Marketing</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={inputVariants} whileFocus="focus">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Budget ($)</label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="e.g. 500"
                    min="1"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                </div>
              </motion.div>

              <motion.div variants={inputVariants} whileFocus="focus">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                <div className="relative">
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🖼️</span>
                </div>
              </motion.div>
            </div>

            <motion.div variants={inputVariants} whileFocus="focus">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-y"
                rows="4"
                placeholder="Describe your job requirements in detail..."
                required
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <button
                type="submit"
                className="w-full text-white font-bold py-4 text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 rounded-xl shadow-lg relative overflow-hidden"
              >
                <span className="relative z-10">🚀 Launch Your Job</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default JobPosting;