"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
class Database {
    constructor(_db) {
        this._db = _db;
    }
    /*** 获取集合*/
    async collection() {
        const { COLLECTION_NAME, _db, _collection } = this;
        if (_collection)
            return _collection;
        try {
            // 尝试读取一条数据，开销最小
            await _db.collection(COLLECTION_NAME).limit(1).get();
            this._collection = _db.collection(COLLECTION_NAME);
        }
        catch (err) {
            // 云开发中集合不存在时，错误信息通常包含 -502005 或特定提示
            // 更稳妥的做法是判断 err.errCode 或 err.errMsg 中是否包含集合不存在的特征
            if (err.errCode === -502005 || (err.errMsg && err.errMsg.includes('collection not exists'))) {
                await _db.createCollection(COLLECTION_NAME);
                this._collection = _db.collection(COLLECTION_NAME);
            }
            // 其他错误（如网络问题、权限问题）应抛出，避免误判
            throw err;
        }
        finally {
            return this._collection;
        }
    }
    /**增 */
    async add(data) {
        const collection = await this.collection();
        return collection.add({ data: data });
    }
    /**删 */
    async del(query) {
        const collection = await this.collection();
        return collection.where(query).remove();
    }
    /**改 */
    async set(query, data) {
        const collection = await this.collection();
        return collection.where(query).update({ data: data });
    }
    /**查 */
    async get(query) {
        const collection = await this.collection();
        return collection.where(query).get();
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map