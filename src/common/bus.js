/*
* @Author: Administrator
* @Date:   2017-02-23 17:09:40
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-23 18:38:44
*/

import Vue from 'vue'
import Head from '../component/header.vue'
var bus = new Vue()
console.log(Head);
bus.$on('getTarget', target => {
  console.log(target);
  bus.$set('title',target);

    // this.name = target;
});
export  default bus
