const exp = require("express");
require("dotenv").config();
const cors = require("cors");
const userApp = require("./APIs/userApp");
const jobsApp = require("./APIs/jobsApp");
const modalApp = require("./APIs/modalApp");
const app = exp();

app.use(exp.json());
app.use(cors());

const port = process.env.PORT;

const client = require("mongodb").MongoClient;
client
  .connect(process.env.DBURL)
  .then((client) => {
    const database = client.db("freeDB");
    const usersCollection = database.collection("users");
    const jobsCollection = database.collection("jobs");
    app.set("usersCollection", usersCollection);
    app.set("jobsCollection", jobsCollection);
    console.log("Database Connected Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/user", userApp);
app.use("/jobs", jobsApp);
app.use("/modal",modalApp);

app.listen(port, () => {
  console.log(`Running on port: ${port}.`);
});
