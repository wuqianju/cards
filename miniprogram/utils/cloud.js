//云函数环境id
const cloudId = "cloud1-d3gbhzd1lc6ae4b40";
// 云函数名称
const FUNCTION_NAME = "cardbillFunctions";

/**初始化云函数 */
const cloudInit = () => {
  if (!wx.cloud) {
    return Promise.reject(new Error("请使用 2.2.3 或以上的基础库以使用云能力"));
  } else {
    return wx.cloud.init({
      env: cloudId,
      traceUser: true,
    }).catch((error) => {
      console.error("云函数调用失败", error);
      return Promise.reject(error);
    })
  }
}

// 调用 CardBill 云函数；type 必须为云函数入口已注册的操作类型，data 为操作所需业务参数。
const callCardbillFunction = (type, data = {}) => {
  return wx.cloud
    .callFunction({
      name: FUNCTION_NAME,
      data: {
        type,
        data,
      },
    });
};

// 查询当前调用用户是否已在 user 集合注册。
const cloudGetUser = () => callCardbillFunction("getUser");

// 为当前调用用户创建 user 集合记录。
const cloudAddUser = () => callCardbillFunction("addUser");

// 更新当前调用用户的头像或昵称；profile 仅允许 avatarUrl 和 nickName 字段。
const cloudSetUser = (profile) => callCardbillFunction("setUser", profile);

module.exports = {
  cloudInit,
  cloudGetUser,
  cloudAddUser,
  cloudSetUser,
};