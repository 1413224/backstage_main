<template>
  <div>
    <el-link 
      v-if="configs.url" 
      :underline="false" 
      :style="styObject"
      :href="yHref"
      :target="yBlank ? '_blank' : ''">主要链接</el-link>

    <div class="text" v-else :style="styObject">{{configs.value}}</div>
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
        fontWeight:this.configs.fontWeight
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