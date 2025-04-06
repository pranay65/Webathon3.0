import React from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const TimelinePage = () => {
  const location = useLocation();
  const request = location.state?.request;

  const timelineSteps = [
    { step: "Project Accepted", date: "2025-04-06", done: true },
    { step: "Initial Meeting", date: "2025-04-07", done: false },
    { step: "Planning & Design", date: "2025-04-10", done: false },
    { step: "Development", date: "2025-04-15", done: false },
    { step: "Testing", date: "2025-04-20", done: false },
    { step: "Delivery", date: "2025-04-25", done: false },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 z-50">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-16">
          <h1 className="text-2xl font-bold text-indigo-700 mb-6">
            Project Timeline
          </h1>
          {request && (
            <div className="mb-4">
              <p className="text-lg font-semibold">
                Project Name: {request.name}
              </p>
              <p className="text-sm text-gray-600">Buyer: {request.buyer}</p>
            </div>
          )}
          <div className="relative border-l-4 border-indigo-400 ml-4 mt-6 space-y-8">
            {timelineSteps.map((step, index) => (
              <div key={index} className="ml-4 relative">
                <div className="absolute -left-5 top-1 w-4 h-4 rounded-full border-4 bg-white border-indigo-600"></div>
                <div className="bg-gray-50 p-4 rounded-md shadow">
                  <p
                    className={`text-lg font-medium ${
                      step.done ? "text-green-700" : "text-gray-700"
                    }`}
                  >
                    {step.step}
                  </p>
                  <p className="text-sm text-gray-500">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/contract">
            <button className="bg-indigo-600 hover:bg-indigo-700  text-white px-4 py-2 rounded-lg mt-2">
              Contract
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TimelinePage;
