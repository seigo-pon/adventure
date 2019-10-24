import GameMaster from "../domain/gamemaster";
import Repository from "../domain/repository";
import View from "./view";
import GameState from "./entity/gamestate";
import GameStateStart from "./entity/gamestatestart";
import GameStateQuitGame from "./entity/gamestatequitgame";

/**
 * ロジック
 */
export default class ViewModel {
    repository: Repository
    gameMaster: GameMaster
    view: View

    constructor(repository: Repository, gameMaster: GameMaster, view: View) {
        this.repository = repository
        this.gameMaster = gameMaster
        this.view = view
    }

    private async checkQuit(selectedIndex: number) {
        if (selectedIndex != -1) {
            return
        }
        const isQuit = await this.view.isQuitForce()
        if (isQuit == 1 || isQuit == -1) {
            throw new Error("Game Quit")
        }
    }

    async confirm(confiemFunc: () => Promise<number>): Promise<number> {
        const index = await confiemFunc()
        await this.checkQuit(index)
        return index
    }

    async select(choices: Array<string>, choiceFunc: () => Promise<string>): Promise<number> {
        const index = choices.indexOf(await choiceFunc())
        await this.checkQuit(index)
        return index
    }

    private async quitGame(): Promise<GameState> {
        await this.view.quit()
        return new GameStateQuitGame()
    }

    /**
     * ゲーム処理
     * @param state ゲーム状態
     */
    private async execGame(state: GameState): Promise<GameState> {
        try {
            return await state.play(this)
        } catch (error) {
            return await this.quitGame()
        }
    }

    /**
     * メイン関数
     */
    async main() {
        let state = new GameStateStart()
        while (!(state instanceof GameStateQuitGame)) {
            state = await this.execGame(state)
        }
    }
}