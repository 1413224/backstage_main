<template>
  <div>
    <el-date-picker
      v-model="date"
      :type="showType"
      :placeholder="yPlaceholder"
      :format="showType == 'week' ? 'yyyy-WW':''"
      :value-format="format"
      :picker-options="pickerOptions"
      :align="align"
      size="small">
    </el-date-picker>
  </div>
</template>
<script>
export default {
  name:'datePicker',
  props:{
    value:[String,Number,Date,Function,Array,Object],
    optionsBtn:Boolean,
    configs:[Object]
  },
  data(){
    return {
      date:this.value,
      align:'',
      pickerOptions:{
      },
      shortcutsDate:[
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
    let shortcuts = this.configs.shortcuts
    let showType = this.configs.showType
    if(shortcuts){
      if(showType=='date'){
        this.pickerOptions.shortcuts = this.shortcutsDate
      }

      this.align = 'right'
    }
  },
  computed:{
    showType(){
      return this.configs.showType
    },
    yPlaceholder(){
      return this.configs.placeholder
    },
    format(){
      let showType = this.configs.showType
      switch(showType){
        case 'week':
          return ''
          break;
        default:
          return 'timestamp'
      }
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
