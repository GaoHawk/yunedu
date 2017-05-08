<template>
    <div class="page-infinite-wrapper" ref="wrapper1" :style="{ height: wrapper1Height + 'px' }">
    
    
    
        <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    
    
    
            <li v-for="m in homework" class="page-infinite-listitem">
    
    
    
                <mt-cell :title="m.course+`作业`" :value="m.content" @click.native="testclick_h(m)"  is-link>
    
    
    
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
            Bus.$on('goToHomework',target =>{

                this.loadMore();
            })
        },
    
        computed: {
    
    
    
            ...mapState({
    
                selected: state => state.index_state,
    
                homework: state => state.homeworks,
    
    
    
                loadCount: state => state.loadingCount,
    
    
    
                homwworkEnd: state => state.homeworkEnd,
                 userId: state => state.userId,
                 session: state => state.u_session
    
    
    
            })
    
    
    
        },
    
    
    
        data() {
    
    
    
            return {
    
    
    
                loading: false,
    
    
    
                allLoaded: false,
    
    
    
                wrapper1Height: 0
    
    
    
            };
    
    
    
        },
    
    
    
        methods: {
    
    
    
            loadMore() {
                
                if(!(this.selected == '作业')){
                    console.log(this.selected);
                    console.log('未激活');
                    return;
                }else{
                
                }
                if (this.homework.length > 40) {
    
                    console.log('end');
    
                    return;
    
                }

    
                if (this.homwworkEnd) {
    
    
    
                    console.log('作业查询完毕');
    
    
    
                    return;
    
    
    
                } else {
    
                    this.loading = true;
                    console.log(this.loading);
                    var numH = this.loadCount ? this.loadCount : 1;
    
                    this.$http.get('http://localhost:8081/homeworks_web', {
    
    
                        headers: {
    
    
                            "X-Session": this.session
    
                        },
    
    
                        params: {
    
    
    
                            user_id: this.userId,
    
    
    
                            order: "DESC",
    
    
    
                            limit: 4,
    
    
    
                            starting_after: numH
    
    
    
                        }
    
    
    
                    }).then(response => {
    
    
    
                        console.log(response.data.data);
    
    
    
                        for (let i = 0; i < response.data.data.length; i++) {
    
    
    
                            this.$store.commit('SET_HWK_DATA', response.data.data[i]);
    
    
    
                            // this.lists.push();
    
    
    
                        }
    
    
    
                        let dataLen = response.data.data.length
    
    
                        if (dataLen < 4) {
    
    
    
                            this.$store.commit('SET_HOMEWORK_END', true);
    
    
    
                        }
    
    
    
                        this.$store.commit('SET_LOAD_COUNT', numH + 1);
    
    
                        this.loading =false;
    
    
    
                    }, response => {
    
    
                        // this.$store.commit('OPEN_DIALOG1');
    
    
                        // this.$store.commit('SET_RESPONSE', '提交失败')
    
                        this.loading = false;
    
                        console.log(response)
    
    
    
                    })
    
    
    
                }
    
    
    
            },
    
            doubleTap() {
    
                // this.$store.commit('SET_HOME', false);
    
                // sessionStorage.showHome = false;
    
                // this.$store.commit('SET_HOMEWORK_DATA', data)
    
                this.$store.commit('NEW_TITLE', '作业');
    
                this.$store.commit('ROUT_PATH', '/homework');
    
                this.$store.commit('SET_PREPATH', '/');
    
                console.log(1);
    
            },
    
    
            testclick_h(data) {
    
                console.log(data);
    
                // this.$store.commit('SET_HOME', false);
    
                // sessionStorage.showHome = false;

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

                this.$store.commit('NEW_TITLE', '作业');
    
                this.$store.commit('ROUT_PATH', '/homework');
    
                this.$store.commit('SET_PREPATH', '/');
    
                // this.$store.commit('NEW_TITLE', '作业');
    
                // this.$store.commit('ROUT_PATH', '/homework');
    
                // this.$store.commit('SET_PREPATH', '/');
    
            },

    
    
        },
    
    
    
        mounted() {
    
    
    
            this.wrapper1Height = document.documentElement.clientHeight - this.$refs.wrapper1.getBoundingClientRect().top - 40;
    
    
    
            // for (let i = 1; i <= 20; i++) {
    
    
    
            //     this.list.push(i);
    
    
    
            // }
    
    
    
        }
    
    
    
    };
</script>