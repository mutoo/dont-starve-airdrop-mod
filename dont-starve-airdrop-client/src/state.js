import { makeAutoObservable } from "mobx";

const MAX_COUNT = 40;

export function createAirdropState() {
  return makeAutoObservable({
    history: [],
    players: [],
    draft: {
      receiver: "",
      entries: [],
    },
    sync(payload) {
      this.players.replace(payload.players);
      this.history.replace(payload.queue);
    },
    setReceiver(receiver) {
      this.draft.receiver = receiver;
    },
    addDraftItem(name, count = 1) {
      const entry = this.draft.entries.find((e) => e.name === name);
      if (entry) {
        entry.count += count;
        if (entry.count > MAX_COUNT) {
          entry.count = MAX_COUNT;
        }
      } else {
        this.draft.entries.push({
          type: "item",
          name,
          count: Math.min(count, MAX_COUNT),
        });
      }
    },
    removeDraftItem(name) {
      const index = this.draft.entries.findIndex((e) => e.name === name);
      if (index !== -1) {
        this.draft.entries.splice(index, 1);
      }
    },
    resetDraft() {
      this.draft.receiver = "";
      this.draft.entries.clear();
    },
  });
}

const airdropState = createAirdropState();

export default airdropState;
