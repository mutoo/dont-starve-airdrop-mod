import InventoryItem from "./components/InventoryItem";
import ReloadDialog from "./components/ReloadDialog";
import useWebsocket from "./hooks/ws";
import airdropState from "./state";
import Draft from "./components/Draft";
import History from "./components/History";
import { inventory } from "./config";
import { getInventoryImage } from "./utils/image";

function App() {
  const [ws, error] = useWebsocket();

  if (error || !ws) {
    return (
      <div className="container mx-auto p-4">
        <ReloadDialog message={error} />
      </div>
    );
  }

  const fav = inventory.categories.filter(
    (category) => category.type === "favorites"
  )[0];

  return (
    <div className="container max-w-xl mx-auto p-4 text-white space-y-6">
      <h1 className="mb-2"># Airdrop</h1>
      <Draft ws={ws} />
      <h1 className="mb-2"># Favorites</h1>
      <div className="flex flex-row flex-wrap gap-1">
        {fav.items.map((item) => {
          return (
            <InventoryItem
              key={item.name}
              name={item.name}
              image={getInventoryImage(item.name)}
              onClick={(e) => {
                airdropState.addDraftItem(item.name, e.shiftKey ? 5 : 1);
              }}
            />
          );
        })}
      </div>
      <h1 className="mb-2"># Airdrop History</h1>
      <History history={airdropState.history} />
    </div>
  );
}

export default App;
