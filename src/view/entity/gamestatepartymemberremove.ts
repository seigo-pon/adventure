import GameState from "./gamestate";
import GameStatePartyConfirm from "./gamestatepartyconfirm";
import GameParty from "../../domain/entity/gameparty";
import { ViewMapper } from "../viewmapper";
import ViewModel from "../viewmodel";

/**
 * メンバー削除
 */
export default class GameStatePartyMemberRemove implements GameState {
    id: string
    party: GameParty
    adventureCount: number

    constructor(id: string, party: GameParty, adventureCount: number) {
        this.id = id
        this.party = party
        this.adventureCount = adventureCount
    }

    async play(viewModel: ViewModel): Promise<GameState> {
        const memberSummaries = this.party.members.map((v, i, a) =>
            ViewMapper.memberDescription(v)[0]
        )
        const memnerIndex = await viewModel.select(memberSummaries, () =>
            viewModel.view.selectRemoveMember(memberSummaries)
        )

        const isRemove = await viewModel.confirm(() =>
            viewModel.view.isActuallyRemoveMember(memberSummaries[memnerIndex])
        )
        if (isRemove) {
            this.party.members.splice(memnerIndex)
        }

        return new GameStatePartyConfirm(this.id, this.party, this.adventureCount)
    }
}
