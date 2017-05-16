<template>
<div class="template" v-my-drag="dg">
  <child ref="profile"></child>
  <div class="panel">
   <mt-checklist
    title="班级选择"
    v-model='value'
    :options="ops"
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
    <mt-button type="default" size="normal" @click.native="clearout">清空</mt-button>
    <mt-button type="default" size="normal" @click.native="submitForm">提交</mt-button>
  </div>
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
          st:state => state.stoName,
          hand_class: state => state.hand_classes,
          userId: state => state.userId,
          session: state => state.u_session,
          dg: state => state.dragable
       }),
       uploadFiles:function(){
         var str = '';
         for(let i = 0;i<this.file.length;i++){

           str += this.file[i].file +","
         }
        //  if(this.file.length>1){
            str = str.substr(0,str.length-1);
        //  }
         return str;
       },
       imgSrc:function(){

         return this.file[0]?this.file[0].url:null;
       },
       ops:function(){
         var arr = [];
         var cls = this.hand_class;
         for(let i=0;i<cls.length;i++){
            arr.push(cls[i].className)
         }
         return arr;
       }
   },
   data(){
      return {
         name:'Foo',
         value:[],
         selected:'语文',
         content:'',
         date:'',
         dragAble:false,
         cHeight:'',
         oHeight:'',

      }
   },
   components:{
       'child':Header
   },
   methods:{
     dragT:function(){
         console.log('drag');
     },
     goToUpload:function(){
        this.$store.commit('NEW_TITLE','上传文件');
        this.$store.commit('ROUT_PATH','/bar');
        this.$store.commit('SET_PREPATH','/foo');
        // this.$store.commit('SET_HOME',false);
        this.$store.commit('CLEAR_FIELS');
        // sessionStorage.showHome = false;
     },
     clearout:function(){
       console.log(this.hand_class);
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

       let classroom_ids = [];
       // 获得班级id
       for(let i=0;i<this.hand_class.length;i++){
          for(let j=0;j<this.value.length;j++){
            console.log(this.hand_class[i].className);
            console.log(this.value[j]);
            if(this.hand_class[i].className === this.value[j]){
              classroom_ids.push(this.hand_class[i].classID);
            }
          }
       }
       console.log(classroom_ids);
       //  查看内容输入情况
       console.log(this.content);
       console.log(this.file);
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

       var classIds = classroom_ids.join();
       console.log(classIds);
       // 提交的作业数据
       var sub_homework = {
           classroom_ids:classIds,
           course:this.selected,
           content:this.content,
           deadline_at:this.date,
           images:this.file,
       }
       var imgsArr =[];
      for(let i =0;i<this.file.length;i++){
        imgsArr.push(this.file[i].file);
      }
      this.$http({
          method: 'post',
          url:'http://localhost:8081/homeworks',
          data:{
              classroom_ids:classIds,
              course:this.selected,
              content:this.content,
              deadline_at:this.date +'T00:00:00Z',
              images:imgsArr,
          },
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'X-session':this.session
          }
      }).then(response => {
          console.log(response.data.data);
          // var classData = response.data.data;
          // for(let i=0;i<classData.length;i++){
          //   let classObj = {
          //       classID:classData[i].id,
          //       className:classData[i].grade + classData[i].name
          //   }
          //   this.$store.commit('SET_HAND_CLASS',classObj);
          // }
          this.$store.commit('CLEAR_OUT_HOMEWORK');
          this.$store.commit('SET_HOMEWORK_END',false);
          this.$store.commit('SET_LOAD_COUNT',1);
      }, response => {

          console.log(response)
      })
       // 展示的作业数据
       var homework = {
           index:index,
           course:this.selected,
           content:this.content,
           deadline:this.date,
           images:this.file,
           class:this.value,
           publish_at:publish_at,
           week:week,
           comment:''
       }

     
      //  this.$store.commit('CLEAR_FIELS');
     }
   },
   activated(){
       console.log(this.prePath);
       if(this.prePath == "/"){
           this.clearout();
       }
     var offset1Height = document.documentElement.offsetHeight;
     this.oHeight = offset1Height;
     console.log(this.oHeight);
     var clientHeight = document.documentElement.clientHeight;
     this.cHeight = clientHeight;
     console.log(this.cHeight);
     this.dragAble = (offset1Height > clientHeight);
     console.log(this.dragAble);
     this.$store.commit('SET_DRAG_ABLE',this.dragAble);
   },
   befroeCreated(){
     var offset1Height = document.documentElement.offsetHeight;
     this.oHeight = offset1Height;
     console.log(this.oHeight);
     var clientHeight = document.documentElement.clientHeight;
     this.cHeight = clientHeight;
     console.log(this.cHeight);
     this.dragAble = (offset1Height > clientHeight);
     console.log(this.dragAble);
     this.$store.commit('SET_DRAG_ABLE',this.dragAble);
   }
}
</script>
