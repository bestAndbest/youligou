// pages/cart/pay/pay.js
import { showToast } from '../../../service/location.js';
import regeneratorRuntime from "../../../assets/asyncawait/runtime";
Page({

  data: {
    // 购物车数据
    cartData: [],
    //收货地址
    userAddress:{},
    // 总价
    totalprice: 0,
    // 选中商品数量
    selNum: 0,
  },

  onShow() {
    let userAddress = wx.getStorageSync('userAddress') || {};
    let tempDate = wx.getStorageSync('cart') || [];
    let cartData = tempDate.filter((item)=>item.checked);
    this.seltotal_num_price(cartData);
    this.setData({ cartData,userAddress });
  },
  //———————————————————————————————————————————计算选中总数和总价
  async handlerToBuy(){
    await showToast({ title: '{{刘敏同学}} 正在等待邀请，拥有企业帐号才能开发支付功能哈 😀', duration:3000});
    wx.navigateTo({
      url: '',
     
    })
  },
  //———————————————————————————————————————————计算选中总数和总价
  seltotal_num_price(cartData) {

    let selNum = 0, totalprice = 0;
    cartData.forEach((item) => {
      selNum = selNum + item.num;
      totalprice = totalprice + item.goods_price * item.num;
    })
    
    //重新设置数据进行更新
    this.setData({
      selNum,
      totalprice
    });
  },
  
})