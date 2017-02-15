<template >
  <li>
    {{ title }}
    <button v-on:click="result">X</button>
  </li>
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
   props:['title','index'],
   components:{
       'child':Header
   },
   methods:{
       getChild:function(){
         console.log(this)
         this.$children[0].name = 'Notice'
       },
       result:function(){
            var app  = this.$parent.$data.todos;
            console.log(app);
       }
   }
}
</script>
