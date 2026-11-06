"use strict";

// 微信云函数调试器固定加载函数根目录的 index.js。
// 真实业务代码由 TypeScript 编译到 dist/，这里仅负责转发云函数 main 导出。
module.exports = require("./dist/index");
