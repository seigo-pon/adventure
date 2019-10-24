import GameState from "./gamestate";
import GameStatePartyConfirm from "./gamestatepartyconfirm";
import GameParty from "../../domain/entity/gameparty";
import SaveData from "../../domain/entity/savedata";
import { ViewMapper } from "../viewmapper";
import ViewModel from "../viewmodel";

/**
 * 次のターン
 */
export default class GameStateGameNext implements GameState {
    id: string
    party: GameParty
    adventureCount: number

    constructor(id: string, party: GameParty, adventureCount: number) {
        this.id = id
        this.party = party
        this.adventureCount = adventureCount
    }

    async play(viewModel: ViewModel): Promise<GameState> {
        const isSave = await viewModel.confirm(() =>
            viewModel.view.isSaveGame()
        )
        if (isSave) {
            const saveData: SaveData = {
                id: this.id,
                savedAt: new Date(),
                party: this.party
            }
            viewModel.repository.addSaveData(saveData)
        }

        const isQuit = await viewModel.view.isQuit()
        if (isQuit == 1 || isQuit === undefined) {
            throw Error("Quit Game.")
        }

        await viewModel.view.startNextGame(
            this.adventureCount,
            this.party.level,
            this.party.exp,
            this.party.members.map((v, i, a) =>
                ViewMapper.memberDescription(v)[0]
            )
        )
        return new GameStatePartyConfirm(this.id, this.party, this.adventureCount)
    }
}
