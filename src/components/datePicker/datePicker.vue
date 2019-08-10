<template>
  <div>
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="选择日期"
      value-format="timestamp"
      :picker-options="pickerOptions"
      :align="align">
    </el-date-picker>
  </div>
</template>
<script>
export default {
  name:'datePicker',
  props:{
    value:[String,Number,Function],
    optionsBtn:Boolean
  },
  data(){
    return {
      date:this.value,
      align:'',
      pickerOptions:{
        // disabledDate(time) {
        //   return time.getTime() > Date.now();
        // }
      },
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
            picker.$emit('pick', date);
          }
        },
        {
          text: '一周前',
          onClick(picker) {
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
