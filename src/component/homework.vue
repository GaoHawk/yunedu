<template>
<div class="template">
  <child></child>
  <div class="custom-homework-content">
    <div class="custom-wrap">
    <label class="custom-label" >{{dataJson.course}}作业 </label>
    <p class="custom-content">
    <pre>{{dataJson.content}}</pre>
     </p>
   <!-- 音频文件 -->
    <div style="transform:scale(0.75,0.75);position:absolute;bottom:20%;left:21%;" v-if="dataJson.record_url">
     <audio-player :sources="audioSources" :loop="false"></audio-player>
    </div>
    <img :src="preViewPic[0]" v-show="preViewPic.length==1"  class="picView" >
    <div v-show="preViewPic.length>1" class="stack picView rotated-left"  >
       <img :src="preViewPic[0]">
       
    </div>
    <div  class="time-lable timeEnd">
    <label>截止日期</label><span style="position:relative;top:0;left:3px;">{{ dataJson.deadline | LocalDateStr }}</span>
    </div>
    <div  class="timePublish">
    <label>发布日期</label><span style="margin-left:2px;" >{{dataJson | getLocalDate}}</span>
    </div>
    </div>
 </div>
 <div class="has-comments" v-if="commentsData.length>0">
 <p class="comment">最新评论</p>
    <mt-cell v-for="(item,index) in commentsData" :title="item.user_name+':'" :value="item.content" :index='index' v-if="index < 3">
    
    </mt-cell>
    <div style="text-align:center;color:red;margin-top:10px;" ><span style="padding:4px 8px;border:1px solid;border-radius:5px;" v-on:click="commentPage(dataJson.id)">查看全部评论</span></div>
 </div>
 <div v-else v-on:click="getComment(dataJson.id)" style="margin-top:25px;border:1px solid;">
    <p style="color:#999;text-align:center;">没有评论发表
    <br/>
    <br/>
    <span>点击区域发表新评论</span>
    </p>
 </div>
 </div>
