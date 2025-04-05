import React, { useState, useEffect } from 'react';

const FreelancerProfile = () => {
  // Sample initial data
  const initialData = {
    name: "Jane Doe",
    userType: "freelancer",
    email: "jane.doe@example.com",
    location: "San Francisco, CA",
    about: "Passionate freelancer with over 6 years of experience in web development and design. I specialize in creating responsive, user-friendly interfaces with modern technologies.",
    skills: ["UI/UX Design", "React", "Node.js", "Tailwind CSS", "Figma", "JavaScript"],
    certifications: ["AWS Certified Developer", "Google UX Design Professional Certificate"],
    portfolio: [
      {
        title: "E-commerce Redesign",
        description: "Complete UI overhaul for a fashion retailer",
        link: "https://portfolio.example.com/ecommerce"
      },
      {
        title: "Finance Dashboard",
        description: "Interactive dashboard for financial data",
        link: "https://portfolio.example.com/dashboard"
      }
    ],
    experience: [
      {
        role: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        duration: "2021 - Present"
      },
      {
        role: "UI/UX Designer",
        company: "Creative Studio",
        duration: "2018 - 2021"
      }
    ],
    hourlyRate: "$75 - $95",
    availability: "Available for Work",
    responseTime: "Within 24 hours",
    profileImage: null
  };

  // State management
  const [userData, setUserData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...initialData});
  const [isLoading, setIsLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: "",
    description: "",
    link: ""
  });
  const [newExperienceItem, setNewExperienceItem] = useState({
    role: "",
    company: "",
    duration: ""
  });

  // Reset form data when exiting edit mode
  useEffect(() => {
    if (!isEditing) {
      setFormData({...userData});
    }
  }, [isEditing, userData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle array item additions
  const handleAddItem = (type) => {
    switch (type) {
      case 'skill':
        if (newSkill.trim()) {
          setFormData(prev => ({
            ...prev,
            skills: [...prev.skills, newSkill.trim()]
          }));
          setNewSkill("");
        }
        break;
      case 'certification':
        if (newCertification.trim()) {
          setFormData(prev => ({
            ...prev,
            certifications: [...prev.certifications, newCertification.trim()]
          }));
          setNewCertification("");
        }
        break;
      case 'portfolio':
        if (newPortfolioItem.title.trim() && newPortfolioItem.description.trim()) {
          setFormData(prev => ({
            ...prev,
            portfolio: [...prev.portfolio, {...newPortfolioItem}]
          }));
          setNewPortfolioItem({ title: "", description: "", link: "" });
        }
        break;
      case 'experience':
        if (newExperienceItem.role.trim() && newExperienceItem.company.trim()) {
          setFormData(prev => ({
            ...prev,
            experience: [...prev.experience, {...newExperienceItem}]
          }));
          setNewExperienceItem({ role: "", company: "", duration: "" });
        }
        break;
      default:
        break;
    }
  };

  // Handle item removals
  const handleRemoveItem = (type, index) => {
    switch (type) {
      case 'skill':
        setFormData(prev => ({
          ...prev,
          skills: prev.skills.filter((_, i) => i !== index)
        }));
        break;
      case 'certification':
        setFormData(prev => ({
          ...prev,
          certifications: prev.certifications.filter((_, i) => i !== index)
        }));
        break;
      case 'portfolio':
        setFormData(prev => ({
          ...prev,
          portfolio: prev.portfolio.filter((_, i) => i !== index)
        }));
        break;
      case 'experience':
        setFormData(prev => ({
          ...prev,
          experience: prev.experience.filter((_, i) => i !== index)
        }));
        break;
      default:
        break;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUserData(formData);
    setIsEditing(false);
    setIsLoading(false);
  };

  // Handle cancel editing
  const handleCancel = () => {
    setFormData({...userData});
    setIsEditing(false);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with edit/save buttons */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">
            {isEditing ? "Edit Profile" : "Freelancer Profile"}
          </h1>
          <div className="flex space-x-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        {!isEditing ? (
          // VIEW MODE
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 rounded-full bg-indigo-100 mb-4 overflow-hidden">
                      {userData.profileImage ? (
                        <img 
                          src={userData.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-indigo-700 text-4xl font-bold">
                          {userData.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
                    <p className="text-indigo-600 capitalize">{userData.userType}</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact</h3>
                      <p className="mt-1 text-gray-600 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {userData.email}
                      </p>
                      <p className="mt-1 text-gray-600 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {userData.location}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Availability</h3>
                      <div className="mt-2 space-y-2">
                        <p className="flex items-center text-gray-700">
                          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${userData.availability === "Available for Work" ? "bg-green-500" : "bg-yellow-500"}`}></span>
                          {userData.availability}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Rate:</span> {userData.hourlyRate}/hr
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Response:</span> {userData.responseTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Profile Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* About Section */}
                <section>
                  <h2 className="text-2xl font-bold text-indigo-700 mb-4">About Me</h2>
                  <p className="text-gray-700 leading-relaxed">{userData.about}</p>
                </section>

                {/* Skills Section */}
                <section>
                  <h2 className="text-2xl font-bold text-indigo-700 mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.map((skill, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Certifications Section */}
                <section>
                  <h2 className="text-2xl font-bold text-indigo-700 mb-4">Certifications</h2>
                  <ul className="space-y-2">
                    {userData.certifications.map((cert, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Experience Section */}
                <section>
                  <h2 className="text-2xl font-bold text-indigo-700 mb-4">Experience</h2>
                  <div className="space-y-4">
                    {userData.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-indigo-300 pl-4 py-2">
                        <h3 className="text-lg font-semibold text-gray-800">{exp.role}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                        <p className="text-gray-500 text-sm">{exp.duration}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Portfolio Section */}
                <section>
                  <h2 className="text-2xl font-bold text-indigo-700 mb-4">Portfolio</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.portfolio.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                        <div className="h-40 bg-indigo-100 flex items-center justify-center">
                          <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                          {item.link && (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm inline-flex items-center">
                              View Project
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        ) : (
          // EDIT MODE
          <div className="p-6 space-y-8">
            {/* Basic Information */}
            <section className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Profile Image</label>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-full bg-indigo-100 overflow-hidden">
                      {formData.profileImage ? (
                        <img 
                          src={formData.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-indigo-700 text-xl font-bold">
                          {formData.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <label className="cursor-pointer">
                      <span className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition">
                        Change
                      </span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div></div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">User Type</label>
                  <input
                    type="text"
                    name="userType"
                    value={formData.userType}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
              </div>
            </section>

            {/* About Section */}
            <section className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">About Me</h2>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </section>

            {/* Skills Section */}
            <section className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    {skill}
                    <button 
                      onClick={() => handleRemoveItem('skill', index)}
                      className="ml-1 text-indigo-600 hover:text-indigo-800"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={() => handleAddItem('skill')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition"
                >
                  Add
                </button>
              </div>
            </section>

            {/* Certifications Section */}
            <section className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Certifications</h2>
              <div className="space-y-2 mb-4">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between items-center bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{cert}</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveItem('certification', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="Add a new certification"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={() => handleAddItem('certification')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition"
                >
                  Add
                </button>
              </div>
            </section>

            {/* Experience Section */}
            <section className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Experience</h2>
              <div className="space-y-4 mb-6">
                {formData.experience.map((exp, index) => (
                  <div key={index} className="border border-gray-200 p-4 rounded-lg bg-white">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">{exp.role}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                        <p className="text-gray-500 text-sm">{exp.duration}</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveItem('experience', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border border-gray-300 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Add New Experience</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Role</label>
                    <input
                      type="text"
                      name="role"
                      value={newExperienceItem.role}
                      onChange={(e) => setNewExperienceItem({...newExperienceItem, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Senior Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={newExperienceItem.company}
                      onChange={(e) => setNewExperienceItem({...newExperienceItem, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Tech Company Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={newExperienceItem.duration}
                      onChange={(e) => setNewExperienceItem({...newExperienceItem, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="2020 - Present"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleAddItem('experience')}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Add Experience
                </button>
              </div>
            </section>

            {/* Portfolio Section */}
            <section className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {formData.portfolio.map((item, index) => (
                  <div key={index} className="border border-gray-200 p-4 rounded-lg bg-white">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <button 
                        onClick={() => handleRemoveItem('portfolio', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm hover:underline">
                        {item.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="border border-gray-300 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Add New Portfolio Item</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newPortfolioItem.title}
                      onChange={(e) => setNewPortfolioItem({...newPortfolioItem, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Project title"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="description"
                      value={newPortfolioItem.description}
                      onChange={(e) => setNewPortfolioItem({...newPortfolioItem, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Brief description of the project"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Link (optional)</label>
                    <input
                      type="url"
                      name="link"
                      value={newPortfolioItem.link}
                      onChange={(e) => setNewPortfolioItem({...newPortfolioItem, link: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="https://example.com/project"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleAddItem('portfolio')}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Add Portfolio Item
                </button>
              </div>
            </section>

            {/* Availability Section */}
            <section className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Availability & Rate</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Availability</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Available for Work">Available for Work</option>
                    <option value="Not Available">Not Available</option>
                    <option value="Limited Availability">Limited Availability</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Hourly Rate</label>
                  <input
                    type="text"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g. $50 - $75"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Response Time</label>
                  <select
                    name="responseTime"
                    value={formData.responseTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Within 24 hours">Within 24 hours</option>
                    <option value="Within 48 hours">Within 48 hours</option>
                    <option value="Within a week">Within a week</option>
                  </select>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;