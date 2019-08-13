<template>
  <el-select 
    v-model="yvalue" 
    :placeholder="placeholder" 
    size="small"
    :clearable="yClearable"
    :filterable="yFilterable ">
    <el-option 
      v-for="(item,index) in options"
      :key="index"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
export default {
  name:'y-select',
  props:{
    value:{
      type:[String,Number]
    },
    options:{
      type:Array,
      default:[]
    },
    placeholder:{
      type:String,
      default:'请选择'
    },
    configs:[Object]
  },
  data(){
    return {
      yvalue:this.value
    }
  },
  created(){
  },
  computed:{
    yClearable(){
      return this.configs.clearable
    },
    yFilterable(){
      return this.configs.filterable
    }
  },
  methods:{
  },
  watch:{
    value(val){
      this.yvalue = val
    },
    yvalue(val,oldVal){
      if(val!==oldVal){
        this.$emit('input',val)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-select{
  // width: 100%;
}
</style>
