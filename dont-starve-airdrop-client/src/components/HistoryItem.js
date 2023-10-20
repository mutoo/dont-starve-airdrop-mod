import { observer } from "mobx-react";
import Avatar from "./Avatar";
import airdropState from "../state";
import InventoryItem from "./InventoryItem";
import { getInventoryImage } from "../utils/image";

export default observer(function HistoryItem({ item }) {
  const playerId = item.receiver;
  const player =
    typeof playerId === "number"
      ? airdropState.players[playerId - 1]
      : airdropState.players.find((p) => p.name === playerId);
  const prefab = player?.prefab || "mod";
  return (
    <div className="flex flex-row gap-x-2 items-start" key={item.uuid}>
      <div>
        <Avatar prefab={prefab} />
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="space-x-2">
          <button>{player?.name || "Unknown"}</button>
          <span className={item.processed ? "text-lime-500" : "text-amber-500"}>
            ({item.processed ? "Delivered" : "Queued"})
          </span>
        </div>
        <div className="grid gap-2">
          {item.entries.map((entry) => (
            <InventoryItem
              name={entry.name}
              count={entry.count}
              image={getInventoryImage(entry.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
