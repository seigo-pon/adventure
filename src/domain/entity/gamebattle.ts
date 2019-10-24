import { GameItem } from "./gameitem";

/**
 * 戦闘
 */
export default interface GameBattle {
    exp: number
    items: Array<GameItem>,
    damages: Array<[string, number]>
}