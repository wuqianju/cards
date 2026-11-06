const REQUIRED_FIELDS = [
  "bankName",
  "creditLimit",
  "annualPointsLimit",
  "monthlyPointsLimit",
];

Page({
  data: {
    form: {
      bankName: "",
      creditLimit: "",
      annualPointsLimit: "",
      monthlyPointsLimit: "",
      remark: "",
    },
  },

  onFieldInput(event) {
    const { field } = event.currentTarget.dataset;
    this.setData({
      [`form.${field}`]: event.detail.value,
    });
  },

  onSubmit() {
    const { form } = this.data;
    const isComplete = REQUIRED_FIELDS.every((field) => form[field].trim());

    if (!isComplete) {
      wx.showToast({
        title: "请完成必填信息",
        icon: "none",
      });
      return;
    }

    wx.showToast({
      title: "卡片信息已填写",
      icon: "success",
    });
  },
});
