import { Job } from "../domain/entity/job";
import { Dungeon } from "../domain/entity/dungeon";
import { GameItem } from "../domain/entity/gameitem";
import GameCharacter from "../domain/entity/gamecharacter";
import GameParty from "../domain/entity/gameparty";
import SaveData from "../domain/entity/savedata";
import GameResult from "../domain/entity/gameresult";

/**
 * Data層のマッパー
 */
export namespace DataMapper {
    /**
     * メンバーのJSON
     */
    interface GameCharacterJson {
        id: string
        name: string
        age: number
        job: string
        hp: number
        mp: number
        physicalAattack: number
        physicalGuard: number
        magicalAattack: number
        magicalGuard: number
    }
    /**
     * JSONからメンバーの作成
     * @param json メンバー情報を格納したJSON
     */
    function member(json: GameCharacterJson): GameCharacter {
        return {
            id: json.id,
            name: json.name,
            age: json.age,
            job: json.job as Job,
            hp: json.hp,
            mp: json.mp,
            physicalAattack: json.physicalAattack,
            physicalGuard: json.physicalGuard,
            magicalAattack: json.magicalAattack,
            magicalGuard: json.magicalGuard
        }
    }
    /**
     * メンバーからJSONの作成
     * @param gamecharacter メンバー
     */
    function memberJson(gamecharacter: GameCharacter): GameCharacterJson {
        return {
            id: gamecharacter.id,
            name: gamecharacter.name,
            age: gamecharacter.age,
            job: gamecharacter.job as string,
            hp: gamecharacter.hp,
            mp: gamecharacter.mp,
            physicalAattack: gamecharacter.physicalAattack,
            physicalGuard: gamecharacter.physicalGuard,
            magicalAattack: gamecharacter.magicalAattack,
            magicalGuard: gamecharacter.magicalGuard
        }
    }

    /**
     * パーティーのJSON
     */
    interface GamePartyJson {
        id: string,
        createdAt: number
        members: Array<GameCharacterJson>
        exp: number
        level: number
    }
    /**
     * JSONからパーティーの作成
     * @param json パーティー情報を格納したJSON
     */
    function party(json: GamePartyJson): GameParty {
        return {
            id: json.id,
            createdAt: new Date(json.createdAt),
            members: json.members.map(function (v) {
                return member(v)
            }),
            exp: json.exp,
            level: json.level
        }
    }
    /**
     * パーティーからJSONの作成
     * @param party パーティー
     */
    function partyJson(party: GameParty): GamePartyJson {
        return {
            id: party.id,
            createdAt: party.createdAt.getTime(),
            members: party.members.map(function (v) {
                return memberJson(v)
            }),
            exp: party.exp,
            level: party.level
        }
    }

    /**
     * セーブデータのJSON
     */
    interface SaveDataJson {
        id: string
        savedAt: number
        party: GamePartyJson
    }
    /**
     * JSONからセーブデータの作成
     * @param json セーブデータ情報を格納したJSON
     */
    export function saveData(json: SaveDataJson): SaveData {
        return {
            id: json.id,
            savedAt: new Date(json.savedAt),
            party: party(json.party)
        }
    }
    export function saveDataJson(saveData: SaveData): SaveDataJson {
        return {
            id: saveData.id,
            savedAt: saveData.savedAt.getTime(),
            party: partyJson(saveData.party)
        }
    }

    /**
     * セーブデータのJSON
     */
    interface GameResultJson {
        id: string
        createdAt: number
        party: GamePartyJson
        dungeon: string
        wins: number
        exp: number
        items: Array<string>
        levelUpMembers: Array<GameCharacterJson>
        diedMembers: Array<GameCharacterJson>
    }
    /**
     * JSONからセーブデータの作成
     * @param json セーブデータ情報を格納したJSON
     */
    export function result(json: GameResultJson): GameResult {
        return {
            id: json.id,
            createdAt: new Date(json.createdAt),
            party: party(json.party),
            dungeon: json.dungeon as Dungeon,
            wins: json.wins,
            exp: json.exp,
            items: json.items as Array<GameItem>,
            levelUpMembers: json.levelUpMembers.map((v, i, a) =>
                member(v)
            ),
            diedMembers: json.diedMembers.map((v, i, a) =>
                member(v)
            )
        }
    }
    export function resultJson(result: GameResult): GameResultJson {
        return {
            id: result.id,
            createdAt: result.createdAt.getTime(),
            party: partyJson(result.party),
            dungeon: result.dungeon as string,
            wins: result.wins,
            exp: result.exp,
            items: result.items as Array<string>,
            levelUpMembers: result.levelUpMembers.map((v, i, a) =>
                member(v)
            ),
            diedMembers: result.diedMembers.map((v, i, a) =>
                member(v)
            )
        }
    }
}