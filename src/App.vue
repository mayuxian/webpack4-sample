<template>
  <div id="home">
    <h1>Webpack4的配置示例</h1>
    <div>
      <!-- 广告 -->
      <ads></ads>
    </div>
    <div class="css">
      <h2>内容:</h2>
    </div>
  </div>
</template>

<script>
// import { getInfos } from './a.js'
import Ads from './Ads.vue';
export default {
  name: "app",
  data() {

  },
  components: {
    Ads
  },
  methods: {

  }
}
</script>

<style  scoped>
/* @import "./css/index.css"; */
</style>