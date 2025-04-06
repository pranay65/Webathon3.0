import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export function Payment({ jname }) {
  const [job, setJob] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post("http://localhost:5400/jobs/pay", {
          jname,
        });
        const job = res.data.payload;
        setJob(job);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const proceedPayment = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required details.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5400/razorpay/create-order",
        {
          amount: job.price,
        }
      );

      const options = {
        key: "rzp_test_ZYP4VtDJ8ML7aq",
        amount: job.price * 100,
        currency: "INR",
        order_id: response.data.OrderId,
        name: "Job Payment",
        description: `Payment for Job: ${job.name}`,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        handler: function (res) {
          alert("Payment successful!");
          console.log(res);
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpay = new window.Razorpay(options);
      rzpay.open();
      rzpay.on("payment.failed", function () {
        alert("Payment failed. Please try again.");
      });
    } catch (err) {
      console.error(err);
      alert("Error initiating payment.");
    }
  };

  if (!job) {
    return (
      <div className="text-center text-red-500 mt-10">
        ❌ Job data is missing. Please try again.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg mt-0 pt-32">
        <h2 className="text-2xl font-bold mb-6 text-center">Pay for Job</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <div className="mt-6 border-t pt-4">
            <p className="font-medium">
              Job Title: <span className="font-semibold">{job.name}</span>
            </p>
            <p className="font-bold text-lg mt-2">
              Amount to Pay: ₹{job.price}
            </p>
          </div>

          <button
            onClick={proceedPayment}
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 font-semibold mt-4"
          >
            Pay ₹{job.price}
          </button>
        </div>
      </div>
    </>
  );
}

export default Payment;
