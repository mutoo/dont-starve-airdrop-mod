// create an express app

const express = require("express");
const expressWs = require("express-ws");

const port = 9978;
const app = express();
expressWs(app);

const airdrop = require("./airdrop");

// log the request
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
  next();
});

app.use("/api", airdrop);

if (process.env.NODE_ENV === "development") {
  // serve the static files from the React app
  app.use(express.static("../dont-starve-airdrop-client/build"));
}

// start the server listening for requests
app.listen(port, () => console.log(`Server is running on port ${port}!`));
