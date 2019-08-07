<template>
  <el-select v-model="yvalue" :placeholder="placeholder" @change="selChange">
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
    value:{//接受外部v-model传入的值
      type:[String,Number]
    },
    options:{
      type:Array,
      default:[]
    },
    placeholder:{
      type:String,
      default:'请选择'
    }
  },
  data(){
    return {
      yvalue:this.value
    }
  },
  created(){

  },
  methods:{
    // <input type="text" @input="message=$event.target.value" :value="message">
    // <input type="text" v-model="message">
    selChange(){
      this.$emit('change',this.yvalue)
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

</style>
