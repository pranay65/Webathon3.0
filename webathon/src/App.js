import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import JobPosting from "./pages/JobPosting";
import JobListing from "./pages/JobListing";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import UserDash from "./pages/SellerDash";
import BuyerDash from "./pages/BuyerDash";
import PitchBuilder from "./pages/PitchBuilder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/postjob" element={<JobPosting />} />
        <Route path="/joblisting" element={<JobListing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/seller" element={<UserDash/>}/>
        <Route path="/buyer" element={<BuyerDash/>}/>
        <Route path="/pitch" element={<PitchBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
