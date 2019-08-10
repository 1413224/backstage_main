<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio 
        v-for="(item,index) in options" 
        :key="index" 
        :label="item.value"
        :disabled="item.disabled">{{item.label}}</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name:'yRadioGroup',
  // model:{
  //   prop:'radio',
  //   event:'input'
  // },
  props:{
    value:{
      type:[String,Number]
    },
    options:{
      type:Array,
      default:[]
    }
  },
  data(){
    return {
      radio:this.value
    }
  },
  watch:{
    value(val){
      this.radio = val
    },
    radio(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

