<template>
  <div class="page-swipe custom-picSwipe">
   <child style="position:absolute;top:3px;width:97%;"></child>
    <mt-swipe :auto="4000" style="height:320px;" :defaultIndex="1" v-if="preViewPic.length>1">
      <mt-swipe-item v-for="(item,index) in preViewPic" :class="'slide'+index">
         <img :src="item">
      </mt-swipe-item>

    </mt-swipe>

   <!--
    <p class="page-swipe-desc">隐藏 indicators</p>
    <mt-swipe :show-indicators="false">
      <mt-swipe-item class="slide1">1</mt-swipe-item>
      <mt-swipe-item class="slide2">2</mt-swipe-item>
      <mt-swipe-item class="slide3">3</mt-swipe-item>
    </mt-swipe>
    <p class="page-swipe-desc">取消自动播放</p>
    <mt-swipe :auto="0">
      <mt-swipe-item class="slide1">1</mt-swipe-item>
      <mt-swipe-item class="slide2">2</mt-swipe-item>
      <mt-swipe-item class="slide3">3</mt-swipe-item>
    </mt-swipe>
    <p class="page-swipe-desc">设置默认显示页</p>
    <mt-swipe :auto="0" :defaultIndex="1">
      <mt-swipe-item class="slide1">1</mt-swipe-item>
      <mt-swipe-item class="slide2">2</mt-swipe-item>
      <mt-swipe-item class="slide3">3</mt-swipe-item>
    </mt-swipe>
    -->

    <mt-swipe :show-indicators="false" style="height:320px;" v-show="preViewPic.length==1">
      <mt-swipe-item class="slide1">
      <img :src="preViewPic[0]">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
    import { mapState } from 'vuex'
    import Header from './header.vue'
    export default{
     computed:{
        ...mapState({
            preViewPic: state => state.previewPic
        })
     },   
     components:{ 
        'child': Header
     },
     data(){
        return {
           name:'Top'
        }
     }
    }
</script>

<style>
  .custom-picSwipe{
    margin-top:50%;
    text-align:center;
  }

  @component-namespace page {
    @component swipe {
      @descendent desc {
        text-align: center;
        color: #666;
        margin-bottom: 5px;
      }
      .mint-swipe {
        height: 200px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
      }

      .mint-swipe-item {
        line-height: 200px;
      }

      .slide1 {
        background-color: yellow;
        color: #fff;
      }

      .slide2 {
        background-color: #ffd705;
        color: #000;
      }

      .slide3 {
        background-color: #ff2d4b;
        color: #fff;
      }
    }
  }
</style>