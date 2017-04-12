<template>
  <div class="template">
    <child ref="profile"></child>
    <mt-checklist title="班级选择"
                  v-model='value'
                  :options="['选项A','选项B','选项C']"
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
import { Field, Checklist } from 'mint-ui';
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
      notices:state => state.notices
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
      this.$store.commit('NEW_TITLE', '上传文件');
      this.$store.commit('ROUT_PATH', '/bar');
      this.$store.commit('SET_PREPATH', '/foo');
      this.$store.commit('SET_HOME', false);
      sessionStorage.showHome = false;
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
      var now = new Date();
      var date = now.toLocaleDateString();
      var week = now.getDay();
      console.log(date,week);
      var child1 = this.$refs.profile;
      console.log(child1);
      child1.back();

      var notices = {
        index: index,
        title: this.notice_title,
        content:this.content,
        published:date,
        week:week
      }
      this.$store.commit('SUBMIT_NOTICES', notices);
    }
  }
}
</script>
