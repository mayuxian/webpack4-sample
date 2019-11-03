import Vue from 'vue';
import App from './App.vue'

import { getInfos } from './a';
console.log('2')
getInfos('test');

new Vue({
  el: "#app",
  // components: {   //component和render 二选一
  //   App
  // },
  // template:"<App/>",
  render: h => h(App)
})

