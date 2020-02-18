// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting, showToast} from '../../service/location.js'
import regeneratorRuntime from "../../assets/asyncawait/runtime";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 购物车数据
    cartData:[],
    // 用户地址
    userAddress:{},
    // 全选
    isAllSel:false,
    // 总价
    totalprice:0,
    // 选中商品数量
    selNum:0,
    isDel:false,
    manageComplete:'管理'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow(){
    let userAddress= wx.getStorageSync('userAddress')||{};
    let cartData = wx.getStorageSync('cart') || [];
    this.seltotal_num_price(cartData);
    this.setData({ cartData, userAddress});
  },
    //———————————————————————————————————————————点击结算
  async handlerToPay(){
    let { userAddress, selNum}=this.data;
    console.log(!userAddress.userName);
    if (selNum === 0) {
      await showToast({ title: '您还没有选购商品'});
      return;
    };
    if (!userAddress.userName){
      await showToast({ title: '您还没有选择收货地址'});
      return;
    };
    
    wx.navigateTo({
      url: '/pages/cart/pay/pay',
    })
  },
  //———————————————————————————————————————————点击管理
  handleManager(){
    let { isDel,cartData } = this.data;
    isDel=!isDel;
    let manageComplete= isDel?'完成':'管理';
    this.setData({ isDel, manageComplete})
    
  },
  // ———————————————————————————————————————————点击删除
  handleDelete(){
    let {cartData } = this.data;
    let tempData = cartData.filter((item)=>!item.checked);
    this.setData({ cartData: tempData, isDel: false, manageComplete:"管理"});
    this.seltotal_num_price(tempData);
    wx.setStorageSync('cart', tempData);
  },
//———————————————————————————————————————————点击加减号
  handleAddDecre(e){
    console.log(e.currentTarget.dataset)
    let { flag, id } = e.currentTarget.dataset;
    let {cartData}=this.data;
    let index=cartData.findIndex((item)=>item.goods_id===id);
    if(flag===-1){
      if (cartData[index].num > 1) {
        cartData[index].num += flag;
      }
    }else{
      cartData[index].num += flag;
    }
    this.setData({ cartData});
    this.seltotal_num_price(cartData);
    wx.setStorageSync('cart', cartData);
  },
//———————————————————————————————————————点击全选按钮
  handleChange(){
    let { cartData,isAllSel } = this.data;
    isAllSel = !isAllSel;
    cartData.forEach((item) => item.checked = isAllSel);
    this.setData({cartData });
    // console.log(cartData)
    this.seltotal_num_price(cartData);
    
    wx.setStorageSync('cart', cartData);
  },
  //——————————————————————————————————————————点击单选按钮
  handleItemChange(e){
    let id = e.currentTarget.dataset.id;
    let {cartData}=this.data;
    let index = cartData.findIndex((item) => item.goods_id===id);
    cartData[index].checked = !cartData[index].checked;
    this.seltotal_num_price(cartData);
    this.setData({ cartData });
    wx.setStorageSync('cart', cartData);
  },
   //———————————————————————————————————————————计算选中总数和总价
  seltotal_num_price(cartData){
   
    let selNum = 0, totalprice = 0;
    let isAllSel = true;
    cartData.forEach((item) => {
      if (item.checked) {
        selNum = selNum + item.num;
        totalprice = totalprice + item.goods_price * item.num;
      } else {
        isAllSel = false;
      }
    })
    //避免空数组，如果不等于0，则又单选决定
    isAllSel = cartData.length ? isAllSel : false;
    //重新设置数据进行更新
    this.setData({
      isAllSel,
      selNum,
      totalprice
    });
  },
  async handleAddLocation(){
    try{
      let res = await getSetting();
      console.log(res);
      let authority = res.authSetting["scope.address"];

      if (authority === false) {
        await openSetting();
      }
      let res2 = await chooseAddress();
      console.log('用户地址',res2);
      wx.setStorageSync("userAddress", res2);
      this.setData({ userAddress: res2});
    }catch(err){
      console.log(err);
    }
    
  }

})