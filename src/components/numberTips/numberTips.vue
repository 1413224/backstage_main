<template>
  <div class="num-wrap mt-1 rounded p-2 d-flex">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.num-wrap{
  border: 1px solid rgba(145,212,255,1);
  background: rgba(237,244,255,1);
  .items{
    .tit{
      color: #333333;
      font-size: 12px;
    }
    .num{
      font-size: 16px;
      color: #3699FF;
      font-weight: bold;
    }
  }
}
</style>