//查看权限
export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
     wx.getSetting({
       success: (res) => resolve(res),
       fail: (err) => reject(err)
     })
  })
};
//选择地址
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
};
//打开设置
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
};
export const showToast = (obj) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: obj.title,
      icon: obj.icon|| 'none',
      duration: obj.duration|| 1200,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
};
