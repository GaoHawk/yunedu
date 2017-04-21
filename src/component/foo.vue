<template>
<div class="template">
  <child ref="profile"></child>
 <mt-checklist
    title="班级选择"
    v-model='value'
    :options="['选项A','选项B','选项C']"
    class="form-checklist"
    >
 </mt-checklist>
 <div class="custom-select">
   <mt-cell title="选中的项">{{ value }}</mt-cell>
 </div>
 <select v-model="selected">
   <option>语文</option>
   <option>数学</option>
   <option>英文</option>
 </select>
 <mt-field  placeholder="输入作业内容"  v-model="content" type="textarea" rows="4"></mt-field>

 <mt-field label="上传附件" placeholder="请选择图片文件" @click.native="goToUpload"
 :value="uploadFiles" style="font-size:12px">
 <!--<img :src="imgSrc" height="45px" width="100px">-->
 </mt-field>
 <mt-field label="截止日期" placeholder="请输截止日期" v-model="date" type="date"></mt-field>
  <div class="center">
    <mt-button type="default" size="small" @click.native="clearout">清空</mt-button>
    <mt-button type="default" size="small" @click.native="submitForm">提交</mt-button>
  </div>
 </div>
</template>
<style>
    div.custom-select div.mint-cell-title{
       min-width:74px;
    }
    div.form-checklist div.mint-cell-title{
      width:100%;
      flex:none;
    } 
    .mint-checklist-label{
      padding:0!important;
    }
    button{
       padding: 6px 12px;
    }
    .center{
      margin-top: 10px;
      text-align: center;
    }
   textarea{
      resize:none;
   }
   select{
    width: 100%;
    height: 25px;
   }
   .page-checklist .page-part {
     margin-top: 40px;
   }
</style>
<script>
import Header from './header.vue'
import { Field,Checklist, MessageBox } from 'mint-ui';
import { mapState } from 'vuex'
export default {
   computed:{
       ...mapState({
          file:state => state.files,
          homewk:state => state.homeworks,
          title: state => state.title,
          path:state => state.path,
          prePath:state => state.prevPath,
          // 上传文件使用的间隔函数
          st:state => state.stoName
       }),
       uploadFiles:function(){
         var str = '';
         for(let i = 0;i<this.file.length;i++){
           console.log(this.file[i]);
           str += this.file[i].file +","
         }
        //  if(this.file.length>1){
            str = str.substr(0,str.length-1);
        //  }
         return str;
       },
       imgSrc:function(){
         console.log(this.file[0])
         return this.file[0]?this.file[0].url:null;
       }
   },
   data(){
      return {
         name:'Foo',
         value:[],
         selected:'语文',
         content:'',
         date:''
      }
   },
   components:{
       'child':Header
   },
   methods:{
     goToUpload:function(){
        this.$store.commit('NEW_TITLE','上传文件');
        this.$store.commit('ROUT_PATH','/bar');
        this.$store.commit('SET_PREPATH','/foo');
        this.$store.commit('SET_HOME',false);
        this.$store.commit('CLEAR_FIELS');
        sessionStorage.showHome = false;
     },
     clearout:function(){
       console.log(this);
       this.content = '';
       this.date = '';
       this.selected = '语文';
       this.value=[];
       this.file = [];
       this.$store.commit('CLEAR_FIELS');
     },
     submitForm:function(){
      //  console.log(this.homewk);
       var index = 1;
       if(this.homewk.length >0){
         index = this.homewk.length + 1;
       }

       //  查看内容输入情况
       console.log(this.content);
       // 输入合法验证
       if(this.content.length == 0){
         MessageBox('提示','请输入作业内容');

         return;
       }
       if(this.value.length == 0){
         MessageBox('提示','请选择要发布作业的班级')

         return;
       }
       if(this.date.length == 0){
         MessageBox('提示','请选择作业完成日期');
         return;
       }
       

      // 发布日期
      var now = new Date();
      var publish_at = now.toLocaleDateString();
      var week = now.getDay();
      
       var child1 = this.$refs.profile;

       child1.back();
       var homework = {
           index:index,
           course:this.selected ,
           content:this.content,
           deadline:this.date,
           images:this.file,
           class:this.value,
           publish_at:publish_at,
           week:week
       }
       this.$store.commit('SUBMIT_HOMEWOKR',homework);
      //  this.$store.commit('CLEAR_FIELS');
     }
   }
}
</script>
