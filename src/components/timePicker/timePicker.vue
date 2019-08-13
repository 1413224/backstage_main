<template>
  <div>
    <el-time-select
      v-if="configs.optionsStatus==true"
      v-model="time"
      :picker-options="pickerOption"
      :placeholder="yPlaceholder"
      size="small">
      <!-- value-format="timestamp" -->
    </el-time-select>
    <el-time-picker
      v-else
      v-model="time"
      :picker-options="pickerOption"
      :placeholder="yPlaceholder"
      value-format="HH:mm:ss">
    </el-time-picker>
  </div>
</template>
<script>
export default {
  name:'timePicker',
  props:{
    value:[String,Date,Array,Number],
    configs:[Object]
  },
  data(){
    return {
      time:this.value,
      options:''
    }
  },
  computed:{
    yPlaceholder(){ return this.configs.placeholder },
    ystart(){ return this.configs.start },
    yend(){ return this.configs.end },
    ystep(){ return this.configs.step },
    pickerOption(){
      if(this.configs.optionsStatus){
        return {
          start:this.ystart,
          step:this.ystep,
          end:this.yend
        }
      }else{
        return {
          selectableRange:'00:00:00 - 23:59:59'
        }
      }
      
    }
  },
  watch:{
    value(val){
      this.time = val
    },
    time(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-date-editor.el-input{
  width: 100%;
}
</style>