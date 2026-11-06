/**!
 * @file 文件相关
 */


/**增加文件
 * @param {string} cloudPath 云存储路径
 * @param {string} filePath 文件路径
 */
const fileAddAvatar = (cloudPath, filePath) => {
  return wx.cloud
    .uploadFile({
      cloudPath,
      filePath,
    })
};

/**删除文件
 * @param {string} cloudPath 云存储路径
 */
const fileDelAvatar = (cloudPath) => {
  return wx.cloud.deleteFile({
    fileList: [cloudPath],
  })
};


module.exports = {
  fileAddAvatar,
  fileDelAvatar
};