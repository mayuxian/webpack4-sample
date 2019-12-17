

// import 'jquery';
// import 'axios';

import _ from 'lodash';
console.log(_.debounce);

//异步方式
//需要安装@babel/plugin-syntax-dynamic-import
// import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
//   const element = document.createElement('div');
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   console.log('lodash async result:', element);
// }).catch(error => 'An error occurred while loading the component');
