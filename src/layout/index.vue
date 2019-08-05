<template>
  <div class="app-wrapper">
    <!-- <sidebar></sidebar> -->
    <menuNav></menuNav>
    <topNav></topNav>

    <div class="app-container container">
      <div class="app">
        <div class="app-inner">
          <router-view></router-view>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
// import sidebar from './components/sidebar'
import topNav from './topNav/index'
import menuNav from './components/menuNav/index'
export default {
  name:'layout',
  components: {
    // sidebar
    menuNav,
    topNav
  },
  data() {
    return {
      
    }
  }
}
</script>
<style lang="less" scoped>
.app-container{
  margin-left: 224px;
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  // zoom: 1;
}
.container{
  background: #f2f2f2;
  padding-bottom: 50px;
  
  .app{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: auto !important;
    bottom: 0;
    height: auto;
    .app-inner{
      margin: 10px;
      padding: 15px;
      height: 100%;
      box-shadow: 0;
      background: #fff;
      .app-init-container{
        height: 100%;
      }
    }
  }
}
</style>
