<template>
    <div class="template">
     <child></child>
     Bar
     </div>
</template>
<script>
import Header from './header.vue'
export default {
   data(){
      return {
         name:'Bar'
      }
   },
   components:{
       'child':Header
   }
}
</script>
