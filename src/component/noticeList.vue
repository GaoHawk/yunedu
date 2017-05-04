<template>
    <div class="page-infinite-wrapper" ref="wrapper2" :style="{ height: wrapper2Height + 'px' }">
    
        <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    
            <li v-for="n in notice" class="page-infinite-listitem">
    
                <mt-cell :title="n.title" :value="n.value" @click.native="testclick_n(n)" v-finger:doubletap="doubleTap" is-link>
    
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
            Bus.$on('goToNotice',target =>{

                this.loadMore();
            })
        },
    
        computed: {
    
    
    
            ...mapState({
                selected: state => state.index_state,
                notice: state => state.notices,
                noticeCount: state => state.noticeCount,
                noticeEnd: state => state.noticeEnd,
                userId: state => state.userId,
               session: state => state.u_session
    
            })
    
    
    
        },
    
    
    
        data() {
    
    
    
            return {
    
    
    
                loading: false,
    
    
    
                allLoaded: false,
    
    
    
                wrapper2Height: 0
    
    
    
            };
    
    
    
        },
    
    
    
        methods: {
    
    
    
            loadMore() {
                if(!(this.selected == '通知')){
                    console.log('未激活');
                    return;
                }
                if (this.notice.length > 40) {
    
                    console.log('end');
    
                    return;
    
                }
    
    
                if(!this.noticeEnd){
                    this.loading = true;
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
                        this.$store.commit('SET_NOTICE_COUNT',noticeNum+1);
                        this.loading = false;
                    }, response => {
                        // this.$store.commit('OPEN_DIALOG1');
                        // this.$store.commit('SET_RESPONSE', '提交失败')
                        console.log(response)
                    })
                }else{
                    console.log(this.noticeEnd);
                    return;
                }
    
    
            },
    
            doubleTap() {
    
                // this.$store.commit('SET_HOME', false);
    
                // sessionStorage.showHome = false;
    
                // this.$store.commit('SET_HOMEWORK_DATA', data)
    
                this.$store.commit('NEW_TITLE', '通知');
    
                this.$store.commit('ROUT_PATH', '/notice');
    
                this.$store.commit('SET_PREPATH', '/');
    
                console.log(1);
    
            },
    
    
            testclick_n(data) {
                console.log(data)
                // this.$store.commit('SET_HOME', false);
                // sessionStorage.showHome = false;
                this.$store.commit('SET_DATA', data)
                // this.$store.commit('NEW_TITLE', '通知');
                // this.$store.commit('ROUT_PATH', '/notice');
                // this.$store.commit('SET_PREPATH', '/');
            },

    
    
        },
    
    
    
        mounted() {
    
    
    
            this.wrapper2Height = document.documentElement.clientHeight - this.$refs.wrapper2.getBoundingClientRect().top - 40;
    
    
    
            // for (let i = 1; i <= 20; i++) {
    
    
    
            //     this.list.push(i);
    
    
    
            // }
    
    
    
        }
    
    
    
    };
</script>