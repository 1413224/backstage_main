<template>
  <div class="app-wrapper">
    <!-- <sidebar></sidebar> -->
    <menuNav></menuNav>
    <div class="app-container container">
      <div class="zent-breadcrumb">
        <span>移动店铺</span>
      </div>

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
import menuNav from './components/menuNav/index'
export default {
  name:'layout',
  components: {
    // sidebar
    menuNav
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
  .zent-breadcrumb{
    position: relative;
    height: 56px;
    min-width: 750px;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    padding: 0 100px 0 5px;
    
    padding: 21px;
    font-size: 14px;
  }
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
