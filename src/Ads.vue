<template>
  <div>
    <h1>广告页面</h1>
    <div class="logo">
      <!-- div+background-image和img标签的选择区别：
      https://blog.csdn.net/diyinqian/article/details/81387313-->
    </div>
    <div class="cat"></div>
    <div class="less">这是less样式</div>
    <div class="scss">这是sass样式</div>
    <!-- <div>
      Logo:
      <img src="img/log.png" alt="logo" />
    </div>
    <div>
      Cat:
      <img src="img/cat.jpg" alt="cat" />
    </div>-->
    <!-- <div>
      Moon:
      <img src="img/moon.png" alt="moon" />
    </div>-->
  </div>
</template>

<script>
import './css/index.css';
export default {
  name: "ads",
  data() {

  }
}
</script>

<style lang="css" src="./css/ads.css"  scoped>
/* @import 和style src的区别
https://segmentfault.com/q/1010000011948454/a-1020000011948667 
https://www.jianshu.com/p/9caf9e7aaca4
@import是全局，没有给css打上tag，而src打上了tag
*/
/* @import './css/ads.css';   */
</style>

