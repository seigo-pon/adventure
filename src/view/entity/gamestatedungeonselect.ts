import GameState from "./gamestate";
import GameStateAdventureStart from "./gamestateadventurestart";
import GameParty from "../../domain/entity/gameparty";
import { ViewMapper } from "../viewmapper";
import ViewModel from "../viewmodel";

/**
 * ダンジョン選択
 */
export default class GameStateDungeonSelect implements GameState {
    id: string
    party: GameParty
    adventureCount: number

    constructor(id: string, party: GameParty, adventureCount: number) {
        this.id = id
        this.party = party
        this.adventureCount = adventureCount
    }

    async play(viewModel: ViewModel): Promise<GameState> {
        const dungeonTypes = viewModel.gameMaster.dungeons().map((v, i, a) =>
            ViewMapper.dungeonName(v)
        )
        const dungeonTypeIndex = await viewModel.select(dungeonTypes, () =>
            viewModel.view.selectDungeon(dungeonTypes)
        )
        return new GameStateAdventureStart(
            this.id,
            this.party,
            this.adventureCount,
            viewModel.gameMaster.dungeons()[dungeonTypeIndex]
        )
    }
}
