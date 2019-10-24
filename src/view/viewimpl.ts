import View from "./view";
import { Spinner } from "cli-spinner";
const {
    Confirm,
    Select
} = require("enquirer");
const asciify = require("asciify")
import { GameItem } from "../domain/entity/gameitem";
import SaveData from "../domain/entity/savedata";
import GameResult from "../domain/entity/gameresult";

export default class ViewImpl implements View {
    private async timeout(msec: number) {
        return new Promise(resolve => setTimeout(resolve, msec))
    }

    private setSpinner(message: string, spin: string): Spinner {
        const spinner = new Spinner(message + "%s")
        spinner.setSpinnerString(spin)
        spinner.start()
        return spinner
    }

    private stopSpinner(spinner: Spinner) {
        spinner.stop()
        console.log("")
    }

    private showAA(message: string): Promise<string> {
        return new Promise((resolve) => {
            asciify(
                message,
                { font: "starwars" },
                function (error: Error, res: string) {
                    resolve(error ? message : res)
                }
            )
        })
    }
    private async confirm(name: string, message: string): Promise<number> {
        try {
            return await new Confirm({
                name: name,
                message: message
            })
                .run()
        } catch (error) {
            return -1
        }
    }

    private async select(name: string, message: string, choices: Array<string>): Promise<string> {
        try {
            // ライブラリーの先で参照を書き換えてるようなのでコピーを使用する
            const choicesCopy = choices.slice()
            return await new Select({
                name: name,
                message: message,
                choices: choicesCopy
            })
                .run()
        } catch (error) {
            return ""
        }
    }

    async isQuitForce(): Promise<number> {
        console.log("")
        return this.confirm("detectquit", "ゲームを終了しますか？")
    }

    async quit() {
        const spinner = this.setSpinner("ゲームを終了します...", "|/-\\")
        await this.timeout(1000)
        this.stopSpinner(spinner)
        console.log("")

        const message = await this.showAA("The End.")
        console.log(message)
    }

    async startGame() {
        const message = await this.showAA("Adventure")
        console.log(message)
    }

    async loadSaveData(loadFunc: () => Promise<Array<SaveData>>): Promise<Array<SaveData>> {
        const spinner = this.setSpinner("セーブデータをロード中...", "|/-\\")
        await this.timeout(1000)

        const saveDataList = await loadFunc()

        this.stopSpinner(spinner)
        return saveDataList
    }

    async startNewGame(date: string) {
        console.log("セーブデータはありませんでした")
        console.log("")
        console.log("新規にゲームを開始します: " + date)

        const spinner = this.setSpinner("パーティーを作成中...", "|/-\\")
        await this.timeout(1000)
        this.stopSpinner(spinner)

        console.log("一人目のメンバーを決めて下さい")
        await this.timeout(1000)
    }

    async isLoadSaveData(): Promise<number> {
        console.log("セーブデータがありました")
        return this.confirm("selectnewdata", "セーブデータを再開しますか？")
    }

    async selectSaveData(saveDataDates: Array<string>): Promise<string> {
        return this.select("selectsavedata", "どのデータを再開しますか？", saveDataDates)
    }

    async loadResults(loadFunc: () => Promise<Array<GameResult>>): Promise<Array<GameResult>> {
        const spinner = this.setSpinner("冒険の記録をロード中...", "|/-\\")
        await this.timeout(1000)

        const resultList = await loadFunc()

        this.stopSpinner(spinner)
        return resultList
    }

    async selectedSaveData(date: string, adventureCount: number, level: number, exp: number, memberSummaries: Array<string>) {
        console.log(date + " のデータを再開しました")
        console.log((adventureCount + 1) + "回の冒険 " + (level + 1) + "レベル 経験値" + exp + "P")
        if (memberSummaries.length > 0) {
            console.log("===")
            memberSummaries.forEach((v, i, a) =>
                console.log("- " + v)
            )
            console.log("===")
            console.log("...がいます")
        } else {
            console.log("メンバーはいません")
        }
        await this.timeout(1000)
    }

    async isCreateNewMember(now: number, max: number): Promise<number> {
        console.log("")
        console.log("まだメンバーを追加できます: " + now + "/" + max + "人")
        return this.confirm("createmember", "メンバーを追加しますか？")
    }

