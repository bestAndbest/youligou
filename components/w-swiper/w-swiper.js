// components/w-swiper/w-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banner:{
      type:Array,
      value:[]
    }
  },
  externalClasses: ['define','img'],

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePrevewImage(e){
      this.triggerEvent('PrevewImage',{pics_mid:e.currentTarget.dataset.pics_mid})
    }
  }
})
