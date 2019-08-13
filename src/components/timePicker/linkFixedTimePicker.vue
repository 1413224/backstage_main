<template>
  <div>
    <el-time-select
      placeholder="起始时间"
      v-model="startTime"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '18:30'
      }"
      size="small">
    </el-time-select>
    <el-time-select
      placeholder="结束时间"
      v-model="endTime"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '18:30',
        minTime: startTime
      }"
      size="small">
    </el-time-select>
  </div>
</template>
<script>
export default {
  name:'linkFixedTimePicker',
  props:{

  },
  data(){
    return{
      startTime:'',
      endTime:''
    }
  },
  watch:{
    startTime(val){
      console.log(val)
    }
  }
}
</script>