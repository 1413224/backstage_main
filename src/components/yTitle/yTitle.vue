<template>
  <div class="tit"><slot></slot></div>
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
  color: #595961;
  font-weight: bold;
  font-size: 15px;
}
</style>