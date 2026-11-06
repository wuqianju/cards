export interface UserProfile {
  /**用户小程序唯一id */
  openid: string;
  /**用户头像 */
  avatarUrl?: string;
  /**用户昵称 */
  nickName?: string;
}

export interface UserRecord extends UserProfile {
  openid: string;
}
