<template v-for="item in classArr" v-bind:item="item">
<div class="template">
  <child></child>

 </div>

 <!-- <span>Checked names:{{ checkedNames }} </span> -->
</template>
<script>
import Header from './header.vue'
export default {
   data(){
      return {
         name:'Foo',
         classArr:[{className:"高三(1)班"},{className:"高三(2)班"},{className:"高三(3)班"}]
      }
   },
   components:{
       'child':Header
   },
   methods:{
       getChild:function(){
         console.log(this)
         this.$children[0].name = 'Notice'
       }
   }
}
</script>
