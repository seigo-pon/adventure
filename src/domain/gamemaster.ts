import { Job } from "./entity/job";
import { Dungeon } from "./entity/dungeon";
import { GameItem } from "./entity/gameitem";
import Dice from "./dice";
import GameCharacter from "./entity/gamecharacter";
import GameParty from "./entity/gameparty";
import GameBattle from "./entity/gamebattle";
import GameAdventure from "./entity/gameadventure";
import GameResult from "./entity/gameresult";

/**
 * メンバーパラメータ
 */
enum Parameter {
    Hp = "Hp",
    Mp = "Mp",
    PhysicalAattack = "PhysicalAattack",
    PhysicalGuard = "PhysicalGuard",
    MagicalAttack = "MagicalAattack",
    MagicalGuard = "MagicalGuard"
}

/**
 * ゲームを管理運用するゲームマスター
 */
export default class GameMaster {
    private static katakanaAny = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ"
    private static katakanaSecond = "ッャュョヲンー"
    private static ageRange = [10, 60]
    private static hpMax = [10, 999]
    private static mpMax = [10, 999]
    private static physicalAattackMax = [10, 999]
    private static physicalGuardMax = [10, 999]
    private static magicalAattackMax = [5, 99]
    private static magicalGuardMax = [5, 99]

    private dice: Dice

    constructor(dice: Dice) {
        this.dice = dice
    }

    /**
     * メンバー名
     */
    private getName(): string {
        let name = ""

        const length = this.dice.roll(3, 4)
        for (let index = 0; index < length; index++) {
            let nameArray = GameMaster.katakanaAny
            if (index > 0) {
                nameArray += GameMaster.katakanaSecond
            }
            const decide = this.dice.roll(0, (nameArray.length - 1))
            name += nameArray[decide]
        }

        return name
    }

    /**
     * メンバー年齢
     */
    private getAge(): number {
        return this.dice.roll(GameMaster.ageRange[0], GameMaster.ageRange[1])
    }

    /**
     * メンバーHP
     * @param job 職業
     */
    private getHp(job: Job): number {
        let hp = this.dice.roll(1, GameMaster.hpMax[0])

        switch (job) {
            case Job.Warrior:
                hp += this.dice.roll(1, 8)
                break

            case Job.Knight:
                hp += this.dice.roll(1, 5)
                break

            case Job.Monk:
            case Job.Ranger:
                hp += this.dice.roll(0, 3)
                break

            case Job.Priest:
            case Job.Wizard:
                break
        }

        return hp
    }

    /**
     * メンバーMP
     * @param job 職業
     */
    private getMp(job: Job): number {
        let mp = this.dice.roll(1, GameMaster.mpMax[0])

        switch (job) {
            case Job.Warrior:
            case Job.Knight:
            case Job.Ranger:
                break

            case Job.Monk:
            case Job.Priest:
                mp += this.dice.roll(0, 5);
                break

            case Job.Wizard:
                mp += this.dice.roll(1, 8);
                break
        }

        return mp
    }

    /**
     * メンバー物理攻撃
     * @param job 職業
     */
    private getPhysicalAattack(job: Job): number {
        let attack = this.dice.roll(1, GameMaster.physicalAattackMax[0])

        switch (job) {
            case Job.Warrior:
                attack += this.dice.roll(1, 5)
                break

            case Job.Knight:
                attack += this.dice.roll(1, 2)
                break

            case Job.Monk:
            case Job.Ranger:
                attack += this.dice.roll(0, 1)
                break

            case Job.Priest:
            case Job.Wizard:
                break
        }

        return attack
    }

    /**
     * メンバー物理防御
     * @param job 職業
     */
    private getPhysicalGuard(job: Job): number {
        let guard = this.dice.roll(1, GameMaster.physicalGuardMax[0])

        switch (job) {
            case Job.Warrior:
                guard += this.dice.roll(1, 2)
                break

            case Job.Knight:
                guard += this.dice.roll(1, 5)
                break

            case Job.Monk:
            case Job.Ranger:
                guard += this.dice.roll(0, 1)
                break

            case Job.Priest:
            case Job.Wizard:
                break
        }

        return guard
    }

