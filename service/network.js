
//标记请求
let ajaxnum=0;
import{baseUrl} from './configure.js'
export default function(options){
  return new Promise((resolve,reject)=>{
    // console.log('options.query',options.query)
    let query = options.data? options.data.query:"";
    if (!query){
      //开启loading
      wx.showLoading({
        title: '加载中',
        mask: true
      });
    }
    ajaxnum++;
    wx.request({
      url: baseUrl+options.url,
      method: options.method || 'get',
      data: options.data || {},
      success: (res)=>resolve(res.data.message),
      fail: reject,
      complete:()=>{
        ajaxnum--;
        if (ajaxnum===0){
         //关闭loading
          wx.hideLoading();
        }
      }
    })
  })
}