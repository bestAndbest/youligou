// pages/category/goodsDatail/goodsDatail.js
import { getData } from '../../../service/data.js'
Page({

  data: {
    tabs:[
      {
       id:0,
       value:'综合',
       isSelect:true
      },
      {
        id: 1,
        value: '销量',
        isSelect: false
      },
      {
        id: 2,
        value: '价格',
        isSelect: false
      },
    ],
    goods:[],
    isNone:false,
    isShowBack:false
  },
  //参数封装
  QueryParams: {
    query: '',
    cid: 5,
    pagenum: 1,
    pagesize:10
  },
  //数据数
  total:0,
  onLoad(options){
    this.getSynthesisData(options);
  },

  //监听下拉刷新
  onPullDownRefresh(options){
    console.log(options)
    this.setData({ goods: [],isNone:false});
    this.QueryParams.pagenum=1;
    this.getSynthesisData();
  },


  onPageScroll(options) {
    //获取当前窗口的高度
    var h = wx.getSystemInfoSync().windowHeight;
    let top = options.scrollTop;
    let {isShowBack}=this.data;
    if (!isShowBack && top >= h) {
      console.log(8889)
      this.setData({ isShowBack: true });
    }
    if (options.scrollTop <= h && isShowBack) {
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

  //监听滚动条到底部事件
  onReachBottom(){
      console.log(9999);
      this.getSynthesisData();
  },

  //点击tab事件
  handleChangeSel(event){
    console.log('tab被点击', event.detail.index)
    let index = event.detail.index;
    let {tabs}=this.data;
    tabs.forEach((item, i) => i === index ? item.isSelect = true : item.isSelect =false);
    this.setData({
      tabs
    })
  },
  //获取商品数据
  getSynthesisData(options){
    if (options){
      this.QueryParams.cid = options.cid;
    }
    if (this.QueryParams.pagenum <= (this.total / this.QueryParams.pagesize+1)){
      
      getData({ url: '/goods/search', data: this.QueryParams }).then((res) => {
       
        //数据请求回来关闭下拉刷新
        wx.stopPullDownRefresh();
        let goods = [...this.data.goods, ...res.goods];
        this.total = res.total;
        this.setData({
          goods
        })
       
       //请求页数增加
        this.QueryParams.pagenum++;
        console.log(res);
      })
    }else{
      //开启没有数据的dom提示
      this.setData({ isNone: true });
    }
  }
})