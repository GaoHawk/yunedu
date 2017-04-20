<template>
<div class="template">
  <child></child>
  <div class="custom-homework-content">
    <div class="custom-wrap">
    <label class="custom-label">{{dataJson.course}}作业 </label>
    <p class="custom-content">{{dataJson.content}} </p>
    <img :src="dataJson.images | filterImg" style="transform:scale(0.6,0.6);margin-bottom:32px;">
    <div style="position:absolute;top:80%;left:39%;">
    <label>截止日期</label><span style="position:relative;top:0;left:3px;">{{ dataJson.deadline | LocalDateStr }}</span>
    </div>
    <div style="position:absolute;top:90%;left:39%;">
    <label>发布日期</label><span style="margin-left:2px;" >{{dataJson | getLocalDate}}</span>
    </div>
    </div>
 </div>
 </div>
</template>
<style>
  .custom-homework-content .custom-badge{
     position: absolute;
     right:5px;
     top:114px;
  }
  .custom-homework-content .custom-content{
     height: 82%;
     text-indent:2em;
  }
  .custom-homework-content .custom-label{
      min-width: 70px;
      max-width:87px;
      word-break:break-all; 
　　  word-wrap:break-word;
  }
  .custom-homework-content .custom-wrap{
        position: relative;
        background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 120% 1px;
        background-repeat: no-repeat;
        background-position: top left;
        background-origin: content-box;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: 16px;
        line-height: 1;
        min-height: inherit;
        height:280px;
        overflow: hidden;
        padding: 0 10px;
        width: 100%;
  }
  .custom-homework-content{
        background-color: #fff;
        box-sizing: border-box;
        color: inherit;
        min-height: 48px;
        display: block;
        overflow: hidden;
        position: relative;
        text-decoration: none;
  }
</style>
<script>
import Header from './header.vue'
import { mapState } from 'vuex'
export default {
    computed:{
       ...mapState({
          dataJson: state => state.homework_data
       })
   },
   data(){
      return {
         name:'Foo'
      }
   },
   components:{
       'child':Header
   },
   filters:{
     getLocalDate:function(value){
        console.log(value);
        var weekArr = ['日','一','二','三','四','五','六'];
        var date1 = value.publish_at;
        console.log(date1);
        var ddd = new Date(date1);
        var week = ddd.getDay();
        var arr  = date1.split('-');
        var year = arr[0];
        var month = arr[1];
        var dd = '';
        if(arr[2].length > 4){
           dd = arr[2].split('T')[0];
        }else{
           dd = arr[2];
        }
        return year + '年 '+ month+'月'+ dd +'日 '+ '星期' + weekArr[week];
     },
     LocalDateStr:function(value){
        var weekArr = ['日','一','二','三','四','五','六'];
        var ddd = new Date(value);
        var week = ddd.getDay();
        var arr  = value.split('-');
        var year = arr[0];
        var month = arr[1];
        var dd = '';
        if(arr[2].length > 4){
           dd = arr[2].split('T')[0];
        }else{
           dd = arr[2];
        }
        return year + '年 '+ month+'月'+ dd +'日 '+ '星期' + weekArr[week];
     },
     filterImg:function(imgs){
        if(imgs.length>0){
          if(imgs[0].hasOwnProperty('url')){
            return imgs[0].url;
          }else{
            return imgs[0];
          }
        }else{
          return '';
        }
     }
   }
}
</script>



// WEBPACK FOOTER //
// homework.vue?2afe92a0