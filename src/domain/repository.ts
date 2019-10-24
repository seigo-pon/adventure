import SaveData from "./entity/savedata";
import GameResult from "./entity/gameresult";

/**
 * リポジトリ
 */
export default interface Repository {
    /**
     * セーブデータリスト取得
     */
    getSaveDataList(): Promise<Array<SaveData>>
    /**
     * セーブデータを保存
     * @param saveData セーブデータ
     */
    addSaveData(saveData: SaveData): Promise<boolean>
    /**
     * 冒険結果リストを取得
     * @param id セーブデータのID
     */
    getResultList(id: string): Promise<Array<GameResult>>
    /**
     * 冒険結果を保存
     * @param result 冒険結果
     */
    addResult(result: GameResult): Promise<boolean>
}