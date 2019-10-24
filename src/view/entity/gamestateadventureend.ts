import GameState from "./gamestate";
import GameStateGameNext from "./gamestategamenext";
import { Dungeon } from "../../domain/entity/dungeon";
import GameParty from "../../domain/entity/gameparty";
import GameAdventure from "../../domain/entity/gameadventure";
import { ViewMapper } from "../viewmapper";
import ViewModel from "../viewmodel";

/**
 * 冒険終了
 */
export default class GameStateAdventureEnd implements GameState {
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
        const result = viewModel.gameMaster.resultAdventure(this.id, this.party, this.dungeon, this.adventure)
        viewModel.repository.addResult(result)

        await viewModel.view.resultAdventure(
            this.adventure.battles.length,
            result.wins,
            result.exp,
            result.items.map((v, i, a) => 
                ViewMapper.itemName(v)
            ),
            result.levelUpMembers.map((v, i, a) =>
                ViewMapper.memberDescription(v)[0]
            ),
            result.diedMembers.map((v, i, a) =>
                ViewMapper.memberDescription(v)[0]
            )
        )

        if (result.party.members.length == 0) {
            await viewModel.view.finishAdventure()
            throw Error("All members is died.")
        }

        return new GameStateGameNext(this.id, result.party, (this.adventureCount + 1))
    }
}
