<template>
  <div class="menu-wrapper">
     <template v-if="hasOneShowingChild(item)">
      <router-link tag="span" to="">
        <el-menu-item :index="item.url">fgas</el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else :index="item.url">
      <template slot="title">
        <!-- <el-menu-item :index="item.url">{{item.name}}</el-menu-item> -->
        <span>{{item.name}}</span>
      </template>
     <sidebarItem 
        v-for="(child,index) in item.subItems"
        :key="index"
        :item="child">
      </sidebarItem>
    </el-submenu>
  </div>
</template>
<script>
export default {
  name: "sidebarItem",
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {};
  },
  created() {
    console.log(this.item);
  },
  methods: {
    hasOneShowingChild(item) {
      return false
    }
  },
  computed: {
    // hasOneShowingChild(){
    // }
  }
};
</script>
<style lang="less" scoped>
</style>

