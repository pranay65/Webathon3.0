import axios from "axios";
import React, { useState } from "react";
import Navbar from "../Components/Navbar";

const PitchBuilder = () => {
  const initialPitch = {
    title: "",
    problem: "",
    solution: "",
    features: "",
    timeline: "",
    budget: "",
    targetAudience: "",
    marketPotential: "",
    generatedPitch: "",
  };

  const [pitch, setPitch] = useState(initialPitch);
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPitch({ ...pitch, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const serverURL = process.env.REACT_APP_SERVER_URL;

    try {
      const response = await axios.post(
        `${serverURL}/modal/generate-pitch`,
        pitch
      );

      const data = response.data;

      if (data.success) {
        setPitch({ ...pitch, generatedPitch: data.generatedPitch });
        setSubmitted(true);
      } else {
        alert("Failed to generate pitch");
      }
    } catch (error) {
      console.error("Error submitting pitch:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setPitch(initialPitch);
    setActiveStep(0);
    setSubmitted(false);
  };

  const steps = [
    {
      title: "Basic Information",
      fields: [
        {
          name: "title",
          label: "Service Name",
          type: "text",
          placeholder: "e.g., AI-powered Resume Builder",
        },
        {
          name: "targetAudience",
          label: "Target Audience",
          type: "text",
          placeholder: "Who will benefit from your solution?",
        },
      ],
    },
    {
      title: "Skills and Certifications",
      fields: [
        {
          name: "problem",
          label: "Skills",
          type: "textarea",
          placeholder: "Describe your skills here.",
        },
        {
          name: "solution",
          label: "Certifications",
          type: "textarea",
          placeholder: "Describe your certifications here.",
        },
      ],
    },
    {
      title: "Experiences",
      fields: [
        {
          name: "features",
          label: "Projects",
          type: "textarea",
          placeholder: "List the key features you want included.",
        },
        {
          name: "marketPotential",
          label: "Previous Freelancing Experiences",
          type: "textarea",
          placeholder: "Describe the market opportunity and potential impact.",
        },
        {
          name: "timeline",
          label: "Expected Timeline",
          type: "text",
          placeholder: "e.g., 2 weeks",
        },
        {
          name: "budget",
          label: "Budget",
          type: "number",
          placeholder: "e.g., 500",
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4 z-50">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <h1 className="text-2xl font-bold flex items-center">
              <span className="mr-2">📌</span> Professional Pitch Builder
            </h1>
            <p className="mt-2 opacity-90">
              Create a compelling project pitch in minutes
            </p>
          </div>

          {!submitted ? (
            <>
              {/* Progress Bar */}
              <div className="px-6 pt-6">
                <div className="flex justify-between mb-2">
                  {steps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`text-sm font-medium ${
                        activeStep >= index ? "text-blue-600" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </button>
                  ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${((activeStep + 1) / steps.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {steps[activeStep].title}
                  </h2>

                  {steps[activeStep].fields.map((field) => (
                    <div key={field.name} className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          value={pitch[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          rows={4}
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={pitch[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={activeStep === 0}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      activeStep === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Back
                  </button>

                  {activeStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        "Generate Pitch"
                      )}
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  📝 Your Professional Pitch
                </h2>
                <button
                  onClick={handleReset}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Create New Pitch
                </button>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {pitch.title}
                  </h1>
                  {pitch.targetAudience && (
                    <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block">
                      Target: {pitch.targetAudience}
                    </div>
                  )}
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                    <span className="text-red-500 mr-2">⚠️</span> Problem
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {pitch.problem}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                    <span className="text-green-500 mr-2">💡</span> Solution
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {pitch.solution}
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                  <span className="text-blue-500 mr-2">⭐</span> Key Features
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {pitch.features}
                </p>
              </div> */}

                <div className="mt-6 bg-white p-4 rounded-lg shadow-sm whitespace-pre-wrap">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                    <span className="text-black mr-2">🧠</span> Seller's Pitch
                  </h3>
                  <p className="text-gray-700">{pitch.generatedPitch}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PitchBuilder;
