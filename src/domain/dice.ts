/**
 * サイコロ
 */
export default interface Dice {
    /**
     * サイコロを振る
     * @param min 最小値
     * @param max 最大値
     */
    roll(min: number, max: number): number
}