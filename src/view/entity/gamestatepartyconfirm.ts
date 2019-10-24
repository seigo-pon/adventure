import GameState from "./gamestate";
import GameStatePartyMemberCreate from "./gamestatepartymembercreate";
import GameStatePartyMemberRemove from "./gamestatepartymemberremove";
import GameStateDungeonSelect from "./gamestatedungeonselect";
import GameParty from "../../domain/entity/gameparty";
import { ViewMapper } from "../viewmapper";
import ViewModel from "../viewmodel";

/**
 * キャンプメニュー
 */
enum CampMenu {
    ConfirmParty = "ConfirmParty",
    AddMember = "AddMember",
    RemoveMember = "RemoveMember"
}

/**
 * パーティー確認
 */
export default class GameStatePartyConfirm implements GameState {
    id: string
    party: GameParty
    adventureCount: number

    constructor(id: string, party: GameParty, adventureCount: number) {
        this.id = id
        this.party = party
        this.adventureCount = adventureCount
    }

    async play(viewModel: ViewModel): Promise<GameState> {
        if (this.party.members.length < viewModel.gameMaster.partyMemberMax) {
            if (this.party.members.length == 0) {
                return new GameStatePartyMemberCreate(this.id, this.party, this.adventureCount)
            }
            const isCreated = await viewModel.confirm(() =>
                viewModel.view.isCreateNewMember(this.party.members.length, viewModel.gameMaster.partyMemberMax)
            )
            if (isCreated) {
                return new GameStatePartyMemberCreate(this.id, this.party, this.adventureCount)
            }
        } else {
            viewModel.view.addedMaxMember(this.party.members.length, viewModel.gameMaster.partyMemberMax)
        }

        const isRemove = await viewModel.confirm(() =>
            viewModel.view.isRemoveMember()
        )
        if (isRemove) {
            return new GameStatePartyMemberRemove(this.id, this.party, this.adventureCount)
        }

        const memberSummaries = this.party.members.map((v, i, a) =>
            ViewMapper.memberDescription(v)[0]
        )
        await viewModel.view.detectedPartyMember(this.adventureCount, memberSummaries)

        return new GameStateDungeonSelect(this.id, this.party, this.adventureCount)
    }
}