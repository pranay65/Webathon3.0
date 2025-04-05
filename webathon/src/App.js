import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import LandingPage from "./pages/LandingPage";
import JobPosting from "./pages/JobPosting";
import JobListing from "./pages/JobListing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/postjob" element={<JobPosting />} />
        <Route path="/joblisting" element={<JobListing />} />
      </Routes>
    </Router>
  );
}

export default App;
