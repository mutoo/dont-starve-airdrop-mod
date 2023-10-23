import { useEffect, useState } from "react";
import airdropState from "../state";

let server = "ws://localhost:9978/api/ws";

// if url has mode="remote"
const url = new URL(window.location.href);
if (url.searchParams.get("mode") === "remote") {
  server = `ws://${url.hostname}:${url.port}/api/ws`;
}

export default function useWebsocket() {
  const [ws, setWs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(server);
    ws.onerror = (evt) => {
      console.log(evt);
      setWs(null);
      setError("There was an error with your websocket.");
    };
    ws.onopen = () => {
      console.log("connected");
      setWs(ws);
      setError(null);
    };
    ws.onmessage = (evt) => {
      console.log(evt.data);
      const data = JSON.parse(evt.data);
      if (data.type === "sync") {
        airdropState.sync(data.payload);
      }
    };
    ws.onclose = (evt) => {
      console.log("disconnected");
      setWs(null);
      let reason = "";
      // See https://www.rfc-editor.org/rfc/rfc6455#section-7.4.1
      if (evt.code === 1000)
        reason =
          "Normal closure, meaning that the purpose for which the connection was established has been fulfilled.";
      else if (evt.code === 1001)
        reason =
          'An endpoint is "going away", such as a server going down or a browser having navigated away from a page.';
      else if (evt.code === 1002)
        reason =
          "An endpoint is terminating the connection due to a protocol error.";
      else if (evt.code === 1003)
        reason =
          "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";
      else if (evt.code === 1004)
        reason =
          "Reserved. The specific meaning might be defined in the future.";
      else if (evt.code === 1005)
        reason = "No status code was actually present.";
      else if (evt.code === 1006)
        reason =
          "The connection was closed abnormally, e.g., without sending or receiving a Close control frame.";
      else if (evt.code === 1007)
        reason =
          "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [https://www.rfc-editor.org/rfc/rfc3629] data within a text message).";
      else if (evt.code === 1008)
        reason =
          'An endpoint is terminating the connection because it has received a message that "violates its policy". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.';
      else if (evt.code === 1009)
        reason =
          "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
      else if (evt.code === 1010)
        // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
        reason =
          "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " +
          evt.reason;
      else if (evt.code === 1011)
        reason =
          "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
      else if (evt.code === 1015)
        reason =
          "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
      else reason = "Unknown reason";
      setError(reason);
    };
    return () => {
      ws.close();
    };
  }, []);

  return [ws, error];
}
