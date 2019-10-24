import SaveData from "../domain/entity/savedata";
import GameResult from "domain/entity/gameresult";

/**
 * ビュー
 */
export default interface View {
    /**
     * 終了するかどうか
     */
    isQuitForce(): Promise<number>
    /**
     * 終了
     */
    quit(): void
    /**
     * ゲームスタート
     */
    startGame(): void
    /**
     * セーブデータローディング
     * @param loadFunc ローディング関数
     */
    loadSaveData(loadFunc: () => Promise<Array<SaveData>>): Promise<Array<SaveData>>
    /**
     * ゲーム開始
     * @param date 開始日時
     */
    startNewGame(date: string): void
    /**
     * ロードするか
     */
    isLoadSaveData(): Promise<number>
    /**
     * セーブデータ選択
     * @param saveDataDates セーブデータ日付リスト
     */
    selectSaveData(saveDataDates: Array<string>): Promise<string>
    /**
     * 冒険記録ローディング
     * @param loadFunc ローディング関数
     */
    loadResults(loadFunc: () => Promise<Array<GameResult>>): Promise<Array<GameResult>>
    /**
     * セーブデータ確定
     * @param date セーブデータ日付
     * @param adventureCount 冒険回数
     * @param level レベル
     * @param exp 経験値
     * @param memberSummaries メンバー情報リスト
     */
    selectedSaveData(date: string, adventureCount: number, level: number, exp: number, memberSummaries: Array<string>): void
    /**
     * 新メンバー追加確認
     * @param now 現在の人数
     * @param max 最大人数
     */
    isCreateNewMember(now: number, max: number): Promise<number>
    /**
     * メンバー満員
     * @param now 現在の人数
     * @param max 最大人数
     */
    addedMaxMember(now: number, max: number): void
    /**
     * パーティーメンバー確定
     * @param adventureCount 冒険回数
     * @param memberSummaries メンバー情報リスト
     */
    detectedPartyMember(adventureCount: number, memberSummaries: Array<string>): void
    /**
     * メンバー削除確認
     */
    isRemoveMember(): Promise<number>
    /**
     * メンバー削除選択
     * @param memberSummaries メンバー情報リスト
     */
    selectRemoveMember(memberSummaries: Array<string>): Promise<string>
    /**
     * メンバー削除最終確認
     * @param memberSummary メンバー情報
     */
    isActuallyRemoveMember(memberSummary: string): Promise<number>
    /**
     * 職業選択
     * @param jobNames 職業リスト
     */
    selectJob(jobNames: Array<string>): Promise<string>
    /**
     * メンバー作成完了
     * @param memberSummary メンバー情報
     * @param memberParameter メンバー情報
     * @param memberAbility メンバー情報
     */
    createdNewMember(memberSummary: string, memberParameter: string, memberAbility: string): void
    /**
     * ダンジョン選択
     * @param dungeonTypes ダンジョン種類リスト
     */
    selectDungeon(dungeonTypes: Array<string>): Promise<string>
    /**
     * 冒険開始
     * @param dungeonType ダンジョン種類
     */
    adventureDungeon(dungeonType: string): void
    /**
     * 戦闘開始
     * @param count 戦闘回数
     */
    startBattle(count: number): void
    /**
     * 戦闘終了
     */
    endBattle(): void
    /**
     * 冒険結果
     * @param count 戦闘回数
     * @param wins 勝利数
     * @param exp 経験値
     * @param items ドロップアイテムリスト
     * @param levelUpMembers レベルアップメンバーリスト
     * @param diedMembers 死亡メンバーリスト
     */
    resultAdventure(count: number, wins: number, exp: number, items: Array<string>, levelUpMembers: Array<string>, diedMembers: Array<string>): void
    /**
     * ゲーム継続不可
     */
    finishAdventure(): void
    /**
     * セーブするか
     */
    isSaveGame(): Promise<number>
    /**
     * 終了するか
     */
    isQuit(): Promise<number>
    /**
     * 次のゲーム開始
     * @param adventureCount 冒険回数
     * @param level レベル
     * @param exp 経験値
     * @param memberSummaries メンバー情報リスト
     */
    startNextGame(adventureCount: number, level: number, exp: number, memberSummaries: Array<string>): void
}