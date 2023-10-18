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

app.use('/api', airdrop);

// start the server listening for requests
app.listen(port, () => console.log(`Server is running on port ${port}!`));
