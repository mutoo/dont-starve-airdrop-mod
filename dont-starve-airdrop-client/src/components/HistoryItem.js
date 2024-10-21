import { observer } from "mobx-react";
import Avatar from "./Avatar";
import airdropState from "../state";
import InventoryItem from "./InventoryItem";
import { getInventoryImage } from "../utils/image";
import { getPlayer } from "../utils/data";

export default observer(function HistoryItem({ item }) {
  const player = getPlayer(airdropState.players, item.receiver);
  const prefab = player?.prefab || "mod";
  return (
    <div className="flex flex-row items-start" key={item.uuid}>
      <div className="mt-4 mr-4">
        <Avatar prefab={prefab} />
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="space-x-2">
          <button
            onClick={() => {
              airdropState.setReceiver(player?.name || 1);
            }}
          >
            {player?.name || "Player 1"}
          </button>
          <span className={item.processed ? "text-lime-500" : "text-amber-500"}>
            ({item.processed ? "Delivered" : "Queued"})
          </span>
        </div>
        <div className="flex flex-row flex-wrap gap-1">
          {item.entries.map((entry) => (
            <InventoryItem
              key={entry.name}
              name={entry.name}
              count={entry.count}
              image={getInventoryImage(entry.name)}
              onClick={() => {
                airdropState.addDraftItem(entry.name, entry.count);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
