import { useState } from "react";
import classnames from "classnames";
import InventoryItem from "./components/InventoryItem";
import ReloadDialog from "./components/ReloadDialog";
import useWebsocket from "./hooks/ws";
import airdropState from "./state";
import Draft from "./components/Draft";
import History from "./components/History";
import config from "./config.yml";
import { getInventoryImage } from "./utils/image";
import styles from "./App.module.css";
import BuyMeCoffee from "./components/BuyMeCoffee";

function App() {
  const [ws, error] = useWebsocket();
  const [categoryType, setCategoryType] = useState("favorites");

  if (error || !ws) {
    return (
      <div className="container mx-auto p-4">
        <ReloadDialog message={error} />
      </div>
    );
  }

  const fav = config.inventory.categories.filter(
    (category) => category.type === categoryType
  )[0];

  return (
    <div className="container max-w-xl mx-auto p-4 mb-20 text-white space-y-6">
      <h1 className="mb-2"># Airdrop</h1>
      <Draft ws={ws} />
      <h1 className="mb-2"># Categories</h1>
      <div className="flex flex-row flex-wrap gap-1">
        {config.inventory.categories.map((category) => {
          return (
            <button
              key={category.type}
              className={classnames(styles.filter, "w-10 h-10")}
              onClick={() => {
                setCategoryType(category.type);
              }}
            >
              <img
                className="w-10 h-10"
                src={
                  process.env.PUBLIC_URL + `/images/filter_${category.icon}.png`
                }
                alt={category.type}
              />
            </button>
          );
        })}
      </div>
      <h2 className="mb-2">## {categoryType}</h2>
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
      <div className="text-gray-500">
        Tip: Press and hold the "Shift" key to add five items with each click.
      </div>
      <h1 className="mb-2"># Airdrop History</h1>
      <History history={airdropState.history} />
      <hr className="border-gray-500 max-w-xs" />
      <div className="text-gray-500">
        Disclaimer: All game-related images and trademarks are property of klei.
      </div>
      <BuyMeCoffee />
    </div>
  );
}

export default App;