    /**
     * メンバー魔法攻撃
     * @param job 職業
     */
    private getMagicalAattack(job: Job): number {
        let attack = this.dice.roll(1, GameMaster.magicalAattackMax[0])

        switch (job) {
            case Job.Warrior:
            case Job.Knight:
            case Job.Ranger:
                break

            case Job.Monk:
            case Job.Priest:
                attack += this.dice.roll(0, 3)
                break

            case Job.Wizard:
                attack += this.dice.roll(1, 5)
                break
        }

        return attack
    }

    /**
     * メンバー魔法防御
     * @param job 職業
     */
    private getMagicalGuard(job: Job): number {
        let guard = this.dice.roll(1, GameMaster.magicalGuardMax[0])

        switch (job) {
            case Job.Warrior:
            case Job.Knight:
            case Job.Ranger:
                break

            case Job.Monk:
            case Job.Priest:
                guard += this.dice.roll(0, 3)
                break

            case Job.Wizard:
                guard += this.dice.roll(1, 5)
                break
        }

        return guard
    }

    /**
     * メンバー作成
     * @param id メンバーID
     * @param job 職業
     */
    getCharacter(id: string, job: Job): GameCharacter {
        return {
            id: id,
            name: this.getName(),
            age: this.getAge(),
            job: job,
            hp: this.getHp(job),
            mp: this.getMp(job),
            physicalAattack: this.getPhysicalAattack(job),
            physicalGuard: this.getPhysicalGuard(job),
            magicalAattack: this.getMagicalAattack(job),
            magicalGuard: this.getMagicalGuard(job)
        }
    }

    /**
     * メンバー最大数
     */
    partyMemberMax = 4

    /**
     * 職業リスト
     */
    jobs(): Array<Job> {
        return [
            Job.Warrior,
            Job.Knight,
            Job.Ranger,
            Job.Monk,
            Job.Priest,
            Job.Wizard
        ]
    }

    /**
     * ダンジョン種類リスト
     */
    dungeons(): Array<Dungeon> {
        return [
            Dungeon.VeryEasy,
            Dungeon.Easy,
            Dungeon.Normal,
            Dungeon.Hard,
            Dungeon.VeryHard,
            Dungeon.ExtraHard
        ]
    }

    /**
     * 戦闘回数
     * @param dungeon ダンジョン種類
     */
    battleMax(dungeon: Dungeon): number {
        switch (dungeon) {
            case Dungeon.VeryEasy:
                return 1
            case Dungeon.Easy:
                return 3
            case Dungeon.Normal:
                return 6
            case Dungeon.Hard:
                return 9
            case Dungeon.VeryHard:
                return 12
            case Dungeon.ExtraHard:
                return 20
        }
    }

    /**
     * ドロップアイテムリスト
     */
    items(): Array<GameItem> {
        return [
            GameItem.Herb,
            GameItem.Leather,
            GameItem.Jewel,
            GameItem.Gold
        ]
    }

    /**
     * 戦闘
     * @param dungeon ダンジョン種類
     * @param party パーティー
     */
    battle(dungeon: Dungeon, party: GameParty): GameBattle {
        switch (dungeon) {
            case Dungeon.VeryEasy: {
                const battle: GameBattle = {
                    exp: (this.dice.roll(1, 6) > 1) ? this.dice.roll(0, 5) : 0,
                    items: (this.dice.roll(1, 6) > 3) ? new Array(this.items()[this.dice.roll(0, (this.items().length - 1))]): [],
                    damages: party.members.map((v, i, a) => {
                        return [v.id, this.dice.roll(0, 3)]
                    })
                }
                return battle
            }

            case Dungeon.Easy: {
                const battle: GameBattle = {
                    exp: (this.dice.roll(1, 6) > 2) ? this.dice.roll(0, 10) : 0,
                    items: (this.dice.roll(1, 6) > 3) ? new Array(this.items()[this.dice.roll(0, (this.items().length - 1))]): [],
                    damages: party.members.map((v, i, a) => {
                        return [v.id, this.dice.roll(0, 5)]
                    })
                }
                return battle
            }

            case Dungeon.Normal: {
                const battle: GameBattle = {
                    exp: (this.dice.roll(1, 6) > 3) ? this.dice.roll(0, 20) : 0,
                    items: (this.dice.roll(1, 6) > 4) ? new Array(this.items()[this.dice.roll(0, (this.items().length - 1))]): [],
                    damages: party.members.map((v, i, a) => {
                        return [v.id, this.dice.roll(0, 15)]
                    })
                }
                return battle
            }

            case Dungeon.Hard: {
                const battle: GameBattle = {
                    exp: (this.dice.roll(1, 6) > 4) ? this.dice.roll(0, 40) : 0,
                    items: (this.dice.roll(1, 6) > 4) ? new Array(this.items()[this.dice.roll(0, (this.items().length - 1))]): [],
                    damages: party.members.map((v, i, a) => {
                        return [v.id, this.dice.roll(0, 30)]
                    })
                }
                return battle
            }

            case Dungeon.VeryHard: {
                const battle: GameBattle = {
                    exp: (this.dice.roll(1, 6) > 5) ? this.dice.roll(0, 50) : 0,
                    items: (this.dice.roll(1, 6) > 5) ? new Array(this.items()[this.dice.roll(0, (this.items().length - 1))]): [],
                    damages: party.members.map((v, i, a) => {
                        return [v.id, this.dice.roll(0, 50)]
                    })
                }
                return battle
            }

            case Dungeon.ExtraHard: {
                const battle: GameBattle = {
                    exp: (this.dice.roll(1, 6) > 5) ? this.dice.roll(0, 80) : 0,
                    items: (this.dice.roll(1, 6) > 5) ? new Array(this.items()[this.dice.roll(0, (this.items().length - 1))]): [],
                    damages: party.members.map((v, i, a) => {
                        return [v.id, this.dice.roll(0, 80)]
                    })
                }
                return battle
            }
        }
    }

