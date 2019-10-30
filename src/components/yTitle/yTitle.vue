<template>
  <div class="d-flex a-center">
    <div class="tit"> 
      <slot></slot>    
    </div>
    <div class="desc ml-1">
      <slot name="desc"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name:'yTitle',
  props:{

  },
  data(){
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.tit{
  color: #333333FF;
  // font-weight: bold;
  font-size: 14px;
  padding-left: 8px;
}
</style>