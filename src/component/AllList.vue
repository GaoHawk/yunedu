<template>
    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    
    
            <ul class="page-infinite-list"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
              <li v-for="item in list"
                  class="page-infinite-listitem">
         
                <mt-cell v-if="item.course"
                         :title="item.course+`作业`"
                         :value="item.content"
                         @click.native="testclick_q(item,'作业')"
                         is-link>
                </mt-cell>
                <mt-cell v-if="item.title"
                         :title="item.title"
                         :value="item.content"
                         @click.native="testclick_q(item,'通知')"
                         is-link>
                </mt-cell>
              </li>
            </ul>
    
        <p v-show="loading" class="page-infinite-loading">
    
    
    
    
    
            <mt-spinner type="fading-circle"></mt-spinner>
    
    
    
    
    
    
    
            加载中...
    
    
    
    
    
    
    
        </p>
    
    
    
    
    
    
    
    </div>
</template>
<script>
    import {   mapState } from 'vuex'
    
    
    
    export default {
    
    
    
        computed: {
    
            list: function () {
            var arr = this.homework.concat(this.notice);
            return arr;
            },
            ...mapState({
            selected: state => state.index_state,
            homework: state => state.homeworks,
            notice: state => state.notices,
            loadCount: state => state.loadingCount,
            noticeCount: state => state.noticeCount,
            homwworkEnd: state => state.homeworkEnd,
            noticeEnd: state => state.noticeEnd
            })
    
        },
    
    
    
        data() {
    
    
    
            return {
    
    
    
                loading: false,
    
    
    
                allLoaded: false,
    
    
    
                wrapperHeight: 0
    
    
    
            };
    
    
    
        },
    
    
    
        methods: {
    
    
    
            loadMore() {
    
            if(this.list.length > 40){
                console.log('end');
                return;
            }    
      var userId='236942';
      var session='05D751676848D1FC2216B877BDCD96251492408973256';
    
      if (this.homwworkEnd) {
          
        console.log('false');
        console.log(this.noticeEnd);
        if(!this.noticeEnd){
          var noticeNum = this.noticeCount?this.noticeCount:1;
          
          this.$http.get('http://localhost:8081/notices',{
            headers:{"X-Session":session},
            params: {
              user_id: userId,
              order: "DESC",
              limit: 4,
              starting_after: noticeNum
            }
          }).then(response => {
            console.log(response.data.data);
            for (let i = 0; i < response.data.data.length; i++) {
              this.$store.commit('SUBMIT_NOTICES', response.data.data[i]);
            }
          let noticeLen = response.data.data.length
          console.log(noticeLen)
          if(noticeLen <4){
            this.$store.commit('SET_NOTICE_END',true);
          }
          this.$store.commit('SET_LOAD_COUNT',numH+1);
          this.loading = false;
          }, response => {
            // this.$store.commit('OPEN_DIALOG1');
            // this.$store.commit('SET_RESPONSE', '提交失败')
            console.log(response)
          })
        }else{
          return;
        }
      }else{
          this.loading = true;
          var numH  =  this.loadCount?this.loadCount:1;
          this.$http.get('http://localhost:8081/homeworks_web',{
            headers:{"X-Session":session},
            params: {
              user_id: userId,
              order: "DESC",
              limit: 4,
              starting_after: numH
            }
          }).then(response => {
            console.log(response.data.data);
            for (let i = 0; i < response.data.data.length; i++) {
              this.$store.commit('SUBMIT_HOMEWOKR',response.data.data[i]);
              // this.lists.push();
            }
            let dataLen = response.data.data.length

            if(dataLen <4){
              this.$store.commit('SET_HOMEWORK_END',true);
            }
            this.$store.commit('SET_LOAD_COUNT',numH+1);
            this.loading = false;
          }, response => {
            // this.$store.commit('OPEN_DIALOG1');
            // this.$store.commit('SET_RESPONSE', '提交失败')
            console.log(response)
          })
      }
    
    
    
            },
    
            doubleTap() {
    
                this.$store.commit('SET_HOME', false);
    
                sessionStorage.showHome = false;
    
                // this.$store.commit('SET_HOMEWORK_DATA', data)
    
                this.$store.commit('NEW_TITLE', '作业');
    
                this.$store.commit('ROUT_PATH', '/homework');
    
                this.$store.commit('SET_PREPATH', '/');
    
                console.log(1);
    
            },
    
            
            testclick_n(data) {
                console.log(data)
                this.$store.commit('SET_HOME', false);
                sessionStorage.showHome = false;
                this.$store.commit('SET_DATA', data)
                this.$store.commit('NEW_TITLE', '通知');
                this.$store.commit('ROUT_PATH', '/notice');
                this.$store.commit('SET_PREPATH', '/');
            },
            testclick_h(data) {
                console.log(data);
                // this.$store.commit('SET_HOME', false);
                // sessionStorage.showHome = false;
                this.$store.commit('SET_HOMEWORK_DATA', data)
                // this.$store.commit('NEW_TITLE', '作业');
                // this.$store.commit('ROUT_PATH', '/homework');
                // this.$store.commit('SET_PREPATH', '/');
            },
            testclick_q(obj,objType) {
                console.log(obj);
                console.log(objType);
                console.log(this.testclick_n);
                switch(objType)
                {
                    case '作业':
                    break;
                    case '通知':
                    break;
                    default:
                    break;
                }
                // this.testclick_n(obj);
            },

    
    
        },
    
    
    
        mounted() {
    
    
    
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 40;
    
    
    
            // for (let i = 1; i <= 20; i++) {
    
    
    
            //     this.list.push(i);
    
    
    
            // }
    
    
    
        }
    
    
    
    };
</script>