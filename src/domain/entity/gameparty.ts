import GameCharacter from "./gamecharacter";

/**
 * パーティー
 */
export default interface GameParty {
    id: string
    createdAt: Date
    members: Array<GameCharacter>
    exp: number
    level: number
}