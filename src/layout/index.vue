<template>
  <div class="app-wrapper">
    <!-- <sidebar></sidebar> -->
    <menuNav></menuNav>
    <div class="app-container container">
      <topNav></topNav>
      <div class="app">
        <div class="app-inner">
          <div class="app-init-container">
            <router-view></router-view>
          </div>
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
}
.container{
  background: #f2f2f2;
  padding-bottom: 50px;
  
  .app{
    .app-inner{
      margin: 10px;
      padding: 15px;
      min-height: 500px;
      box-shadow: 0;
      background: #fff;
    }
  }
}
</style>
