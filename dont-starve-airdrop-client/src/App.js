import { useEffect, useState } from "react";

function Button({ children, onClick }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Spacer() {
  return <div className="inline-block p-1" />;
}

function App() {
  const [ws, setWs] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:9978/api/ws");
    ws.onerror = (evt) => {
      console.log(evt);
      setWs(null);
      setError("Could not connect to server");
    };
    ws.onopen = () => {
      console.log("connected");
      setWs(ws);
      setError(null);
    };
    ws.onmessage = (evt) => {
      console.log(evt.data);
    };
    ws.onclose = () => {
      console.log("disconnected");
      setWs(null);
    };
    return () => {
      ws.close();
    };
  }, []);
  if (error) {
  }

  if (error || !ws) {
    return (
      <div className="container mx-auto px-4">
        {error}
        <button
          onClick={() => {
            // reload the page
            window.location.reload();
          }}
        >
          Reload
        </button>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <Button
        onClick={() => {
          ws.send(
            JSON.stringify({
              type: "queue",
              payload: {
                type: "item",
                name: "carrot_cooked",
                player: 1,
              },
            })
          );
        }}
      >
        drop item
      </Button>
      <Spacer />
      <Button
        onClick={() => {
          ws.send(
            JSON.stringify({
              type: "queue",
              payload: {
                type: "command",
                name: "c_maintaintasks('mutoo')",
                player: 1,
              },
            })
          );
        }}
      >
        maintain health
      </Button>
      <Spacer />
      <Button
        onClick={() => {
          ws.send(
            JSON.stringify({
              type: "queue",
              payload: {
                type: "command",
                command: "c_maintainhealth('mutoo', 0.5)",
              },
            })
          );
        }}
      >
        cancel maintain task
      </Button>
    </div>
  );
}

export default App;
