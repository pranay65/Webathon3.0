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
import ContractPage from "./pages/ContractPage";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import Payment from "./Components/Payment";
import Certifications from "./pages/Certifications"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/postjob" element={<JobPosting />} />
        <Route path="/joblisting" element={<JobListing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/seller" element={<UserDash />} />
        <Route path="/buyer" element={<BuyerDash />} />
        <Route path="/pitch" element={<PitchBuilder />} />
        <Route path="/contract" element={<ContractPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/payment" element={<Payment jname="Web Development" />} />
        <Route path="/certifications" element={<Certifications />} />
      </Routes>
    </Router>
  );
}

export default App;
