<template>
  <div class="app-wrapper">
    <!-- <sidebar></sidebar> -->
    <menuNav @changeLeft="changeLeft"></menuNav>
    <topNav></topNav>

    <div class="app-container container" :class="{paved:pavreLeft}">
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
      pavreLeft:false
    }
  },
  methods:{
    changeLeft(val){
      console.log(val)
      if(val){
        this.pavreLeft = false
      }else{
        this.pavreLeft = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.app-container{
  margin-left: 252px;
  position: absolute;
  top: 56px;
  bottom: 0;
  left: 0;
  right: 0;
  // zoom: 1;
}
.paved{
  margin-left: 120px;
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
      min-height: 100%;
      box-shadow: 0;
      background: #fff;
      // overflow: auto;
      .app-init-container{
        height: 100%;
      }
    }
  }
}
</style>
