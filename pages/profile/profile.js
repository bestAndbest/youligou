// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{}
  },

  
  onShow: function (options) {
    let userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({ userInfo });
  },

  
})