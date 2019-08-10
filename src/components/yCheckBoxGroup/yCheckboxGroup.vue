<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox 
        v-for="(item,index) in options" 
        :key="index" 
        :label="item.value" 
        :disabled="item.disabled">{{item.label}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  name:'yCheckBoxGroup',
  props:{
    value:{
      type:Array
    },
    options:{
      type:Array,
      default:[]
    }
  },
  data(){
    return {
      checkList:this.value
    }
  },
  methods:{

  },
  watch:{
    value(val){
      this.checkList = val
    },
    checkList(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
