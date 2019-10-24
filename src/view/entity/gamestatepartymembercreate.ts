import * as UUID from "uuid";
import GameState from "./gamestate";
import GameStatePartyConfirm from "./gamestatepartyconfirm";
import GameParty from "../../domain/entity/gameparty";
import { ViewMapper } from "../viewmapper";
import ViewModel from "../viewmodel";

/**
 * メンバー作成
 */
export default class GameStatePartyMemberCreate implements GameState {
    id: string
    party: GameParty
    adventureCount: number

    constructor(id: string, party: GameParty, adventureCount: number) {
        this.id = id
        this.party = party
        this.adventureCount = adventureCount
    }

    async play(viewModel: ViewModel): Promise<GameState> {
        const jobNames = viewModel.gameMaster.jobs().map((v, i, a) =>
            ViewMapper.jobName(v)
        )
        const jobNameIndex = await viewModel.select(jobNames, () =>
            viewModel.view.selectJob(jobNames)
        )
        const member = viewModel.gameMaster.getCharacter(
            UUID.v4(),
            viewModel.gameMaster.jobs()[jobNameIndex]
        );
        this.party.members.push(member)

        const memberDescription = ViewMapper.memberDescription(member)
        await viewModel.view.createdNewMember(memberDescription[0], memberDescription[1], memberDescription[2])

        return new GameStatePartyConfirm(this.id, this.party, this.adventureCount)
    }
}
