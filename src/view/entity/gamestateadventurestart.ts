import GameState from "./gamestate";
import GameStateDungeonAdventure from "./gamestatedungeonadventure";
import { Dungeon } from "../../domain/entity/dungeon";
import GameParty from "../../domain/entity/gameparty";
import GameAdventure from "../../domain/entity/gameadventure";
import { ViewMapper } from "../viewmapper";
import ViewModel from "../viewmodel";

/**
 * 冒険開始
 */
export default class GameStateAdventureStart implements GameState {
    id: string
    party: GameParty
    adventureCount: number
    dungeon: Dungeon

    constructor(id: string, party: GameParty, adventureCount: number, dungeon: Dungeon) {
        this.id = id
        this.party = party
        this.adventureCount = adventureCount
        this.dungeon = dungeon
    }

    async play(viewModel: ViewModel): Promise<GameState> {
        await viewModel.view.adventureDungeon(ViewMapper.dungeonName(this.dungeon))

        const adventure: GameAdventure = {
            battles: []
        }
        return new GameStateDungeonAdventure(this.id, this.party, this.adventureCount, this.dungeon, adventure)
    }
}
