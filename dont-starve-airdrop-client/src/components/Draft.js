import { observer } from "mobx-react";
import InventoryItem from "./InventoryItem";
import Button from "./Button";
import airdropState from "../state";
import { getInventoryImage } from "../utils/image";
import {
  sendToServer,
  createPackage,
  createQueue,
  getPlayer,
} from "../utils/data";
import Avatar from "./Avatar";

export default observer(function Draft({ ws }) {
  const { draft } = airdropState;
  const player = getPlayer(airdropState.players, draft.receiver);
  return (
    <div className="flex flex-row items-start gay-x-2">
      <div className="grow space-y-2 text-gray-500">
        <div className="flex flex-row gap-x-2 items-center">
          <span className="">To:</span>
          {airdropState.players.length > 1 && (
            <button
              onClick={() => {
                airdropState.prevPlayer();
              }}
            >
              <img
                className="w-10 h-10 rotate-180"
                src={process.env.PUBLIC_URL + "/images/page_arrow.png"}
                alt="next"
              />
            </button>
          )}
          <Avatar size="small" prefab={player.prefab} />
          {airdropState.players.length > 1 && (
            <button
              onClick={() => {
                airdropState.nextPlayer();
              }}
            >
              <img
                className="w-10 h-10"
                src={process.env.PUBLIC_URL + "/images/page_arrow.png"}
                alt="next"
              />
            </button>
          )}
          <span className="text-white">{player.name}</span>
        </div>
        <div className="grid gap-2">
          {!draft.entries.length ? (
            <div className="flex flex-row gap-x-2 items-center">
              <span className="">Please add some inventory items to drop.</span>
            </div>
          ) : (
            <div className="flex flex-row flex-wrap gap-1">
              {draft.entries.map((entry) => (
                <InventoryItem
                  name={entry.name}
                  count={entry.count}
                  image={getInventoryImage(entry.name)}
                  onClick={() => {
                    airdropState.removeDraftItem(entry.name);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grow-0">
        <Button
          onClick={() => {
            if (!draft.entries.length) return;
            sendToServer(
              ws,
              createQueue(createPackage(draft.receiver, draft.entries))
            );
            airdropState.resetDraft();
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/images/airdrop.png"}
            alt="send"
          />
        </Button>
      </div>
    </div>
  );
});
