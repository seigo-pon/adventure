import GameParty from "./gameparty";
import GameCharacter from "./gamecharacter";
import { Dungeon } from "./dungeon";
import { GameItem } from "./gameitem";

export default interface GameResult {
    id: string
    createdAt: Date
    party: GameParty
    dungeon: Dungeon
    wins: number
    exp: number
    items: Array<GameItem>
    levelUpMembers: Array<GameCharacter>
    diedMembers: Array<GameCharacter>
}