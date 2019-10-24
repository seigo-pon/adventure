import * as UUID from "uuid";
import GameState from "./gamestate";
import GameStateSaveDataSelect from "./gamestatesavedataselect";
import GameStatePartyConfirm from "./gamestatepartyconfirm";
import GameParty from "../../domain/entity/gameparty";
import { ViewMapper } from "../viewmapper";
import ViewModel from "../viewmodel";

/**
 * 開始
 */
export default class GameStateStart implements GameState {
    async play(viewModel: ViewModel): Promise<GameState> {
        await viewModel.view.startGame()

        const saveDataList = await viewModel.view.loadSaveData(() =>
            viewModel.repository.getSaveDataList()
        )
        if (saveDataList.length == 0) {
            const party: GameParty = {
                id: UUID.v4(),
                createdAt: new Date(),
                members: [],
                exp: 0,
                level: 0
            }
            await viewModel.view.startNewGame(ViewMapper.date(party.createdAt))
            return new GameStatePartyConfirm(UUID.v4(), party, 0)
        } else {
            return new GameStateSaveDataSelect(saveDataList)
        }
    }
}
