import Dice from "../domain/dice";

export default class DiceImpl implements Dice {
    roll(min: number, max: number): number {
        return Math.floor(Math.random() * ((max + 1) - min) + min)
    }
}