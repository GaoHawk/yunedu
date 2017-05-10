<template>
    <div class="template">
     <child ref="ref1"></child>
    
     <dropzon   ref="myUnique" id="vueDropzone" url="/upload/file"  acceptedFileTypes='image/*'  
          v-on:vdropzone-success="showSuccess"
          :thumbnailHeight="100"
          :thumbnailWidth="50"
          :maxNumberOfFiles="8"
          :autoProcessQueue="auto"
          @click.native="clickZone">
     </dropzon>
     <div style="text-align:center;">
        <button @click="uploadFile">上传</button>
        <button @click="clearout">重置</button>
     </div>
     <span style="color:red;font-size:12px;" v-show="openPic">正在打开本地文件...</span>
     </div>
</template>
<!-- 文件上传组件 -->
<script>
import Header from './header.vue'
import vueDrop from 'vue2-dropzone'
import { mapState } from 'vuex'

export default {
   computed:{
        ...mapState({
            path:state => state.path,
            prePath:state => state.prevPath
        })
   },

   data(){
      return {
         name:'Bar',
         auto:false,
         openPic:false
      }
   },
   components:{
       'child':Header,
       dropzon:vueDrop
   },
   methods:{
       'showSuccess':function(file,json){
           console.log(file);
           console.log(this.$refs);
           var file = {
               file:json.filename,
               url:json.smallurl
           }
            var store= this.$store;
           store.commit('SET_FILES',file)
           console.log(this.$store);
       },
       uploadFile:function(){
          var files = this.$refs.myUnique;
          // files.dropzone.removeAllFiles(true);
          files.dropzone.processQueue();
          // var queueFile = files.dropzone.getQueuedFiles();
       },
       clearout:function(){
         this.$refs.myUnique.dropzone.removeAllFiles(true);
       },
       clickZone:function(){
           this.openPic = true;
       }
   },
   mounted(){
      var dropzone = document.querySelector('.dropzone');
      var vm = this;
      dropzone.addEventListener('DOMNodeInserted',function(e){
          var file = e.target;
          console.log(file);
          var dropFile = vm.$refs.myUnique.dropzone;
          console.log(dropFile);
          var bl = '';
          if(file.classList&&file.classList.contains('dz-preview')){
            bl = file.classList;
          }
          if(bl.length>0){
              var bb = bl.length;
              console.log(dropzone);
              if(dropzone.childNodes.length>9){
                  console.log(dropzone.childNodes);
                  dropFile.removeFile(dropFile.files[8]);
              }
          }
          
          vm.openPic = false;
      });
   },
   activated(){
      this.$refs.myUnique.dropzone.removeAllFiles(true);
   }
}
</script>
