// app.js
const {
  cloudInit,
} = require("./utils/cloud");

App({
  globalData: {
    env: "cloud1-d3gbhzd1lc6ae4b40",
  },

  onLaunch: function () {
    cloudInit();
  },
});