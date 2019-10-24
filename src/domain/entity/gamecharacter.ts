import { Job } from "./job";

/**
 * ゲームキャラクター
 */
export default interface GameCharacter {
    id: string
    name: string
    age: number
    job: Job
    hp: number
    mp: number
    physicalAattack: number
    physicalGuard: number
    magicalAattack: number
    magicalGuard: number
}
