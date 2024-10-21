// create an express app

const express = require("express");
const expressWs = require("express-ws");

const port = process.env.AIRDROP_PORT || 9978;
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
} else {
  // otherwise redirect all other request to https://airdrop-mod.mutoo.im
  app.get('*', (req, res) => {
    res.redirect('https://airdrop-mod.mutoo.im');
  });
}

// start the server listening for requests
app.listen(port, () => console.log(`Airdrop Server is running on port ${port}! Please launch your game with airdrop-mod enabled now, and start from https://airdrop-mod.mutoo.im to airdrop your suppliment!`));
