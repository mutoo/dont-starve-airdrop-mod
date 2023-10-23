import { v4 as uuidv4 } from "uuid";

export const sendToServer = (ws, data) => {
  ws.send(JSON.stringify(data));
};

export const createQueue = (payload) => {
  return {
    type: "queue",
    payload,
  };
};

export const createPackage = (receiver, entries) => {
  return {
    type: "package",
    uuid: uuidv4(),
    receiver,
    entries,
  };
};

export const getPlayer = (players, id) => {
  let player = null;
  if (typeof id === "number") {
    player = players[id - 1];
  } else if (id === "" && players.length > 0) {
    player = players[0];
  } else {
    player = players.find((p) => p.name === id);
  }
  return player || { name: "Player 1", prefab: "mod" };
};
