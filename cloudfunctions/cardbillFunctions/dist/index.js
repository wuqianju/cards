"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const cloud = require("wx-server-sdk");
// 不使用 `import { type ... }`：微信开发者工具内置的旧版 TypeScript
// 解析器会把 type 当作普通导出成员。UserProfile 仅用于类型位置，编译后会被移除。
const user_1 = require("./user");
cloud.init({
    // SDK 的运行时支持 Symbol 类型的 DYNAMIC_CURRENT_ENV，但其旧版声明未包含该类型。
    env: "cloud1-d3gbhzd1lc6ae4b40",
});
const db = cloud.database();
const user = new user_1.UserService(cloud, db);
const getOpenId = () => {
    const wxContext = cloud.getWXContext();
    return {
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    };
};
const getMiniProgramCode = async () => {
    const { buffer } = await cloud.openapi.wxacode.get({
        path: "pages/index/index",
    });
    const upload = await cloud.uploadFile({
        cloudPath: "code.png",
        fileContent: buffer,
    });
    return upload.fileID;
};
const main = async (event) => {
    switch (event.type) {
        case "getOpenId":
            return getOpenId();
        case "addUser":
            return user.addUser();
        case "getUser":
            return user.getUser();
        case "setUser":
            return user.setUser(event.data);
        default:
            return { success: false, errMsg: "不支持的云函数操作类型" };
    }
};
exports.main = main;
//# sourceMappingURL=index.js.map