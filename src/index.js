import Vue from 'vue';
import App from './App.vue'

import './lib/3rd';
import './test';

import './css/index.less';
import './css/index.scss';

import _ from 'lodash';
console.log(_.debounce);

new Vue({
  el: "#app",
  // components: {   //component和render 二选一
  //   App
  // },
  // template:"<App/>",
  render: h => h(App)
})

