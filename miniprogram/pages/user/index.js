const {
  cloudSetUser,
  cloudGetUser,
  cloudAddUser,
} = require("../../utils/cloud");
const {
  fileAddAvatar,
  fileDelAvatar,
} = require("../../utils/file");
/**头像存储路径 */
const PATH_Avatar = "avatars"
const NULL_OBJECT = Object.create(null);
Page({
  data: {
    userInfo: NULL_OBJECT,
    showTip: false,
    operates: [{
      type: 'a',
      title: 'A'
    }, {
      type: 'b',
      title: 'B'
    }, {
      type: 'c',
      title: 'C'
    }],
    haveCreateCollection: false,
    title: "",
    content: "",
  },

  onLoad: function () {
    this.checkUserRegistration();
  },

  onReady: function () {},

  // 用户主动选择头像后先上传到云存储，再用持久化 fileID 更新个人资料。
  onChooseAvatar: function (event) {
    const {
      avatarUrl: localAvatarPath
    } = event.detail, {
      openid,
      avatarUrl
    } = this.data.userInfo;
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        avatarUrl: localAvatarPath
      }
    })
    const fileExtension = localAvatarPath.split(".").pop() || "png";
    const cloudPath = `${openid}/${PATH_Avatar}/${Date.now()}.${fileExtension}`;
    fileAddAvatar(cloudPath, localAvatarPath)
      .then((response) => {
        this.updateUserInfo({
          avatarUrl: response.fileID
        });
        if (avatarUrl) {
          fileDelAvatar(avatarUrl);
        }
      })
      .catch((error) => {
        wx.showToast({
          title: "头像保存失败",
          icon: "none",
        });
      })
      .finally(() => {
        wx.hideLoading();
      });
  },

  // 用户完成昵称输入后更新 header，空昵称不覆盖已有昵称。
  onNicknameChange: function (event) {
    const nickName = event.detail.value.trim();
    if (nickName) {
      this.updateUserInfo({
        nickName
      });
    }
  },

  // 将用户主动选择的头像或昵称同步到云端，云函数会按当前调用者的 OpenID 更新记录。
  updateUserInfo: function (profile) {
    const userInfo = {
      ...this.data.userInfo,
      ...profile,
    };
    this.setData({
      userInfo,
    });
    cloudSetUser(profile)
      .catch((error) => {
        wx.showToast({
          title: "资料更新失败",
          icon: "none",
        });
      });
  },

  onClickPowerInfo(e) {

  },

  // 云开发初始化完成后，根据云端从调用上下文取得的 OpenID 检查用户是否已注册。
  checkUserRegistration: function () {
    return cloudGetUser()
      .then((response) => {
        const {
          openid
        } = response.result || {};
        this.setData({
          userInfo: response.result
        })
        if (!openid) {
          this.registrationUser();
        }
      })
      .catch((error) => {
        wx.showToast({
          title: "登录状态检查失败",
          icon: "none",
        });
      });
  },

  // 用户尚未注册时，征得确认后由云函数写入当前用户的 OpenID。
  registrationUser: function () {
    wx.showModal({
      title: "注册登录",
      content: "首次使用需要注册登录，以保存您的账单数据。",
      showCancel: false,
      confirmText: "注册登录",
      success: (result) => {
        if (result.confirm) {
          this.registerUser();
        }
      },
    });
  },

  // 调用云函数创建用户记录；OpenID 仅在云端调用上下文中获取。
  registerUser: function () {
    wx.showLoading({
      title: "登录中",
      mask: true,
    });
    cloudAddUser()
      .then((response) => {
        this.setData({
          userInfo: response.result
        })
        wx.showToast({
          title: "注册登录成功",
          icon: "success",
        });
      })
      .finally(() => {
        wx.hideLoading();
      });
  },

});