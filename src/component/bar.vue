<template>
    <div class="template">
     <child></child>
     Bar
     <FileUpload  title="Add upload files"></FileUpload>
     </div>
</template>
<script>
import Header from './header.vue'
import FileUpload from 'vue-upload-component'
export default {
   data(){
      return {
         name:'Bar'
      }
   },
   components:{
       'child':Header,
       FileUpload:FileUpload
   }
}
</script>
