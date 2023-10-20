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
