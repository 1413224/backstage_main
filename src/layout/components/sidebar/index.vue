<template>
  <div id="shared-sidebar">
    <nav id="shared-first-sidebar">
      <div class="shared-team-logo">
        <div class="team-logo" style="background-image: url(&quot;https://img.yzcdn.cn/public_files/2016/05/13/8f9c442de8666f82abaf7dd71574e997.png!60x60.jpg&quot;);">
        </div>
      </div>

      <ul class="shared-first-sidebar-nav">
        <li><svg-icon className="icon" icon-class="clipboard" /> dsfs</li>
        <router-link tag="li" to="">sdfgsa</router-link>
      </ul>

    </nav>
    <!-- 二级导航 -->
    <nav id="shared-second-sidebar" class="shared-second-sidebar">
      <h2 class="second-sidebar-title">后台工厂</h2>
      <el-menu>
        <sidebar-item 
          v-for="(route,index) in submenu.subItems" 
          :key="index"
          :item="route">
        </sidebar-item>
      </el-menu>
    </nav>
  </div>
</template>
<script>
import sidebarItem from './sidebarItem'
export default {
  data() {
    return {
      list:[
        {
          name:'概况',
          icon:'',
          subItems:[],
          url:'/dashboard/index'
        },
        {
          name:'店铺',
          subItems:[
            {
              category:'店铺管理',
              subItems:[
                {
                  name:'移动店铺',
                  url:'/showcase/shop/dashboard/index'
                },
                {
                  name:'小程序店铺',
                  url:'/showcase/weapp/nav/index'
                }
              ]
            }
          ],
          subtitle:'店铺管理tit',
          url:''
        },

      ]
    }
  },
  computed:{
    submenu(){
      return this.list.filter(item => item.subItems.length != 0)[0]
      
    }
  },
  created(){
      // console.log(this.submenu)

  },
  methods:{
    
  },
  components:{
    sidebarItem
  }
}
</script>
<style lang="less" scoped>
#shared-sidebar{
  width: 92px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 11;
  // border: 1px solid #333;
  background: #273543;
}
#shared-first-sidebar{
  background-color: #273543;
}
.shared-team-logo{
  width: 92px;
  height: 56px;
  padding-top: 12px;
  .team-logo{
    margin:0 auto;
    width: 32px;
    height: 32px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background-size: cover;
    background-position: 50% 50%;
    background-color: #fff;
    border: 1px solid #fff;
  }
}
.shared-first-sidebar-nav{
  li{
    width: 74px;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    padding-left: 18px;
    cursor: pointer;
    &:hover{
      background: #434e6c;
    }
  }
}
// 二级导航
.shared-second-sidebar{
  width: 132px;
  height: 100%;
  margin-left: 92px;
  background: #fff;
  border-right: 1px solid #ebedf0;
  z-index: 1;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  .second-sidebar-title{
    width: 100%;
    height: 56px;
    border-bottom: 1px solid #ebedf0;
    font-size: 14px;
    color: #323233;
    font-weight: 500;
    line-height: 56px;
    text-align: center;
  }
}

</style>
