<template>
  <div>
    <el-date-picker
      v-model="date"
      :type="showType"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      value-format="timestamp"
      :align="align"
      :picker-options="pickerOptions"
      size="small">
    </el-date-picker>
  </div>
</template>
<script>
export default {
  name:'linkageDatePicker',
  props:{
    value:[Array,String,Number],
    optionsBtn:Boolean,
    configs:[Object]
  },
  data(){
    return {
      date:this.value,
      align:'',
      pickerOptions:{},
      shortcutsDate:[
        {
          text: '最近一周',
          onClick(picker){
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近一个月',
          onClick(picker){
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近三个月',
          onClick(picker){
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }
      ],
      shortcutsMonth:[
        {
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', [new Date(), new Date()]);
          }
        },
        {
          text: '今年至今',
          onClick(picker) {
            const end = new Date();
            const start = new Date(new Date().getFullYear(), 0);
            picker.$emit('pick', [start, end]);
          }
        },
        {
          text: '最近六个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 6);
            picker.$emit('pick', [start, end]);
          }
        }
      ],
      shortcutsDateTime:[
        {

        }
      ]
    }
  },
  created(){

    let shortcuts = this.configs.shortcuts

    if(shortcuts){
      if(this.showType=="daterange" || this.showType=="datetimerange"){
        this.pickerOptions.shortcuts = this.shortcutsDate
      }
      if(this.showType=="monthrange"){
        this.pickerOptions.shortcuts = this.shortcutsMonth
      }
      this.align = 'right'
    }
  },
  computed:{
    showType(){
      return this.configs.showType
    },
    startPlaceholder(){
      return this.configs.startPlaceholder
    },
    endPlaceholder(){
      return this.configs.endPlaceholder
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
.el-range-editor--small.el-input__inner{
  width: 100%;
}
</style>
