<template>
<div class="template">
  <child></child>
 <mt-checklist
    title="班级选择"
    v-model='value'
    :options="['选项A','选项B','选项C']"
    class="form-checklist"
    >
 </mt-checklist>
 <div>
   <mt-cell title="选中的项">{{ value }}</mt-cell>
 </div>
 <select v-model="selected">
   <option>语文</option>
   <option>数学</option>
   <option>英文</option>
 </select>
 <mt-field  placeholder="输入作业内容"  type="textarea" rows="5"></mt-field>

 <mt-field label="上传附件" placeholder="请选择图片和音频文件" @click.native="goToUpload"></mt-field>
 <mt-field label="截止日期" placeholder="请输截止日期" type="date"></mt-field>
 <div class="center">
   <button>清空</button>
   <button>提交</button>
 </div>
 </div>
</template>
<style>
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
import { Field,Checklist } from 'mint-ui';
export default {
   data(){
      return {
         name:'Foo',
         value:[],
         selected:'语文'
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
        sessionStorage.showHome = false;
     }
   }
}
</script>