    /**
     * 冒険の結果を反映
     * @param id ゲームのID
     * @param party パーティー
     * @param dungeon 冒険したダンジョン種類
     * @param adventure 冒険状況
     */
    resultAdventure(id: string, party: GameParty, dungeon: Dungeon, adventure: GameAdventure): GameResult {
        let exp = 0
        let wins = 0
        let memberResults = party.members.map((v, i, a) => 
            v.hp
        )
        let items = new Array<GameItem>()
        adventure.battles.forEach((v, i, a) => {
            exp += v.exp
            if (v.exp) {
                wins += 1
            }
            v.damages.forEach((dv, di, da) => {
                const index = party.members.findIndex((mv, mi, ma) => 
                    mv.id === dv[0]
                )
                memberResults[index] -= dv[1]
            })
            items.concat(v.items)
        })

        let diedMembers = new Array<GameCharacter>()
        memberResults.forEach((v, i, a) => {
            if (v <= 0) {
                diedMembers.push(party.members[i])
            }
        })
        const remainedMembers = party.members.filter((v, i, a) => {
            return (diedMembers.indexOf(v) == -1)
        })
        party.members = remainedMembers

        party.exp += exp
        let levelUpMembers = new Array<GameCharacter>()
        if (exp >= 100) {
            party.exp += 0
            party.level += 1

            const count = this.dice.roll(1, (party.members.length * 2))
            const parameters = [
                Parameter.Hp,
                Parameter.Mp,
                Parameter.PhysicalAattack,
                Parameter.PhysicalGuard,
                Parameter.MagicalAttack,
                Parameter.MagicalGuard,
            ]
            for (let i = 0; i < count; i++) {
                const index = this.dice.roll(0, (party.members.length - 1))
                const parameter = parameters[this.dice.roll(0, (parameters.length - 1))]
                const value = this.dice.roll(1, 5)

                switch (parameter) {
                    case Parameter.Hp:
                        party.members[index].hp += value
                        break
                    case Parameter.Mp:
                        party.members[index].mp += value
                        break
                    case Parameter.PhysicalAattack:
                        party.members[index].physicalAattack += value
                        break
                    case Parameter.PhysicalGuard:
                        party.members[index].physicalGuard += value
                        break
                    case Parameter.MagicalAttack:
                        party.members[index].magicalAattack += value
                        break
                    case Parameter.MagicalGuard:
                        party.members[index].magicalGuard += value
                        break
                }

                levelUpMembers = levelUpMembers.filter((v, i, a) =>
                    v.id !== party.members[index].id
                )
                levelUpMembers.push(party.members[index])
            }
        }

        const result: GameResult = {
            id: id,
            createdAt: new Date(),
            party: party,
            dungeon: dungeon,
            wins: wins,
            exp: exp,
            items: items,
            levelUpMembers: levelUpMembers,
            diedMembers: diedMembers
        }
        return result
    }
}