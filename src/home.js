import Vue from 'vue';
import Ads from './Ads.vue'

import { getInfos } from './lib/jquery.test';
console.log('2')
getInfos('test');

import _ from 'lodash';
console.log(_.debounce);
import axios from 'axios';
console.log(axios.CancelToken);

import './css/index.less';
import './css/index.scss';
new Vue({
  el: "#app",
  // components: {   //component和render 二选一
  //   App
  // },
  // template:"<App/>",
  render: h => h(Ads)
})