    addedMaxMember(now: number, max: number) {
        console.log("")
        console.log("メンバーが満員です: " + now + "/" + max + "人")
    }

    async detectedPartyMember(adventureCount: number, memberSummaries: Array<string>) {
        console.log("")
        console.log((adventureCount + 1) + "回目の冒険を開始します")
        console.log("===")
        memberSummaries.forEach((v, i, a) =>
            console.log("- " + v)
        )
        console.log("===")
        await this.timeout(1000)
        console.log("")
    }

    async isRemoveMember(): Promise<number> {
        console.log("")
        return this.confirm("removemember", "メンバーを解雇しますか？")
    }

    async selectRemoveMember(memberSummaries: Array<string>): Promise<string> {
        return this.select("selectremovemember", "どのメンバーですか？", memberSummaries)
    }

    async isActuallyRemoveMember(memberSummary: string): Promise<number> {
        return this.confirm("actuallyremovemember", "本当に " + memberSummary + " を解雇しますか？")
    }

    async selectJob(jobNames: Array<string>): Promise<string> {
        return this.select("selectjob", "どの職業にしますか？", jobNames)
    }

    async createdNewMember(memberSummary: string, memberParameter: string, memberAbility: string) {
        const spinner = this.setSpinner("メンバーを募集中...", " | /-\\")
        await this.timeout(1000)
        this.stopSpinner(spinner)

        console.log("===")
        console.log("- " + memberSummary)
        console.log("- " + memberParameter)
        console.log("- " + memberAbility)
        console.log("===")
        console.log("...が参加しました")
        await this.timeout(1000)
    }

    async selectDungeon(dungeonTypes: Array<string>): Promise<string> {
        return this.select("selectdungeon", "どのダンジョンで冒険しますか？", dungeonTypes)
    }

    async adventureDungeon(dungeonType: string) {
        const spinner = this.setSpinner("冒険の準備中...", " | /-\\")
        await this.timeout(1000)
        this.stopSpinner(spinner)

        console.log(dungeonType + "に出発")
        console.log("===")
        await this.timeout(1000)
    }

    async startBattle(count: number) {
        const spinner = this.setSpinner(count + "回目の戦闘中...", " | /-\\")
        await this.timeout(1000)
        this.stopSpinner(spinner)
    }

    async endBattle() {
        console.log("===")
        console.log("冒険から帰還しました")
        await this.timeout(1000)
        console.log("")
    }

    async resultAdventure(count: number, wins: number, exp: number, items: Array<GameItem>, levelUpMembers: Array<string>, diedMembers: Array<string>) {
        const spinner = this.setSpinner("冒険の記録を確認中...", " | /-\\")
        await this.timeout(1000)
        this.stopSpinner(spinner)

        console.log("===")
        console.log(count + "回の戦闘中" + wins + "回の勝利")
        console.log("獲得した経験値は " + exp + "P")
        if (items.length > 0) {
            items.forEach((v, i, a) =>
                console.log("- " + v)
            )
            console.log("...のアイテムを獲得")
        }
        if (levelUpMembers.length > 0) {
            levelUpMembers.forEach((v, i, a) =>
                console.log("- " + v)
            )
            console.log("...がレベルアップ")
        }
        if (diedMembers.length > 0) {
            diedMembers.forEach((v, i, a) =>
                console.log("- " + v)
            )
            console.log("...がパーティーを離脱")
        } else {
            console.log("メンバーは全員無事でした")
        }
        console.log("===")
        await this.timeout(1000)
        console.log("")
    }

    async finishAdventure() {
        console.log("パーティーは全滅しました...")
        await this.timeout(1000)
    }

    async isSaveGame(): Promise<number> {
        return this.confirm("issavegame", "ここまでの冒険をセーブしますか？")
    }

    async isQuit(): Promise<number> {
        console.log("")
        return this.confirm("selectquit", "ゲームを終了しますか？")
    }

    async startNextGame(adventureCount: number, level: number, exp: number, memberSummaries: Array<string>) {
        console.log("")
        console.log("次の冒険を始めます")
        console.log((adventureCount + 1) + "回の冒険 レベル" + (level + 1) + " 経験値" + exp + "P")
        console.log("===")
        memberSummaries.forEach((v, i, a) =>
            console.log("- " + v)
        )
        console.log("===")
        console.log("...がいます")
        await this.timeout(1000)
        console.log("")
    }
}