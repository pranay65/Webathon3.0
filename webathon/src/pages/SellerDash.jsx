import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

function SellerDash() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design UI",
      status: "To Do",
      priority: "High",
      dueDate: "2025-04-15",
    },
    {
      id: 2,
      title: "Setup Backend",
      status: "In Progress",
      priority: "Medium",
      dueDate: "2025-04-20",
    },
    {
      id: 3,
      title: "API Integration",
      status: "Done",
      priority: "Low",
      dueDate: "2025-04-10",
    },
  ]);

  const [requests, setRequests] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Medium",
    dueDate: "",
  });
  const [isAddingTask, setIsAddingTask] = useState(false);

  const statuses = ["To Do", "In Progress", "Done"];
  const priorities = ["Low", "Medium", "High"];

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Removed dependency on requests so that data is fetched only once on mount.
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:5400/requests/", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });
        const requestsData = res.data.payload;
        setRequests(requestsData);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    fetchData();
  }, []);

  const nav = useNavigate();

  const handleAcceptRequest = async (reqName) => {
    try {
      const res = await axios.put("http://localhost:5400/requests/accept", {
        reqName,
      });

      if (res.data.status === 200) {
        setRequests((prev) =>
          prev.map((req) =>
            req.name === reqName ? { ...req, status: "accepted" } : req
          )
        );
      } else {
        alert("Failed to accept the request.");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("An error occurred while accepting the request.");
    }
    nav("/time");
  };

  const handleAddTask = () => {
    if (newTask.title.trim() === "") return;

    const newTaskObj = {
      id: tasks.length + 1,
      title: newTask.title,
      status: "To Do",
      priority: newTask.priority,
      dueDate: newTask.dueDate,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask({ title: "", priority: "Medium", dueDate: "" });
    setIsAddingTask(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const timeTracked = 5.25; // example value in hours
  const hourlyRate = 20;
  const totalBill = timeTracked * hourlyRate;

  // Calculate completion percentage
  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const completionPercentage = (completedTasks / tasks.length) * 100;

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen p-6 z-50">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-16">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">User Dashboard</h1>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg text-sm">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                title="Total Tasks"
                value={tasks.length}
                color="indigo"
              />
              <StatCard
                title="Completed"
                value={completedTasks}
                color="purple"
              />
              <StatCard
                title="Time Tracked"
                value={`${timeTracked} hrs`}
                color="blue"
              />
              <StatCard
                title="Current Bill"
                value={`$${totalBill.toFixed(2)}`}
                color="pink"
              />
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-1">
                <h2 className="text-lg font-medium">Project Progress</h2>
                <span className="text-indigo-600 font-medium">
                  {completionPercentage.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Pending Requests */}
            <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Pending Requests
              </h2>
              {requests.filter((r) => r.status === "pending").length === 0 ? (
                <p className="text-gray-500">No pending requests.</p>
              ) : (
                <div className="space-y-4">
                  {requests
                    .filter((r) => r.status === "pending")
                    .map((request) => (
                      <div
                        key={request.id}
                        className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {request.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Requested by: {request.buyer}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAcceptRequest(request.name)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                          Accept
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Task Board Header + Add Task Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Task Board</h2>
              <button
                onClick={() => setIsAddingTask(!isAddingTask)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                {isAddingTask ? "Cancel" : "+ Add Task"}
              </button>
            </div>

            {/* Add Task Form */}
            {isAddingTask && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    placeholder="Task title"
                    className="p-2 border border-gray-300 rounded-lg w-full"
                  />
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                    className="p-2 border border-gray-300 rounded-lg"
                  >
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, dueDate: e.target.value })
                    }
                    className="p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <button
                  onClick={handleAddTask}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                >
                  Add Task
                </button>
              </div>
            )}

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {statuses.map((status) => (
                <div
                  key={status}
                  className="bg-gray-50 rounded-lg shadow-sm p-4 border border-gray-200"
                >
                  <h2 className="text-lg font-bold mb-4 flex items-center">
                    <span
                      className={`w-3 h-3 rounded-full mr-2 ${
                        status === "To Do"
                          ? "bg-indigo-400"
                          : status === "In Progress"
                          ? "bg-yellow-400"
                          : "bg-green-400"
                      }`}
                    />
                    {status}
                    <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {tasks.filter((task) => task.status === status).length}
                    </span>
                  </h2>
                  <div className="space-y-3">
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-indigo-400 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{task.title}</h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                                task.priority
                              )}`}
                            >
                              {task.priority}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <select
                            value={task.status}
                            onChange={(e) =>
                              handleStatusChange(task.id, e.target.value)
                            }
                            className="mt-2 w-full text-sm p-2 border rounded-lg"
                          >
                            {statuses.map((statusOption) => (
                              <option key={statusOption} value={statusOption}>
                                {statusOption}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline Overview (Gantt Chart Placeholder) */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Timeline Overview
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex mb-2">
                  <div className="w-1/6 font-medium text-gray-500">Task</div>
                  <div className="w-5/6 flex">
                    {Array.from({ length: 7 }).map((_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i);
                      return (
                        <div
                          key={i}
                          className="flex-1 text-center text-xs text-gray-500"
                        >
                          {date.toLocaleDateString(undefined, {
                            weekday: "short",
                          })}
                          <div className="text-gray-400 text-xs">
                            {date.getDate()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center py-2 border-t border-gray-200"
                  >
                    <div className="w-1/6 pr-4 truncate">{task.title}</div>
                    <div className="w-5/6 flex">
                      {Array.from({ length: 7 }).map((_, i) => {
                        // For demo purposes, we use a random value
                        const isActive = Math.random() > 0.7;
                        return (
                          <div key={i} className="flex-1 px-1">
                            {isActive && (
                              <div
                                className={`h-6 rounded-lg ${
                                  task.status === "Done"
                                    ? "bg-green-400"
                                    : task.status === "In Progress"
                                    ? "bg-yellow-400"
                                    : "bg-indigo-400"
                                }`}
                              ></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time & Billing */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Time & Billing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Time Tracked This Week
                  </h3>
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-indigo-600">
                      {timeTracked}
                    </span>
                    <span className="ml-1 text-gray-500">hours</span>
                  </div>
                  <div className="mt-4 grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }).map((_, i) => {
                      const height = Math.floor(Math.random() * 40) + 10;
                      return (
                        <div key={i} className="flex flex-col items-center">
                          <div
                            className="bg-indigo-200 w-full rounded-sm"
                            style={{ height: `${height}px` }}
                          ></div>
                          <span className="text-xs text-gray-500 mt-1">
                            {["M", "T", "W", "T", "F", "S", "S"][i]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Billing Summary
                  </h3>
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-purple-600">
                      ${totalBill.toFixed(2)}
                    </span>
                    <span className="ml-1 text-gray-500">USD</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Hourly Rate:</span>
                      <span className="font-medium">
                        ${hourlyRate.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Hours Worked:</span>
                      <span className="font-medium">{timeTracked}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold">
                          ${totalBill.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div
      className={`bg-gradient-to-br from-${color}-50 to-${color}-100 p-4 rounded-lg shadow-sm`}
    >
      <h3 className={`text-sm font-medium text-${color}-600 mb-1`}>{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default SellerDash;
