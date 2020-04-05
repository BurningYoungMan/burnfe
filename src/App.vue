<template>
  <div id="app">
    <div class="temp" v-if="$route.path == '/login'">
      <router-view></router-view>
    </div>
    <div class="temp" v-else>
      <div class="temp" v-if="$route.path == '/err'">
        <err></err>
      </div>
      <div class="temp" v-else>
        <common></common>
      </div>
      <!-- <common></common> -->
    </div>
  </div>
</template>

<script>
import common from './views/common'
import err from './views/err'
export default {
  name: 'App',
  components: {
    common,
    err
  },
  mounted () {

  }
}
</script>

<style lang="stylus">
@import './assets/css/reset.css';

body {
  margin: 0px;
  padding: 0px;
  /* background: url(assets/bg1.jpg) center !important;
  background-size: cover; */
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
</style>
