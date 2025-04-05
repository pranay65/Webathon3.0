import React from "react";
import { useNavigate,Link } from "react-router-dom";


const BuyerDash = () => {
  const navigate = useNavigate();
  
  // Sample data for stats
  const stats = [
    { label: "Active Projects", value: 4, icon: "📊" },
    { label: "Open Proposals", value: 12, icon: "📬" },
    { label: "Unread Messages", value: 3, icon: "💬" },
    { label: "This Month Spend", value: "$1,240", icon: "💰" }
  ];
  
  // Sample data for recent activity
  const recentActivity = [
    { type: "proposal", title: "New proposal for Website Redesign", time: "2 hours ago" },
    { type: "message", title: "Message from John regarding Logo Design", time: "Yesterday" },
    { type: "payment", title: "Payment of $350 to Sarah completed", time: "2 days ago" }
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case "proposal": return "📄";
      case "message": return "💬";
      case "payment": return "💳";
      default: return "📌";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with user info */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Buyer Dashboard</h1>
            <p className="text-gray-500">Welcome back! Here's what's happening with your projects</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
              <span className="text-blue-600 font-medium">Premium Account</span>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              JD
            </div>
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-xl mr-4">
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Quick Actions */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Post a Job */}
              <Link to="/postjob">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="p-6 flex-grow">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl mb-4">
                    ➕
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Post a Job</h3>
                  <p className="text-gray-600">Create a new freelance project and invite proposals from qualified professionals.</p>
                </div>
                <div className="border-t border-gray-100 p-4">
                  <button 
                    onClick={() => navigate("/post-job")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Create Job
                  </button>
                </div>
              </div>
              </Link>
              
              {/* View Proposals */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="p-6 flex-grow">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl mb-4">
                    📄
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">View Proposals</h3>
                  <p className="text-gray-600">Review and compare proposals submitted by freelancers for your projects.</p>
                </div>
                <div className="border-t border-gray-100 p-4">
                  <button 
                    onClick={() => navigate("/proposals")}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    View Proposals
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="p-6 flex-grow">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl mb-4">
                    💬
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Messages</h3>
                  <p className="text-gray-600">Chat with freelancers, discuss project details, and share files securely.</p>
                </div>
                <div className="border-t border-gray-100 p-4">
                  <button 
                    onClick={() => navigate("/messages")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Go to Messages
                  </button>
                </div>
              </div>
              
              {/* Payments */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="p-6 flex-grow">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-xl mb-4">
                    💳
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Payments</h3>
                  <p className="text-gray-600">Track your transactions, payment history, and manage your billing settings.</p>
                </div>
                <div className="border-t border-gray-100 p-4">
                  <button 
                    onClick={() => navigate("/payments")}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    View Payments
                  </button>
                </div>
              </div>
            </div>
            
            {/* Current Projects */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">Current Projects</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-800">Website Redesign</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">In Progress</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>Deadline: April 15, 2025</span>
                  <span>Budget: $2,500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>65% Complete</span>
                  <span>10 days remaining</span>
                </div>
              </div>
              <div className="border-t border-gray-100 p-4 flex justify-between">
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  View Details
                </button>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Contact Freelancer
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Activity and Tips */}
          <div className="w-full lg:w-1/3">
            {/* Recent Activity */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-4 flex items-start hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm mr-3 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-800 font-medium">{activity.title}</p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-100 p-4 text-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  View All Activity
                </button>
              </div>
            </div>
            
            {/* Tips & Resources */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tips & Resources</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="bg-blue-50 p-4 border-l-4 border-blue-500">
                <h3 className="font-bold text-gray-800 mb-2">How to Get Better Proposals</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Be specific about your requirements and provide clear examples of what you're looking for.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn More →</a>
              </div>
              <div className="p-4 border-t border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2">Featured Freelancers</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Check out our top-rated professionals in your industry.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Browse Freelancers →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDash;