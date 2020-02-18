// pages/search/search.js
import { getData } from '../../service/data.js';
import regeneratorRuntime from "../../assets/asyncawait/runtime";
Page({

  data: {
    //搜索结果
      searchData:[],
      //隐藏取消按钮
      isHiddenCancel:true,
      //输入框的值
       inpVal:""
  },
  timeout:-1,

  handleInput(e){
    let value = e.detail.value;

    if(!value.trim()){
    //不合法输入，退出，不往下执行
      return;
    }
    //值合法，消失取消按钮
    this.setData({ isHiddenCancel:false});
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    //防抖——》避免多余的网络请求
    this.timeout = setTimeout(() => {
      this.qsearch(e.detail.value)
    }, 500)
  },
  //点击取消按钮
  handleCancel(){
    this.setData({ isHiddenCancel: true, searchData: [], inpVal:"" });
  },
  //搜索数据
  async qsearch(query){
    let searchData = await getData({ url: '/goods/qsearch', data: { query}});
    this.setData({ searchData});
  }
  
})