</template>
<style>
  /* 设置手机屏幕自适应 */
  .custom-homework-content .custom-content{

  }
  .custom-homework-content .custom-label{

  }
  .custom-homework-content .picView{
    transform:scale(0.6,0.6);
    position:fixed;
    right:-10%;
    top:0;
  }
  .custom-homework-content .stack.picView{
    transform:scale(0.5,0.5);
     position:fixed;
     right:-10%;
     top:0%;
  }
  .timeEnd{
    position:absolute;
    top:80%;
    left:38%;
    color:#888;
  }
  .timePublish{
    position:absolute;
    top:90%;
    left:38%;
    color:#888;
  }

  @media screen and (max-width: 400px) {
      .custom-homework-content .picView{
        right:-12%;
        top:-1.5%;
      }
      .custom-homework-content .stack.picView{

        right:-12%;
        top:-1.5%;
      }
      .timeEnd{
        font-size:14px;
        left:37%;
      }
      .timePublish{
        font-size:14px;
        left:37%;
      }
      .custom-homework-content .custom-content{

        font-size:15px;
      }
      .custom-homework-content .custom-label{

          font-size:17px;
      }
  }
  @media screen and (max-width:320px){
      .custom-homework-content .custom-wrap{
          height:265px!important;
      }
      p.comment{
         margin: 10px 10px;
         margin-left:1%;
      }
      .custom-homework-content .picView{
        transform:scale(0.4,0.4);
        position:fixed;
        right:-16%;
        top:-4%;
      }
      .custom-homework-content .stack.picView{
        transform:scale(0.4,0.4);
        position:fixed;
        right:-18%;
        top:-4%;
      }
      .timeEnd{
        position:absolute;
        top:85%;
        left:37%;
        color:#888;
        font-size:12px;
      }
      .timePublish{
        position:absolute;
        top:92%;
        left:37%;
        color:#888;
        font-size:12px;
      }
      .custom-homework-content .custom-content{
        font-size:13px;
      }
      .custom-homework-content .custom-label{
          font-size:15px;
      }
  }
  /* 评论样式 */
  .comment {
    line-height:50px;
    height:50px;
    color:#898989;
    font-size:14px;
    padding-left:7.5%;
    margin-left:1%;
    background:url(../assets/comment.png) no-repeat left center;
  }
  /* 设置css stack 堆叠效果 */
  .stack:last-of-type {
    margin-right:0;
  }
  .stack{
    z-index:10
  }
  .stack img{
    max-width:100%;
    height:auto;
    vertical-align:bottom;
    border:4px solid #eaeaea;
    border-radius:3px;
    box-sizing:border-box;
    box-shadow:0 1px 4px rgba(0,0,0,0.4);
  }
  .stack.rotated-left:before{
        -webkit-transform-origin: bottom left;
    -moz-transform-origin: bottom left;
    transform-origin: bottom left;
    -webkit-transform: rotate(-3deg);
    -moz-transform: rotate(-3deg);
    transform: rotate(-3deg);
  }
  .stack.rotated-left:after{
    -webkit-transform-origin: bottom left;
    -moz-transform-origin: bottom left;
    transform-origin: bottom left;
    -webkit-transform: rotate(-6deg);
    -moz-transform: rotate(-6deg);
    transform: rotate(-6deg);
  }
  .stack:before{
     top:4px;
     z-index:-10;
  }
  .stack:after{
    top:8px;
    z-index:-20;
  }
  .stack:before,
  .stack:after {
    content:'';
    border-radius:3px;
    width:100%;
    height:100%;
    position:absolute;
    border:4px solid #eaeaea;
    left:0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
    -webkit-transition: 0.3s all ease-out;
    -moz-transition: 0.3s all ease-out;
    transition: 0.3s all ease-out;
  }


  .custom-homework-content .custom-badge{
     position: absolute;
     right:5px;
     top:114px;
  }
  .custom-homework-content .custom-content{
     height: 82%;
     max-width:190px;
     padding-left:0.8em;
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
import AudioPlayer from './audio-player.vue'
export default {
    beforeCreate(){

    },
    computed:{
       ...mapState({
          dataJson: state => state.homework_data,
          preViewPic: state => state.previewPic,
          commentsData: state => state.comments
       }),
       currentComment:function(){
         var newComment = [];
         console.log(this.commentsData);
         if(this.commentsData && this.commentsData.length>0){
            for(let i=0;i<3;i++){
                newComment.push(this.commentsData[i]);
            }
            return newComment;
         }else{
           return '';
         }
         
       }
   },
   data(){
      return {
         name:'Foo',
         audioSources:[
          "/src/assets/voice/test.mp3",
        ]
      }
   },
   components:{
       'child':Header,
       AudioPlayer
   },
   methods:{
     commentPage:function(id){
       console.log(this.dataJson.publisher.name);
        this.$store.commit('SET_COMMENTS_NAME',this.dataJson.publisher.name)
        this.$store.commit('SET_COMMENTS_HID',id);
        this.$store.commit('ROUT_PATH', '/comments');
        this.$store.commit('NEW_TITLE','评论');
        this.$store.commit('SET_PREPATH', '/homework');

     },
     getComment:function(id){
       console.log(id);
       console.log(this.dataJson.publisher.name);
       this.$store.commit('SET_COMMENTS_NAME',this.dataJson.publisher.name)
        this.$store.commit('SET_COMMENTS_HID',id);
        this.$store.commit('ROUT_PATH', '/comments');
        this.$store.commit('NEW_TITLE','评论');
        this.$store.commit('SET_PREPATH', '/homework');
     }
   },
   mounted(){
     var picView = document.querySelectorAll(".picView");
     console.log(picView);
     let store = this.$store;
     console.log(store);
     picView[0].addEventListener('click',function(){
        console.log('view');
        store.commit('ROUT_PATH', '/pic');
        store.commit('NEW_TITLE','图片');
        store.commit('SET_PREPATH', '/homework');
     })
     picView[1].addEventListener('click',function(){
        console.log('view');
        store.commit('ROUT_PATH', '/pic');
        store.commit('NEW_TITLE','图片');
        store.commit('SET_PREPATH', '/homework');
     });
   },
   filters:{
     getLocalDate:function(value){
        var weekArr = ['日','一','二','三','四','五','六'];
        var date1 = value.publish_at;
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