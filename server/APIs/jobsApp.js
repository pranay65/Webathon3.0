const exp = require("express");
require("dotenv").config();
const expHandler = require("express-async-handler");
const { verifyToken } = require("../Middleware/authentication");
const jobsApp = exp.Router();

const addJob = expHandler(async (req, res) => {
  let job = req.body;
  let usersCollection = req.app.get("usersCollection");
  let jobsCollection = req.app.get("jobsCollection");

  const currSeller = job.seller;
  const dbUser = await usersCollection.findOne({ name: currSeller });

  if (dbUser.userType != "seller") {
    return res.send({ status: 400, message: "Not a seller" });
  }

  await jobsCollection.insertOne({ job });

  return res.send({ status: 200, message: "Added successfully" });
});

const getJobs = expHandler(async (req, res) => {
  let jobsCollection = req.app.get("jobsCollection");

  const data = await jobsCollection.find({}).toArray();
  if (!data) {
    data = [];
  }
  return res.send({ payload: data });
});

const getJob = expHandler(async (req, res) => {
  let jobsCollection = req.app.get("jobsCollection");

  const data = await jobsCollection.findOne({ "job.name": req.body.jname });

  if (!data) {
    data = [];
  }

  return res.send({ payload: data.job });
});

jobsApp.post("/add", verifyToken, addJob);
jobsApp.get("/", getJobs);
jobsApp.post("/pay", getJob);

module.exports = jobsApp;
