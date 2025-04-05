const exp = require("express");
require("dotenv").config();
const expHandler = require("express-async-handler");
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

const fetchRequests = expHandler(async (req, res) => {
  const requestsCollection = req.app.get("requestsCollection");

  const resData = await requestsCollection.find({ seller: req.name }).toArray();

  if (!resData) {
    return res.send({ status: 400, payload: [] });
  }

  return res.send({ status: 200, payload: resData });
});

const acceptRequest = expHandler(async (req, res) => {
  const { reqName } = req.body;
  const requestsCollection = req.app.get("requestsCollection");

  const result = await requestsCollection.updateOne(
    { name: reqName },
    { $set: { status: "accepted" } }
  );

  if (result.modifiedCount === 0) {
    return res.send({
      status: 400,
      message: "Request not found or already accepted.",
    });
  }

  return res.send({ status: 200, message: "Request accepted successfully." });
});

requestsApp.post("/add", verifyToken, addNewRequest);
requestsApp.get("/", verifyToken, fetchRequests);
requestsApp.put("/accept", acceptRequest);

module.exports = requestsApp;
