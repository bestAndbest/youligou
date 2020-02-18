// pages/category/category.js
import { getData } from '../../service/data.js'
Page({

  data: {
    //左边菜单
    leftMenuList:[],
    //右边内容
    rightContent:[],
    //分类
    categories:[],
    //菜单索引
    currentIndex:0,
    //设置滚动条距离顶部的距离
    scrollTop:0
  },
    onLoad(){
      this.getCategoriesData({ url: '/categories'})  
    },
//点击左边菜单事件
  handleToContent(event){
    let {index} = event.currentTarget.dataset;
    let rightContent = this.data.categories[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop: 0
    })
  },
 
  //获取分类数据
  getCategoriesData(url) {
    let categories = wx.getStorageSync({ url: 'categories'});
    if (categories && categories.length>0){
      this.setCategoriesData(categories);
      console.log('有categories了');
    }else{
      getData(url).then((res) => {
        console.log('categories', res)
        categories = res;
        this.setCategoriesData(categories);
        wx.setStorageSync('categories', categories);
      })
    }
    
  },
  //设置数据
  setCategoriesData(categories){
    let leftMenuList = categories.map((item) => item.cat_name)
    let rightContent = categories[0].children;
    this.setData({
      leftMenuList,
      rightContent,
      categories
    })
  }
})