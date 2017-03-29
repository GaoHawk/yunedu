<template>
    <div class="template">
     <child ref="ref1"></child>
     Bar
     <dropzon maxFiles="1"  ref="myUnique" id="vueDropzone" url="http://localhost:8081/upload/file"  acceptedFileTypes='image/*,audio/*'  v-on:vdropzone-success="showSuccess" :autoProcessQueue="auto"></dropzon>
     <button @click="uploadFile">上传</button>
     <button @click="clearout">重置</button>
     </div>
</template>
<!-- 文件上传组件 -->
<script>
import Header from './header.vue'
import vueDrop from 'vue2-dropzone'

export default {
   mounted(){
        console.log(this.$refs);
        let arr = []
        arr.push(this.$refs['ref1'])
        console.log(arr);

        // var value = this.$children[1].get autoProcessQueue;
        // console.log(value)
   },
   data(){
      return {
         name:'Bar',
         auto:false
      }
   },
   components:{
       'child':Header,
       dropzon:vueDrop
   },
   methods:{
       'showSuccess':function(file,json){
           console.log(this.$refs);
           console.log(file);
           console.log(json);
       },
       uploadFile:function(){
          var files = this.$refs.myUnique;
          // files.dropzone.removeAllFiles(true);
          files.dropzone.processQueue();
          // var queueFile = files.dropzone.getQueuedFiles();
       },
       clearout:function(){
         this.$refs.myUnique.dropzone.removeAllFiles(true);
       }
   }
}
</script>
