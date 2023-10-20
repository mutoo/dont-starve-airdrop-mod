import InventoryItem from "./components/InventoryItem";
import ReloadDialog from "./components/ReloadDialog";
import useWebsocket from "./hooks/ws";
import airdropState from "./state";
import { sendToServer, createPackage, createQueue } from "./utils/data";
import History from './components/History';


function App() {
  const [ws, error] = useWebsocket();

  if (error || !ws) {
    return (
      <div className="container mx-auto p-4">
        <ReloadDialog message={error} />
      </div>
    );
  }

  return (
    <div className="container max-w-xl mx-auto p-4 text-white space-y-6">
      <History history={airdropState.history} />
      <InventoryItem
        name="log"
        image={process.env.PUBLIC_URL + "/inventory/log.png"}
        onClick={() => {
          sendToServer(
            ws,
            createQueue(
              createPackage(1, [
                {
                  type: "item",
                  name: "log",
                  count: 1,
                },
              ])
            )
          );
        }}
      />
    </div>
  );
}

export default App;
