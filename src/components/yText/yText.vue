<template>
  <div>
    <el-link 
      v-if="configs.url" 
      :underline="false" 
      :style="styObject"
      :href="yHref"
      :target="yBlank ? '_blank' : ''"><slot></slot></el-link>

    <div class="text" v-else :style="styObject"><slot></slot></div>
  </div>
</template>
<script>
export default {
  name:'yText',
  props:{
    configs:[Object]
  },
  data(){
    return {
      styObject:{
        width:this.configs.width,
        color:this.configs.color,
        fontWeight:this.configs.fontWeight,
        float:this.configs.float
      }
    }
  },
  computed:{
    yHref(){
      return this.configs.url
    },
    yBlank(){
      return this.configs.isBlank
    }
  }
}
</script>
<style lang="less" scoped>

</style>