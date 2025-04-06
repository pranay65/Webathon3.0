// const exp = require("express");
// require("dotenv").config();
// const expHandler = require("express-async-handler");
// const { verifyToken } = require("../Middleware/authentication");
// const projectApp = exp.Router();   

// projectApp.post("/create",verifyToken,async(req,res)=>{
//     const { name, description, buyer, deadline, budget } = req.body;
//     const projectsCollection = req.app.get("projectsCollection");

//     const project = {
//         name,
//         description,
//         buyer,
//         deadline,
//         budget,
//         status: "pending",
//     };
//     await projectsCollection.insertOne(project);
//     return res.send({status:200, message:"Project Added Successfully!"})
// })

// module.exports = projectApp;

const express = require("express");
require("dotenv").config();
const expHandler = require("express-async-handler");
const { verifyToken } = require("../Middleware/authentication");

const projectApp = express.Router();

projectApp.post(
  "/create",
  verifyToken,
  expHandler(async (req, res) => {
    const { name, description, buyer, deadline, budget } = req.body;
    const projectsCollection = req.app.get("projectsCollection");

    if (!name || !description || !buyer || !deadline || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const project = {
      name,
      description,
      buyer,
      deadline: new Date(deadline),
      budget: parseFloat(budget),
      status: "pending",
      createdAt: new Date(),
    };
    console.log(project);

    await projectsCollection.insertOne(project);

    return res.status(201).json({ status: 200, message: "Project Added Successfully!" });
  })
);

module.exports = projectApp;
