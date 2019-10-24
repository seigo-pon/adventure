import * as DataStore from 'nedb';
import Repository from '../domain/repository'
import SaveData from '../domain/entity/savedata';
import GameResult from 'domain/entity/gameresult';
import { DataMapper } from './datamapper';

export default class RepositoryImpl implements Repository {
    private savedataDb: DataStore
    private resultDb: DataStore

    constructor() {
        this.savedataDb = new DataStore({
            filename: ".game/savedata.db",
            autoload: true
        })
        this.resultDb = new DataStore({
            filename: ".game/result.db",
            autoload: true
        })
    }

    getSaveDataList(): Promise<Array<SaveData>> {
        return new Promise(resolve => {
            // 更新日付でソート
            this.savedataDb.find({})
                .sort({ savedAt: -1 })
                .exec((err, docs) => {
                    if (err) {
                        resolve([])
                    } else {
                        const saveDataList = docs.map((v, i, a) =>
                            DataMapper.saveData(v)
                        )
                        resolve(saveDataList)
                    }
                })
        })
    }

    addSaveData(saveData: SaveData): Promise<boolean> {
        return new Promise(resolve => {
            this.savedataDb.update(
                { id: saveData.id },
                DataMapper.saveDataJson(saveData),
                { upsert: true },
                (err, docs) => {
                    resolve(!err)
                }
            )
        })
    }

    getResultList(id: string): Promise<Array<GameResult>> {
        return new Promise(resolve => {
            // 更新日付でソート
            this.resultDb.find({ id: id })
                .sort({ savedAt: -1 })
                .exec((err, docs) => {
                    if (err) {
                        resolve([])
                    } else {
                        const resultList = docs.map((v, i, a) =>
                            DataMapper.result(v)
                        )
                        resolve(resultList)
                    }
                })
        })
    }

    addResult(result: GameResult): Promise<boolean> {
        return new Promise(resolve => {
            this.resultDb.update(
                { id: result.id },
                DataMapper.resultJson(result),
                { upsert: true },
                (err, docs) => {
                    resolve(!err)
                }
            )
        })
    }
}