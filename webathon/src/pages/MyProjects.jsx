import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5400/projects", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching projects:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCall = () => {
    window.open("http://localhost:3002", "_blank");
  };

  return (
    <>
      <Navbar />
      <div className="p-6 z-50 pt-16">
        <h1 className="text-3xl font-bold mb-6 text-center mt-12">
          📁 Projects
        </h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-red-500">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold text-blue-700">
                  {project.name}
                </h2>
                <p className="text-gray-700 mt-2">{project.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Tech: {project.buyer}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Budget: {project.budget}
                </p>
                <Link to="/payment">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Pay
                  </button>
                </Link>
                <Link to="/review">
                  <button className="bg-yellow-500 hover:bg-green-700 text-white font-bold mx-2 py-2 px-4 rounded mt-4">
                    Leave a review
                  </button>
                </Link>
                <button
                  className="bg-blue-500 hover:bg-green-700 text-white font-bold mx-2 py-2 px-4 rounded mt-4"
                  onClick={handleCall}
                >
                  Contact Freelancer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectsPage;
