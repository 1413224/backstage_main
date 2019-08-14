<template>
  <div>
    <el-dropdown @command="handleCommandSkin" trigger="hover" class="eldropdown">
      <span class="el-dropdown-link">
        系统主题<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item,index) in skins" :key="index" :command="item.name">{{item.label}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { loadSkin } from '@/skin/index'
export default {
  name:'ySkin',
  data(){
    return {
      skins:[
        { name: 'Blue', label: '默认' },
        { name: 'Green', label: '典雅绿' },
        { name: 'Red', label: '樱桃红' },
        { name: 'Purple', label: '贵族紫' },
        { name: 'Default', label: '浅绿' }
      ]
    }
  },
  methods:{
    handleCommandSkin(command){
      loadSkin.changeTheme(command)
    }
  }
}
</script>
<style lang="less" scoped>

</style>