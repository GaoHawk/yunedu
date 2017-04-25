<template>
  <div class="page-swipe">
    <h1 class="page-title">Swipe</h1>
    <p class="page-swipe-desc">基础用法</p>
    <mt-swipe :auto="4000" style="height:260px;" :defaultIndex="1" v-if="preViewPic.length>1">
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

    <p class="page-swipe-desc">单个幻灯片</p>
    <mt-swipe :show-indicators="false" style="height:260px;" v-show="preViewPic.length==1">
      <mt-swipe-item class="slide1">
      <img :src="preViewPic[0]">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default{
     computed:{
        ...mapState({
            preViewPic: state => state.previewPic
        })
     },   
     data(){
        return {
           name:'Top'
        }
     }
    }
</script>

<style>
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