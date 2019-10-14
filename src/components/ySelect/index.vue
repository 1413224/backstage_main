<template>
  <el-select 
    v-model="yvalue" 
    :placeholder="placeholder" 
    size="small"
    :clearable="yClearable"
    :filterable="yFilterable"
    @change="changeSel"
    :disabled="configs.disabled"
    :multiple="configs.multiple">
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
      type:[String,Number,Array]
    },
    options:{
      type:Array,
      default:[]
    },
    placeholder:{
      type:String,
      default:'请选择'
    },
    configs:{
      type:[Object],
      default:function(){
        return {}
      }
    }
  },
  data(){
    return {
      yvalue:this.value
    }
  },
  created(){
    // console.log(this.options)
  },
  computed:{
    yClearable(){
      if(this.configs.clearable){
        return this.configs.clearable
      }
    },
    yFilterable(){
      if(this.configs.filterable){
        return this.configs.filterable
      }
    },
    
  },
  methods:{
    changeSel(){
      this.$emit('changeSel',this.yvalue)
    }
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
