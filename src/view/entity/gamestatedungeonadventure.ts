import GameState from "./gamestate";
import GameStateAdventureEnd from "./gamestateadventureend";
import { Dungeon } from "../../domain/entity/dungeon";
import GameParty from "../../domain/entity/gameparty";
import GameAdventure from "../../domain/entity/gameadventure";
import ViewModel from "../viewmodel";

/**
 * 冒険中
 */
export default class GameStateDungeonAdventure implements GameState {
    id: string
    party: GameParty
    adventureCount: number
    dungeon: Dungeon
    adventure: GameAdventure

    constructor(id: string, party: GameParty, adventureCount: number, dungeon: Dungeon, adventure: GameAdventure) {
        this.id = id
        this.party = party
        this.adventureCount = adventureCount
        this.dungeon = dungeon
        this.adventure = adventure
    }

    async play(viewModel: ViewModel): Promise<GameState> {
        while (this.adventure.battles.length < viewModel.gameMaster.battleMax(this.dungeon)) {
            await viewModel.view.startBattle((this.adventure.battles.length + 1))

            const battle = viewModel.gameMaster.battle(this.dungeon, this.party)
            this.adventure.battles.push(battle)
        }

        await viewModel.view.endBattle()
        return new GameStateAdventureEnd(this.id, this.party, this.adventureCount, this.dungeon, this.adventure)
    }
}
