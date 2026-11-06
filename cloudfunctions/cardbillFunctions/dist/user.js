"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("./database");
class UserService extends database_1.Database {
    constructor(cloud, db) {
        super(db);
        this.cloud = cloud;
        this.COLLECTION_NAME = "user";
        this.NULL_USER = { openid: "", nickName: "", avatarUrl: "" };
        const context = cloud.getWXContext();
        this.openid = context.OPENID;
    }
    async getUser() {
        const collection = await this.collection();
        const openid = this.openid;
        const res = await collection.where({ openid }).limit(1).get();
        const user = res.data[0] || this.NULL_USER;
        return user;
    }
    async addUser() {
        const collection = await this.collection();
        const openid = this.openid;
        return collection.add({ data: { openid } });
    }
    async setUser(user) {
        const collection = await this.collection();
        return collection.where({ openid: this.openid }).update({ data: user });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.js.map