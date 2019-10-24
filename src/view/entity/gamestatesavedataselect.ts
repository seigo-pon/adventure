import * as UUID from "uuid";
import GameState from "./gamestate";
import GameStatePartyConfirm from "./gamestatepartyconfirm";
import SaveData from "../../domain/entity/savedata";
import GameParty from "../../domain/entity/gameparty";
import { ViewMapper } from "../viewmapper";
import ViewModel from "../viewmodel";

/**
 * セーブデータ選択
 */
export default class GameStateSaveDataSelect implements GameState {
    saveDataList: Array<SaveData>

    constructor(saveDataList: Array<SaveData>) {
        this.saveDataList = saveDataList
    }

    async play(viewModel: ViewModel): Promise<GameState> {
        const isLoad = await viewModel.view.isLoadSaveData()
        if (isLoad) {
            const saveDataDates = this.saveDataList.map((v, i, a) =>
                ViewMapper.date(v.savedAt)
            )
            const saveDataDateIndex = await viewModel.select(saveDataDates, () =>
                viewModel.view.selectSaveData(saveDataDates)
            )
            const saveData = this.saveDataList[saveDataDateIndex]

            const resultList = await viewModel.view.loadResults(() =>
                viewModel.repository.getResultList(saveData.id)
            )

            await viewModel.view.selectedSaveData(
                ViewMapper.date(saveData.savedAt),
                resultList.length,
                saveData.party.level,
                saveData.party.exp,
                saveData.party.members.map((v, i, a) =>
                    ViewMapper.memberDescription(v)[0]
                )
            )
            return new GameStatePartyConfirm(saveData.id, saveData.party, resultList.length)
        } else {
            const party: GameParty = {
                id: UUID.v4(),
                createdAt: new Date(),
                members: [],
                exp: 0,
                level: 0
            }
            await viewModel.view.startNewGame(ViewMapper.date(party.createdAt))
            return new GameStatePartyConfirm(UUID.v4(), party, 0)
        }
    }
}
