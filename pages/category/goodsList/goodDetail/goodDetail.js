// pages/category/goodsList/goodDetail/goodDetail.js
import { getData } from '../../../../service/data.js';
Page({

  data: {
      goodsObj:{},
    isShowBack: false
  },
  goodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id);
  },
  //滚动条事件
  onPageScroll(options) {
    //获取当前窗口的高度
    var h = wx.getSystemInfoSync().windowHeight;
    // console.log(options)
    let { isShowBack } = this.data;
    if (!isShowBack && options.scrollTop >=h) {
      this.setData({ isShowBack: true });
    }
    if (options.scrollTop <= h && isShowBack){
      this.setData({ isShowBack: false });
    }
  },

  handleToTop() {
    // console.log(e)
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 1500
    })
  },
  //点击轮播图片预览
  handlePrevewImage(event){
    let urls = this.data.goodsObj.pics.map((item => item.pics_mid));
    let current = event.detail.pics_mid;
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  //获取商品详情数据
  getGoodsDetail(id){
    getData({ url:'/goods/detail',data:{goods_id:id}}).then(res=>{
      this.goodsInfo = res;
      this.setData({
        goodsObj:{
          pics: res.pics,
          goods_name: res.goods_name,
          goods_price:res.goods_price,
          goods_introduce: res.goods_introduce
        }
        });
    })
  },
  //加入购物车
  handleCartAdd(){
    let userInfo=wx.getStorageSync('userInfo')||{};
   
    if (!userInfo.nickName){
      wx.showToast({
        title: '请先登录！',
        duration:1500
      })
      console.log('3333')
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return;
    }
    //获取缓存中的购物车数据（如果一开时没有数据得到的是空字符看，因此需要加上 ||[]
    let cart=wx.getStorageSync('cart')||[];
    //通过findIndex来查找当前要加入的商品是否已存在购物车
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id);
    if(index===-1){
      //如果不存在则，设置数量为1，并保存到缓存
      this.goodsInfo.num=1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo)
    }else{
      //如果存在，则通过下标找到它的位置，进行数量加1
      cart[index].num++;
    }
    //通过调用系统的wx.setStorageSync保存到购物车缓存
    wx.setStorageSync('cart', cart);
    //告诉用户添加成功
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 1200,
      mask:true
    })
  }
 
})