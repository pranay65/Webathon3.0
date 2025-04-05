const exp = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const expHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const requestsApp = exp.Router();
const { verifyToken } = require("../Middleware/authentication");

const addNewRequest = expHandler(async (req, res) => {
  const data = req.body;
  const requestsCollection = req.app.get("requestsCollection");
  const usersCollection = req.app.get("usersCollection");

  const sellerUsername = data.seller;
  const dbUser = await usersCollection.findOne({ name: sellerUsername });
  if (!dbUser) {
    return res.send({ status: 400, message: "Seller Not Found!" });
  }

  const request = {
    buyer: req.name,
    seller: data.seller,
    name: data.name,
    status: "pending",
  };

  await requestsCollection.insertOne(request);

  return res.send({ status: 200, message: "Done!" });
});

requestsApp.post("/add", verifyToken, addNewRequest);

module.exports = requestsApp;
