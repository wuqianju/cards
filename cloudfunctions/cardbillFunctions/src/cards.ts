import { Database } from "./database";
import {
  CloudDatabase,
  CloudQueryResult,
  CloudSdk,
  UserProfile,
  UserRecord,
} from "./types";

export class UserService extends Database {
  constructor(private cloud: CloudSdk, db: CloudDatabase) {
    super(db);
    const context = cloud.getWXContext();
    this.openid = context.OPENID!;
  }

  COLLECTION_NAME = "user";
  private openid: string;
  NULL_USER: UserRecord = { openid: "", nickName: "", avatarUrl: "" };

  public async getUser(): Promise<UserRecord> {
    const collection = await this.collection();
    const openid = this.openid;
    const res: any = await collection.where({ openid }).limit(1).get();
    const user = res.data[0] || this.NULL_USER;
    return user;
  }

  public async addUser() {
    const collection = await this.collection();
    const openid = this.openid;
    return collection.add({ data: { openid } });
  }

  public async setUser(user: UserProfile) {
    const collection = await this.collection();
    return collection.where({ openid: this.openid }).update({ data: user });
  }
}