<template>
  <div class="img-wrap" :style="{float:yFloat}">
    <el-image
      :style="{width:minWidth,height: minHeight}"
      :src="ySrc"
      :fit="yFill"
      :preview-src-list="previewSrcList ? srcList :false">
      <div slot="error" class="image-slot">
        <svg-icon class="err-svg" icon-class="error-img" />
      </div>
    </el-image>
  </div>
</template>
<script>
export default {
  name:'yImage',
  props:{
    configs:[Object]
  },
  data(){
    return {

    }
  },
  computed:{
    minWidth(){ return this.configs.minWidth+'px' },
    minHeight(){ return this.configs.minHeight+'px' },
    yFill(){ return this.configs.fit },
    ySrc(){ return this.configs.src },
    errorSrc(){ return this.configs.errorSrc },
    yFloat(){ return this.configs.float },
    previewSrcList(){ return this.configs.previewSrcList },
    srcList(){return [this.configs.src] }
  }
}
</script>
<style lang="less" scoped>
.err-svg{
  width: 100%;
  height: 100%;
}
</style>
<style lang="less">
.image-slot{
  width: 100% !important;
  height: 100% !important;
}
</style>