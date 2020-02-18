// pages/home/home.js
import { getData }from '../../service/data.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取轮播数据
    banner:[],
    //获取导航数据
    recommend:[],
    //获取层级数据
    floorList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取轮播图数组
    this.getSwiperData({ url: "/home/swiperdata"});
     //获取导航数组
    this.getCatitemsData({ url: "/home/catitems"})
   //获取层级数组
    this.getFloorData({ url: '/home/floordata'})
    
  },
   //获取轮播图数组
  getSwiperData(url){
    getData(url).then((res) => {
      console.log('swiper', res)
      let banner = res;
      this.setData({
        banner
      })
    })
  },
  //获取导航数据
  getCatitemsData(url){
    getData(url).then((res) => {
      console.log('recommend', res)
      let recommend = res;
      this.setData({
        recommend
      })
    })
  },
  //获取层级数据
  getFloorData(url) {
    getData(url).then((res) => {
      console.log('floorList', res)
      let floorList = res;
      this.setData({
        floorList
      })
    })
  }
  
})