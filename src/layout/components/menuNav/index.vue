<template>
  <div class="shared-sidebar">
    <nav class="shared-first-sidebar">
      <div class="shared-team-logo">
        <div class="team-logo" style="background-image: url(&quot;https://img.yzcdn.cn/public_files/2016/05/13/8f9c442de8666f82abaf7dd71574e997.png!60x60.jpg&quot;);">
        </div>
      </div>
      <ul class="shared-first-sidebar-nav" ref="firsrMenu">
        <li 
          v-for="(item,index) in menuList" 
          :key="index" 
          :class="{active:item.path==$route.path || $route.meta.parentsLabel == item.name}"
          @mouseenter="enter(item)"
          @click="toNavMenu(item,index,$event)">
          <!-- <svg-icon :className="item.icon" icon-class="clipboard" />  -->
          <i class="iconfont" :class="item.icon"></i>
          {{item.name}}
        </li>
      </ul>
    </nav>

    <!-- 二级导航 -->
    <nav id="shared-second-sidebar" class="shared-second-sidebar" v-show="showSecondSideBar">
      <h2 class="second-sidebar-title">客户中心</h2>
      <MenuList :menuList="subMenuData" :settings="menuSetting"></MenuList>
    </nav>

    <!-- <div class="show-menu" v-show="showMenu" @mouseleave="sout">
      <MenuList :menuList="subMenuDataMove" :settings="menuSetting"></MenuList>
    </div> -->

  </div>
</template>
<script>
import menuList from '@/config/menu.js'
import MenuList from './menuList'
import { mapState } from 'vuex'
export default {
  name:'menuNav',
  data() {
    return {
      showMenu:false,
      showSecondSideBar:false,
      idx:0,
      menuSetting: {
        // backgroundColor: '#333743',
        // textColor: '#909399',
        // activeTextColor: '#909399',
        defaultOpeneds: [],
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
          name:'设置',
          icon:'clipboard',
          children:[
            {
              id:5,
              type:'submenu',
              index:'price',
              lable:'短信配置',
              children:[
                {
                  id:6,
                  type:'item',
                  index:'setInterface',
                  lable:'短信接口设置',
                  path:'/setUp/shortMessage/setInterface'
                }
              ]
            },
            {
              id:10,
              type:'submenu',
              index:'fenlei',
              lable:'分类',
              children:[
                {
                  id:11,
                  type:'item',
                  index:'tyfl',
                  lable:'通用分类',
                  path:'/setUp/classification/index'
                }
              ]
            }
          ]
        },
        {
          name:'后台工厂',
          icon:'clipboard',
          children:[
            {
              id:10,
              type:'item',
              index:'fenlei',
              lable:'分类',
              path:'/factory'
              // children:[
              //   {
              //     id:11,
              //     type:'item',
              //     index:'tyfl',
              //     lable:'通用分类',
              //     path:'/setUp/classification/index'
              //   }
              // ]
            },
            {
              id:11,
              type:'item',
              index:'moban',
              lable:'模板',
              path:'/commonlist'
            }
          ]
        }
      ],
      subMenuData:[
        
      ],
      subMenuDataMove:[],
      menuList:menuList.menu
    }
  },
  created(){
    let _this = this

    if(_this.menuList.some(_this.filter)){
      _this.showSecondSideBar = false
      _this.$emit('changeLeft',false)
    }else{
      _this.showSecondSideBar = true//等待修改
      // _this.showSecondSideBar = false//等待修改
      _this.$emit('changeLeft',true)//等待修改
      // _this.$emit('changeLeft',false)
    }

    _this.filterMenuList.map((item)=>{
      item.children.map(submenuItem=>{//设置默认展开项
        _this.menuSetting.defaultOpeneds.push(String(submenuItem.menuId))
      })
      _this.subMenuData = item.children  //刷新侧边栏数据丢失
      if(item.name == _this.$route.meta.parentsLabel){
        // _this.subMenuData = item.children
        return false
      }
    })
  },
  mounted(){
    // console.log(this.$refs)
  },
  computed:{
    ...mapState({
      // menuList:state => state.diymenu.menuList
    }),
    filterMenuList(){
      // return this.menuList.filter(item => item.children.length !== 0)
      let arr = []
      this.menuList.map((item)=>{
        if(item.children){
          arr.push(item)
        }
      })
      return arr
    }
  },
  methods:{
    filter(list){
      return list.path == this.$route.path
    },
    toNavMenu(item,index,e) {
      let _this = this
      // console.log(item)
      if(item.children){
        _this.showSecondSideBar = true
        _this.$emit('changeLeft',true)
      }else{
        _this.showSecondSideBar = false
        _this.$emit('changeLeft',false)
      }

      //后续完善默认显示第一个路由
      if(!item.children){
        _this.subMenuData = []
        _this.$router.push({
          path:item.path
        })
        return
      }
      _this.getTheFirsrtRoute(item)
      
      _this.subMenuData = item.children

    },
    enter(item){//鼠标移入
      // console.log(item)  如果有选中样式，则不加载数据
      let _this = this
      if(item.children){
        // _this.openSubMenu(item)
        _this.subMenuDataMove = item.children
        _this.showMenu = true
      }else{
        _this.showMenu = false
      }
    },
    sout(){
      this.showMenu = false
    },
    openSubMenu(item){
      // console.log(item.children[0].children[0])
      let _this = this
      item.children.map((item)=>{
        _this.menuSetting.defaultOpeneds.push(String(item.menuId))
      })
    },
    getTheFirsrtRoute(item){
      let _this = this
      if(item.children[0].menuType=="menuPage"){
        _this.$router.push({
          path:item.children[0].path
        })
      }else{
        _this.$router.push({
          path:item.children[0].children[0].path
        })
      }
    }
  },
  components:{
    MenuList
  }
}
</script>
<style lang="less" scoped>
.shared-sidebar{
  width: 120px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 11;
  // border: 1px solid #f00;
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
    // width: 74px;
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
  margin-left: 120px;
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
//移动显示导航栏
.show-menu{
  width: 130px;
  // height: 100px;
  // border: 1px solid #f00;
  box-sizing: border-box;
  position: absolute;
  top: 56px;
  left: 120px;
  bottom: 0;
  z-index: 2;
  overflow-y: scroll;
}
</style>
<style>
.el-menu{
  border-right: none;
}
</style>

