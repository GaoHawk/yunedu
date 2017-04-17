<template>
    <div class="page-infinite-wrapper" ref="wrapper1" :style="{ height: wrapper1Height + 'px' }">
    
    
    
        <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    
    
    
            <li v-for="m in homework" class="page-infinite-listitem">
    
    
    
                <mt-cell :title="m.course+`作业`" :value="m.content" @click.native="testclick_h(m)" v-finger:doubletap="doubleTap" is-link>
    
    
    
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
    
    
    
            ...mapState({
    
    
    
                homework: state => state.homeworks,
    
    
    
                loadCount: state => state.loadingCount,
    
    
    
                homwworkEnd: state => state.homeworkEnd,
    
    
    
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
    
                if (this.homework.length > 40) {
    
                    console.log('end');
    
                    return;
    
                }
    
                var userId = '236942';
    
                var session = '05D751676848D1FC2216B877BDCD96251492408973256';
    
                if (this.homwworkEnd) {
    
    
    
                    console.log('作业查询完毕');
    
    
    
                    return;
    
    
    
                } else {
    
                    this.loading = true;
                    console.log(this.loading);
                    var numH = this.loadCount ? this.loadCount : 1;
    
                    this.$http.get('http://localhost:8081/homeworks_web', {
    
    
                        headers: {
    
    
                            "X-Session": session
    
    
                        },
    
    
                        params: {
    
    
    
                            user_id: userId,
    
    
    
                            order: "DESC",
    
    
    
                            limit: 4,
    
    
    
                            starting_after: numH
    
    
    
                        }
    
    
    
                    }).then(response => {
    
    
    
                        console.log(response.data.data);
    
    
    
                        for (let i = 0; i < response.data.data.length; i++) {
    
    
    
                            this.$store.commit('SUBMIT_HOMEWOKR', response.data.data[i]);
    
    
    
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
    
                this.$store.commit('SET_HOME', false);
    
                sessionStorage.showHome = false;
    
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
    
                this.$store.commit('SET_HOMEWORK_DATA', data)
    
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