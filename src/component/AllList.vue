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
                         v-finger:doubletap="doubleTap"
                         is-link>
                </mt-cell>
                <mt-cell v-if="item.title"
                         :title="item.title"
                         :value="item.content"
                         @click.native="testclick_q(item,'通知')"
                         v-finger:doubletap="doubleTap"
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
    
    import Bus from '../common/bus.js'
    export default {
        created(){
            Bus.$on('goToAll',target =>{
                this.name = target;
                console.log(this.name);
                this.loadMore();
            })
        },
        computed: {
    
            list: function () {
            var arr = this.homework.concat(this.notice);
            if(this.jumpToNotice == 1){
                return arr;
            }else{
                return this.homework;
            }
            
            },
            ...mapState({
            selected: state => state.index_state,
            homework: state => state.homeworks,
            notice: state => state.notices,
            loadCount: state => state.loadingCount,
            noticeCount: state => state.noticeCount,
            homwworkEnd: state => state.homeworkEnd,
            noticeEnd: state => state.noticeEnd,
            userId: state => state.userId,
           session: state => state.u_session
            })
    
        },
    
    
        data() {
    
    
    
            return {
    
    
    
                loading: false,
    
    
    
                allLoaded: false,
    
    
    
                wrapperHeight: 0,

                jumpToNotice:0,

                dataType:''
    
    
            };
    
    
    
        },
    
    
    
        methods: {
    
    
    
            loadMore() {
    
            // if(this.list.length > 40){
            //     console.log('end');
            //     return;
            // }    
    
           if(this.selected == '全部'){

           }else{
              return;
           }
      if (this.homwworkEnd) {
          
        console.log(this.noticeEnd);
        if(this.jumpToNotice == 0){
           
            this.loading = true;
            setTimeout(() => {
                this.jumpToNotice +=1; 
                this.loading = false;
            },2500);
            return;
        }else{
            if(!this.noticeEnd){
            this.loading =true;
            var noticeNum = this.noticeCount?this.noticeCount:1;
            
            this.$http.get('http://localhost:8081/notices',{
                headers:{"X-Session":this.session},
                params: {
                user_id: this.userId,
                order: "DESC",
                limit: 4,
                starting_after: noticeNum
                }
            }).then(response => {
                console.log(response.data.data);
                for (let i = 0; i < response.data.data.length; i++) {
                this.$store.commit('SET_NOTICE_DATA', response.data.data[i]);
                }
            let noticeLen = response.data.data.length
            console.log(noticeLen)
            if(noticeLen <4){
                this.$store.commit('SET_NOTICE_END',true);
            }
            this.$store.commit('SET_NOTICE_COUNT',numH+1);
            this.loading = false;
            }, response => {
                // this.$store.commit('OPEN_DIALOG1');
                // this.$store.commit('SET_RESPONSE', '提交失败')
                console.log(response)
            })
            }else{
            return;
            }
        }

      }else{
          this.loading = true;
          var numH  =  this.loadCount?this.loadCount:1;
          this.$http.get('http://localhost:8081/homeworks_web',{
            headers:{"X-Session":this.session},
            params: {
              user_id: this.userId,
              order: "DESC",
              limit: 4,
              starting_after: numH
            }
          }).then(response => {
            console.log(response.data.data);
            for (let i = 0; i < response.data.data.length; i++) {
              this.$store.commit('SET_HWK_DATA',response.data.data[i]);
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
    
                // this.$store.commit('SET_HOME', false);
    
                // sessionStorage.showHome = false;
    
    
                this.$store.commit('NEW_TITLE', this.dataType);

                switch(this.dataType)
                {
                    case '作业':
                    this.$store.commit('ROUT_PATH', '/homework');
                    break;
                    case '通知':
                    this.$store.commit('ROUT_PATH', '/notice');
                    break;
                }
    
                this.$store.commit('SET_PREPATH', '/');
    

    
            },
    
            
            testclick_n(data) {
                console.log(data)
                // this.$store.commit('SET_HOME', false);
                // sessionStorage.showHome = false;
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
            testclick_q(data,objType) {
                console.log(objType);
                switch(objType)
                {
                    case '作业':
                    // 将图片数据单独存储用于预览
                    this.$store.commit('SET_PREVIEW_PIC',[]);
                    if(data.images.length>0){
                        var imgArr = [];
                        if(data.images[0].hasOwnProperty('url')){
                            for(let i=0;i<data.images.length;i++){
                                imgArr.push(data.images[i].url);
                            }
                            // return imgs[0].url;
                        }else{
                            for(let i=0;i<data.images.length;i++){
                                var smallUrl = data.images[i].replace('app_res/','app_res/sl');
                                imgArr.push(smallUrl);
                            }
                            // return imgs[0];
                        }
                        this.$store.commit('SET_PREVIEW_PIC',imgArr);
                    }
                    
                    this.$store.commit('CLEAR_OUT_CONTENT');
                    this.$store.commit('SET_COMMENT_END',false);
                    for (let i = data.comment.length-1; i>=0; i--) {
                        this.$store.commit('SET_COMMENT_CONTENT', data.comment[i]);
                    }
                    this.$store.commit('SET_HOMEWORK_DATA', data);
                    
                    this.dataType = '作业';
                    break;
                    case '通知':
                    this.$store.commit('SET_DATA', data);
                    this.dataType = '通知'
                    break;
                    default:
                    break;
                }
            },

    
    
        },
    
    
    
        mounted() {
    
    
    
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top-50;
    
    
    
            // for (let i = 1; i <= 20; i++) {
    
    
    
            //     this.list.push(i);
    
    
    
            // }
    
    
    
        }
    
    
    
    };
</script>