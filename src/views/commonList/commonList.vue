<template>
  <div class="wrapper">
    <div class="head">头部标题</div>
    <div class="bg-gray content">
      <div class="search-wrap">
        <search></search>
      </div>
    </div>
  </div>
</template>
<script>
import search from './compoments/search'
export default {
  name:'commonList',
  data(){
    return {

    }
  },
  created(){

  },
  methods:{

  },
  components:{
    search
  }
}
</script>
<style lang="less" scoped>
.content{
  padding: 10px;
  margin-top: 30px;
  .search-wrap{
    background: #fff;
    padding: 10px;
  }
}
</style>

