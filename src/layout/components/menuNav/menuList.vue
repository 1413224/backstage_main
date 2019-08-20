<template>
  <!-- <div>
		<el-menu
      default-active="2"
      class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
					<el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      
    </el-menu>
	</div> -->
  <div>
    <!-- :router="settings.router" -->
    <!-- :default-active="activeMenu" -->
    <el-menu
      :background-color="settings.backgroundColor"
      :defaultOpeneds="settings.defaultOpeneds"
      :default-active="activeMenu">
      <template v-for="menuItem in menuList">
        <template v-if="menuItem.menuType === 'menuPage'">
          <menu-item :menu="menuItem" :key="menuItem.menuId"></menu-item>
        </template>

        <template v-if="menuItem.menuType === 'menuLabel'">
          <sub-menu :menu="menuItem" :key="menuItem.menuId"></sub-menu>
        </template>

        <template v-if="menuItem.menuType === 'group'">
          <menu-group :menu="menuItem" :key="menuItem.menuId"></menu-group>
        </template>

      </template>
    </el-menu>
  </div>
</template>
<script>
import menuItem from './menuItem'
import menuGroup from './menuGroup'
import subMenu from './subMenu'
export default {
  name:"menuList",
  props:{
    menuList:{
      type:Array,
    },
    settings:{
      type:Object
    }
  },
  components:{
    menuItem,
    menuGroup,
    subMenu
  },
  created(){
    // console.log(this.$route)
    // console.log(this.menuList)
  },
  computed:{
    activeMenu() {
      // console.log(this.$route)
      let  route = this.$route
      let { path } = route
      return path
      // return '/' + this.$route.path.split('/').reverse()[0]
    }
  },
  data(){
    return {

    }
  }
}
</script>

