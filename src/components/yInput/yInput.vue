<template>
  <div>
    <el-input 
      v-model="inputValue" 
      size="small"
      :type="yType"
      :placeholder="yPlaceholder ? yPlaceholder : '请输入'"
      :clearable="yClearable"
      :show-password="yShowPassword"
      :autosize="{minRows:yMinRows,maxRows:yMaxRows}"
      ></el-input>
  </div>
</template>
<script>
export default {
  name:'yInput',
  props:{
    value:[String,Number],
    configs:[Object]
  },
  data(){
    return {
      inputValue:this.value
    }
  },
  created(){
  },
  computed:{
    yPlaceholder(){
      return this.configs.placeholder
    },
    yClearable(){
      return this.configs.clearable
    },
    yType(){
      if(this.configs.type=="textarea"){
        return 'textarea'
      }else{
        return 'text'
      }
    },
    yShowPassword(){
      return this.configs.showPassword
    },
    yMinRows(){
      if(this.configs.type=='textarea'){
        return this.configs.minRows
      }
    },
    yMaxRows(){
      if(this.configs.type=='textarea'){
        return this.configs.maxRows
      }
    },
    yMaxlength(){
      if(this.configs.maxlength!=0){
        return this.configs.maxlength
      }
    },
    yMinlength(){
      return this.configs.minlength
    },
    yPrefixIcon(){
      return this.configs.prefixIcon
    },
    ySuffixIcon(){
      return this.configs.suffixIcon
    },
    yShowWordLimit(){
      return this.configs.showWordLimit
    }
  },
  watch:{
    value(val){
      // console.log(val)
      this.inputValue = val
    },
    inputValue(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>