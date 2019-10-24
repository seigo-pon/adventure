import moment = require("moment");
import { Job } from "../domain/entity/job";
import { Dungeon } from "../domain/entity/dungeon";
import { GameItem } from "../domain/entity/gameitem";
import GameCharacter from "../domain/entity/gamecharacter";

/**
 * View層のマッパー
 */
export namespace ViewMapper {
    const dateFormat = "YYYY/MM/DD HH:mm:ss"

    /**
     * 職業名
     * @param job 職業
     */
    export function jobName(job: Job): string {
        switch (job) {
            case Job.Warrior:
                return "戦士"
            case Job.Knight:
                return "騎士"
            case Job.Ranger:
                return "狩人"
            case Job.Monk:
                return "僧侶"
            case Job.Priest:
                return "神官"
            case Job.Wizard:
                return "魔術師"
        }
    }

    /**
     * 日付
     * @param date 日付
     */
    export function date(date: Date): string {
        return moment(date).format(dateFormat)
    }

    /**
     * メンバー情報
     * @param member メンバー
     */
    export function memberDescription(member: GameCharacter): [string, string, string] {
        const memberSummary = member.name + ": " + member.age + "歳 " + ViewMapper.jobName(member.job)
        const memberParameter = "HP: " + member.hp + " MP: " + member.mp
        const memberAbility = "物攻: " + member.physicalAattack + " 物防: " + member.physicalGuard +
            " 魔攻: " + member.magicalAattack + " 魔防: " + member.magicalGuard
        return [memberSummary, memberParameter, memberAbility]
    }

    /**
     * ダンジョン種類名
     * @param dungeon ダンジョン種類
     */
    export function dungeonName(dungeon: Dungeon): string {
        switch (dungeon) {
            case Dungeon.VeryEasy:
                return "近郊の草原(超簡単)"
            case Dungeon.Easy:
                return "迷いの森(簡単)"
            case Dungeon.Normal:
                return "暗闇の洞窟(普通)"
            case Dungeon.Hard:
                return "古代の塔(難関)"
            case Dungeon.VeryHard:
                return "最果ての渓谷(超難関)"
            case Dungeon.ExtraHard:
                return "夢幻の城(最難関)"
        }
    }

    /**
     * ドロップアイテム名
     * @param item ドロップアイテム
     */
    export function itemName(item: GameItem): string {
        switch (item) {
            case GameItem.Herb:
                return "薬草"
            case GameItem.Leather:
                return "なめし皮"
            case GameItem.Jewel:
                return "宝石"
            case GameItem.Gold:
                return "金貨"
        }
    }
}