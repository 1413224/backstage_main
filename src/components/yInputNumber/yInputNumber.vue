<template>
  <div>
    <el-input-number 
      v-model="num" 
      :min="ymin" 
      :max="ymax"
      :step="ystep"
      :step-strictly="yStepStrictly"
      :precision="yPrecision"
      size="small">
    </el-input-number>
  </div>
</template>
<script>
export default {
  name:'yInputNumber',
  props:{
    value:[String,Number],
    configs:[Object]
  },
  data(){
    return {
      num:this.value
    }
  },
  computed:{
    ymin(){ return this.configs.min },
    ymax(){ return this.configs.max },
    ystep(){ return this.configs.step },
    yStepStrictly(){ return this.configs.stepStrictly },
    yPrecision(){ return this.configs.precision }
  },
  watch:{
    value(val){
      this.num = val
    },
    num(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>