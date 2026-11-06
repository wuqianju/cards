Page({
  data: {
    cardCount: 0,
  },
  onAddCard() {
    wx.navigateTo({
      url: "/pages/cards/add/index",
    });
  },
});
