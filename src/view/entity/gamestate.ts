import ViewModel from "../viewmodel";

/**
 * ゲーム状態
 */
export default interface GameState {
    play(viewModel: ViewModel): Promise<GameState>
}
