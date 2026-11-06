import * as cloud from "wx-server-sdk";

export type CloudSdk = typeof import("wx-server-sdk");
// wx-server-sdk 的旧版类型声明未包含 createCollection，但云函数运行时提供该 API。
export type CloudDatabase = ReturnType<CloudSdk["database"]> & {
  createCollection: (collectionName: string) => Promise<unknown>;
};

export type CloudCollection = ReturnType<CloudDatabase["collection"]>;
export type CloudDocumentData = Parameters<CloudCollection["add"]>[0]["data"];
export type CloudQueryCondition = Parameters<CloudCollection["where"]>[0];


export interface CloudQueryResult<T> {
  data: T[];
}

export interface DatabaseError {
  errCode?: number | string;
  errMsg?: string;
  message?: string;
}

export interface CloudServiceDependencies {
  cloud: typeof cloud;
  db: CloudDatabase;
}
