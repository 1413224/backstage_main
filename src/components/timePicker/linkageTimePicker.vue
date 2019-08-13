<template>
  <div>
    <template v-if="configs.optionsStatus==true">
      <el-time-select
        :placeholder="startPlaceholde"
        v-model="startTime"
        :picker-options="startpickerOption"
        size="small"
        value-format="HH:mm:ss">
      </el-time-select>
      <el-time-select
        :placeholder="endPlaceholder"
        v-model="endTime"
        :picker-options="endpickerOption"
        size="small"
        value-format="HH:mm:ss">
      </el-time-select>
    </template>


    <el-time-picker v-else
      is-range
      v-model="time"
      range-separator="至"
      :start-placeholder="startPlaceholde"
      :end-placeholder="endPlaceholder"
      size="small"
      value-format="HH:mm:ss">
    </el-time-picker>
  </div>
</template>
<script>
export default {
  name:'linkageTimePicker',
  props:{
    value:[String,Date,Array,Number],
    configs:[Object]
  },
  data(){
    return {
      time:this.value,
      startTime:this.value[0],
      endTime:this.value[1]
    }
  },
  computed:{
    startPlaceholde(){
      return this.configs.startPlaceholde
    },
    endPlaceholder(){
      return this.configs.endPlaceholder
    },
    fixedRangeTime(){
      return [this.startTime,this.endTime]
    },
    yStartStart(){
      return this.configs.startStart
    },
    yStartStep(){
      return this.configs.startStep
    },
    yStartEnd(){
      return this.configs.startEnd
    },
    yEndStart(){
      return this.configs.endStart
    },
    yEndStep(){
      return this.configs.endStep
    },
    yEndEnd(){
      return this.configs.yEndEnd
    },
    startpickerOption(){
      if(this.configs.optionsStatus){
        return {
          start:this.yStartStart,
          step:this.yStartStep,
          end:this.yStartEnd
        }
      }
    },
    endpickerOption(){
      if(this.configs.optionsStatus){
        return {
          start:this.yEndStart,
          step:this.yEndStep,
          end:this.yEndEnd,
          minTime: this.startTime
        }
      }
    }
  },
  watch:{
    value(val){
      if(!this.configs.optionsStatus==true){
        this.time = val
      }else{
        this.startTime = val[0]
        this.endTime = val[1]
      }
    },
    time(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    },
    startTime(val){
      // console.log(val)
    },
    endTime(val){
      // console.log(val)
    },
    fixedRangeTime(val){
      this.$emit('input',val)
    }

  }
}
</script>