<template>
<div class="template">
  <child></child>
 <mt-checklist
    title="班级选择"
    align="right"
    v-model='value'
    :options="['选项A','选项B','选项C']"
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
 <mt-field label="截止日期" placeholder="请输截止日期" type="date"></mt-field>
 <div class="center">
   <button>清空</button>
   <button>提交</button>
 </div>
 </div>
</template>
<style>
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
   }
}
</script>
