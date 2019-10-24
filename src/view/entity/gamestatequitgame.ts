import GameState from "./gamestate";
import ViewModel from "../viewmodel";

/**
 * 終了
 */
export default class GameStateQuitGame implements GameState {
    async play(viewModel: ViewModel): Promise<GameState> {
        return new GameStateQuitGame()
    }
}
