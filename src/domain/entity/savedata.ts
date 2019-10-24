import GameParty from "./gameparty";

/**
 * セーブデータ
 */
export default interface SaveData {
    id: string
    savedAt: Date
    party: GameParty
}