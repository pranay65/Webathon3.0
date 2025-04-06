const express = require("express");
require("dotenv").config();
const expHandler = require("express-async-handler");
const { verifyToken } = require("../Middleware/authentication");

const reviewApp = express.Router();

reviewApp.post(
  "/review",
  verifyToken,
  expHandler(async (req, res) => {
    const { name, rating, reviewText } = req.body;
    const reviewsCollection = req.app.get("reviewsCollection");

    const review = {
      name,
      rating,
      reviewText,
      createdAt: new Date(),
    };

    await reviewsCollection.insertOne(review);

    return res.status(201).json({ status: 200, message: "Review Added Successfully!" });
  })
);

module.exports = reviewApp;
