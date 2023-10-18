// create an express app

const express = require("express");
const app = express();
const port = 9978;

// log the request
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
  next();
});

// handle the heart beat
app.get("/heartbeat", (req, res) => {
  res.json({ message: "ok" });
});

// handle the airdrop
app.get("/airdrop", (req, res) => {
  res.json({ commands: ['c_announce("airdrop")', 'c_spawn("twigs", nil, true)'] });
});

// start the server listening for requests
app.listen(port, () => console.log(`Server is running on port ${port}!`));
