import { makeAutoObservable } from "mobx";

export function createAirdropState() {
    return makeAutoObservable({
        history: [],
        players: [],
    });
}

const airdropState = createAirdropState();

export default airdropState;
