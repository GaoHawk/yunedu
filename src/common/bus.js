/*
* @Author: Administrator
* @Date:   2017-02-23 17:09:40
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-04-26 11:05:03
*/

import Vue from 'vue'
import Head from '../component/header.vue'
import AllList from '../component/AllList.vue'

var bus = new Vue();
// console.log(Head);
bus.$on('goToAlll', target => {
  console.log(target);
  console.log(AllList);
  console.log(AllList.data);
  // bus.$set(this.$data,'title',target);
  console.log(bus)
    // this.name = target;
});
export  default bus
