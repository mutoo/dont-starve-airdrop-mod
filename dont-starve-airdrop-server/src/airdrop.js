const express = require("express");
const expressWs = require("express-ws");

const airdrop = express();
expressWs(airdrop);

airdrop.use(express.json());

let PLAYERS = [];
let CLIENT_WS = [];
let QUEUE = [];

function updatePlayerInfo(players) {
  PLAYERS = players.map((player) => {
    return {
      name: player.name,
      prefab: player.prefab,
    };
  });
}

function processSync(ws) {
  console.log(`[${new Date().toLocaleString()}][sync]`);

  ws.send(
    JSON.stringify({
      type: "sync",
      payload: {
        players: PLAYERS,
        queue: QUEUE,
      },
    })
  );
}

function processQueue(payload) {
  console.log(`[${new Date().toLocaleString()}][queue] ${payload.type}`);

  QUEUE.push(payload);

  // keep queue size to 10
  if (QUEUE.length > 10) {
    QUEUE.shift();
  }

  CLIENT_WS.forEach(processSync);
}

function generateCommands(package) {
  const commands = [];

  if (package.processed) {
    return commands;
  }

  const player = package.receiver
    ? `UserToPlayer("${package.receiver}")`
    : "ThePlayer";

  // TODO: handle drop to everone

  for (const entry of package.entries) {
    if (entry.type === "item") {
      const count = entry.count || 1;
      for (let i = 0; i < count; i++) {
        const angle = (Math.random() * 360) | 0;
        // c_spane(prefab, count, dontselect)
        // the `false` ensure the spawned item is store in debug_entity
        commands.push(`c_spawn("${entry.name}", nil, false)`);
        // simulate a drop physic
        // Launch2(inst, launcher, basespeed, speedmult, startheight, startradius, vertical_speed, force_angle)
        commands.push(
          `Launch2(GetDebugEntity(), ${player}, 2, 0, .1, 1, 0, ${angle})`
        );
      }
    }

    if (entry.type === "command") {
      commands.push(entry.command);
    }
  }

  return commands;
}

airdrop.get("/heartbeat", (req, res) => {
  res.json({ message: "ok" });
});

airdrop.post("/sync", (req, res) => {
  console.log(
    `[${new Date().toLocaleString()}][sync] ${JSON.stringify(req.body)}`
  );

  updatePlayerInfo(req.body.players);

  const notProcessed = QUEUE.filter((package) => !package.processed);
  const commands = notProcessed.flatMap(generateCommands);

  if (commands.length > 0) {
    commands.push('c_announce("airdrop")');
  }

  res.json({ commands });

  // mark proccessed
  notProcessed.forEach((entry) => (entry.processed = true));

  // sync to all clients
  CLIENT_WS.forEach(processSync);
});

airdrop.ws("/ws", (ws, req) => {
  console.log(`[${new Date().toLocaleString()}][ws] connected`);
  CLIENT_WS.push(ws);

  ws.on("message", (msg) => {
    // log message
    console.log(`[${new Date().toLocaleString()}][ws] ${msg}`);

    const data = JSON.parse(msg);

    if (data.type === "heartbeat") {
      ws.send(JSON.stringify({ type: "heartbeat", payload: "ok" }));
    }
    if (data.type === "sync") {
      processSync(ws);
    }
    if (data.type === "queue") {
      processQueue(data.payload);
    }
  });

  ws.on("close", () => {
    console.log(`[${new Date().toLocaleString()}][ws] disconnected`);
    CLIENT_WS = CLIENT_WS.filter((client) => client !== ws);
  });

  // send current state
  processSync(ws);
});

module.exports = airdrop;
