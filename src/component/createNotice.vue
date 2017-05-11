<template>
  <div class="template">
    <child ref="profile"></child>
    <mt-checklist title="班级选择"
                  v-model='value'
                  :options="ops"
                  class="form-checklist">
    </mt-checklist>
    <div class="custom-select">
      <mt-cell title="选中的项">{{ value }}</mt-cell>
    </div>
  
    <mt-field label="标题" placeholder="输入标题" v-model="notice_title"></mt-field>
    <mt-field placeholder="输入通知内容"
              v-model="content"
              type="textarea"
              rows="4"></mt-field>
  
    <div class="center">
      <mt-button type="default"
                 size="small"
                 @click.native="clearout">清空</mt-button>
      <mt-button type="default"
                 size="small"
                 @click.native="submitForm">提交</mt-button>
    </div>
  </div>
</template>
<style>
div.custom-select div.mint-cell-title {
  min-width: 74px;
}

div.form-checklist div.mint-cell-title {
  width: 100%;
  flex: none;
}

.mint-checklist-label {
  padding: 0!important;
}

button {
  padding: 6px 12px;
}

.center {
  margin-top: 10px;
  text-align: center;
}

textarea {
  resize: none;
}

select {
  width: 100%;
  height: 25px;
}

.page-checklist .page-part {
  margin-top: 40px;
}
</style>
<script>
import Header from './header.vue'
import { Field, Checklist, MessageBox } from 'mint-ui';
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      file: state => state.files,
      homewk: state => state.homeworks,
      title: state => state.title,
      path: state => state.path,
      prePath: state => state.prevPath,
      // 上传文件使用的间隔函数
      st: state => state.stoName,
      notices:state => state.notices,
       hand_class: state => state.hand_classes,
       userId: state => state.userId,
       session: state => state.u_session
    }),
    uploadFiles: function () {
      var str = '';
      for (let i = 0; i < this.file.length; i++) {
        console.log(this.file[i]);
        str += this.file[i].file + ","
      }
      //  if(this.file.length>1){
      str = str.substr(0, str.length - 1);
      //  }
      return str;
    },
    imgSrc: function () {
      console.log(this.file[0])
      return this.file[0] ? this.file[0].url : null;
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
  data() {
    return {
      value: [],
      content: '',
      notice_title:''
    }
  },
  components: {
    'child': Header
  },
  methods: {
    goToUpload: function () {
      // this.$store.commit('NEW_TITLE', '上传文件');
      // this.$store.commit('ROUT_PATH', '/bar');
      // this.$store.commit('SET_PREPATH', '/foo');
      // this.$store.commit('SET_HOME', false);
      // sessionStorage.showHome = false;
    },
    clearout: function () {
      this.content = '';
      this.value = [];
      this.notice_title='';
    },
    submitForm: function () {
      console.log(this.notices);
      var index = 1;
      if (this.notices.length > 0) {
        index = this.notices.length + 1;
      }

      // 提交验证数据合法
      if(this.notice_title.length == 0){
        MessageBox('提示','标题不能为空');
        return;
      }
      if(this.content.length == 0){
        MessageBox('提示','通知内容不能为空');
        return;
      }
      if(this.value.length == 0){
        MessageBox('提示','请选择要发布通知的班级');
        return;
      }
      var now = new Date();
      var date = now.toLocaleDateString();
      var week = now.getDay();
      console.log(date,week);
      var child1 = this.$refs.profile;
      console.log(child1);
      child1.back();

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
      var classIds = classroom_ids.join();

      this.$http({
          method: 'post',
          url:'http://localhost:8081/notices',
          data:{
              classroom_ids:classIds,
              title: this.notice_title,
              content:this.content,
              record_url:"",
              record_length:0
          },
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'X-session':this.session
          }
      }).then(response => {
          console.log(response.data.data);

          this.$store.commit('CLEAR_OUT_NOTICE');
          this.$store.commit('SET_NOTICE_END',false);
          this.$store.commit('SET_NOTICE_COUNT',1);
      }, response => {

          console.log(response)
      })

    }
  },
  activated(){
       console.log(this.prePath);
       if(this.prePath == "/"){
           this.clearout();
       }
  }
}
</script>
