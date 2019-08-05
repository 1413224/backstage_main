<template>
  <div class="wrapper">
    <div class="wrap-cont">
      <div class="head title-text-color">通用分类库</div>
      <div class="bg-gray content">
        <div class="bg-white single-category_container box-shadow">
          <categoryList></categoryList>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import categoryList from './compoments/category'
export default {
  data() {
    return {
      isActive:true,
    }
  },
  components:{
    categoryList
  },
  created(){

  },
  methods:{

  }
}
</script>
<style lang="less" scoped>
@import url('./styles/index.less');
</style>
