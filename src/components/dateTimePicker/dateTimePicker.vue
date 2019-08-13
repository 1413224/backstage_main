<template>
  <div>
    <el-date-picker
      v-model="date"
      type="datetime"
      placeholder="选择日期时间"
      value-format="timestamp"
      :align="align"
      :picker-options="pickerOptions"
      size="small">
    </el-date-picker>
  </div>
</template>
<script>
export default {
  name:'dateTimePicker',
  props:{
    value:[String,Number],
    optionsBtn:Boolean
  },
  data(){
    return {
      date:this.value,
      align:'',
      pickerOptions:{},
      shortcuts:[
        {
          text: '今天',
          onClick(picker){
            picker.$emit('pick', new Date())
          }
        },
        {
          text: '昨天',
          onClick(picker){
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        },
        {
          text: '一周前',
          onClick(picker){
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }
      ]
    }
  },
  created(){
    if(this.optionsBtn){
      this.pickerOptions.shortcuts = this.shortcuts
      this.align = 'right'
    }
  },
  watch:{
    value(val){
      this.date = val
    },
    date(val,oldVal){
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
