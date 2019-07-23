<template>
  <div class="shared-sidebar">
    <nav class="shared-first-sidebar">
      <div class="shared-team-logo">
        <div class="team-logo" style="background-image: url(&quot;https://img.yzcdn.cn/public_files/2016/05/13/8f9c442de8666f82abaf7dd71574e997.png!60x60.jpg&quot;);">
        </div>
      </div>
      <ul class="shared-first-sidebar-nav">
        <li 
          v-for="(item,index) in list" 
          :key="index" 
          :class="{active:item.name==$route.meta.parentsLabel}"
          @click="toNavMenu(item,index,$event)">
          <svg-icon :className="item.icon" icon-class="clipboard" /> 
          {{item.name}}
        </li>
        <!-- <router-link tag="li" to="">sdfgsa</router-link> -->
      </ul>
    </nav>

    <!-- 二级导航 -->
    <nav id="shared-second-sidebar" class="shared-second-sidebar">
      <h2 class="second-sidebar-title">客户中心</h2>
      <MenuList :menuList="subMenuData" :settings="menuSetting"></MenuList>
    </nav>

  </div>
</template>
<script>
import MenuList from './menuList'
export default {
  name:'menuNav',
  data() {
    return {
      idx:0,
      menuSetting: {
        // backgroundColor: '#333743',
        // textColor: '#909399',
        // activeTextColor: '#909399',
        defaultOpeneds: ['news'],
        // uniqueOpened: true,
        // router: true,
        // collapseTransition: true
      },
      list:[
        {
          name:'概况',
          icon:'clipboard',
          children:[],
          path:'/dashboard/index'
        },
        {
          name:'店铺',
          icon:'dashboard',
          subtitle:'店铺管理tit',
          url:'',
          children:[
            {
              id:1,
              type:'item',
              lable:'首页2',
              index:'home',
              path:'/test1'
            },
            {
              id:2,
              type:'submenu',
              lable: '店铺',
              index: 'news',
              children:[
                {
                  id: 3,
                  type: 'item',
                  index: 'addNews',
                  lable: '店铺列表1',
                  path:'/test2',
                },
                {
                  id: 4,
                  type: 'item',
                  index: 'newsList',
                  lable: '店铺列表2',
                  path:'/test3',
                }
              ]
            },
            {
              id:8,
              type:'submenu',
              lable:'小程序店铺',
              index:'xcx',//控制展开
              children:[
                {
                  id:9,
                  type:'item',
                  index:'xcx',
                  lable:'店铺列表3',
                  path:'/dddd'
                }
              ]
            }
          ]
        },
        {
          name:'资金',
          icon:'clipboard',
          children:[
            {
              id:5,
              type:'submenu',
              index:'price',
              lable:'资金列表',
              children:[
                {
                  id:6,
                  type:'item',
                  index:'priceList',
                  lable:'我的资金',
                  path:'/test1'
                }
              ]
            }
          ]
        }
      ],
      subMenuData:[
        
      ]
    }
  },
  created(){
    // console.log(this.filterMenuList)
    let _this = this
    _this.filterMenuList.map((item)=>{
      // console.log(item)
      item.children.map(submenuItem=>{//设置默认展开项
        _this.menuSetting.defaultOpeneds.push(submenuItem.index)
      })
      if(item.name == _this.$route.meta.parentsLabel){
        _this.subMenuData = item.children
        return false
      }
    })
  },
  computed:{
    filterMenuList(){
      return this.list.filter(item => item.children.length !== 0)
    }
  },
  methods:{
    toNavMenu(item,index,e) {
      // console.log(this.$route)
      this.idx = index
      console.log(e.target.innerText)
      
      //后续完善默认显示第一个路由
      if(!item.children){
        this.$router.push({
          path:item.path
        })
      }
      this.subMenuData = item.children
    }
  },
  components:{
    MenuList
  }
}
</script>
<style lang="less" scoped>
.shared-sidebar{
  width: 92px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 11;
  // border: 1px solid #333;
  background: #273543;
}
.shared-first-sidebar{
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
    &.active{
      background: #38f;
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
  overflow: hidden;
  .second-sidebar-title{
    width: 100%;
    height: 56px;
    box-sizing: border-box;
    border-bottom: 1px solid #ebedf0;
    font-size: 14px;
    color: #323233;
    font-weight: 500;
    line-height: 56px;
    text-align: center;
  }
}
</style>
<style>
.el-menu{
  border-right: none;
}
</style>

