<template>
  <div>
    <el-switch
      v-model="yvalue"
      :active-text="yActiveText"
      :inactive-text="yInactiveText">
    </el-switch>
  </div>
</template>
<script>
export default {
  name:'ySwitch',
  props:{
    value:[Boolean,String,Number],
    configs:[Object]
  },
  data(){
    return {
      yvalue:this.value
    }
  },
  computed:{
    yActiveText(){ return this.configs.activeText},
    yInactiveText(){ return this.configs.inactiveText}
  },
  watch:{
    value(val){
      this.yvalue = val
    },
    yvalue(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    }
  }
}
</script>