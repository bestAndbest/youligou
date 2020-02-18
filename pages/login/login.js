// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  hanleLogin(e) {
    console.log(e);
    let { userInfo } = e.detail;
    if (userInfo.nickName){
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1200,
        mask: true
      })
      wx.navigateBack({
        delta: 1,
      })
    }
    wx.setStorageSync('userInfo', userInfo);
  }
})