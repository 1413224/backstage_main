<template>
  <div>
    <el-cascader
      :options="options"
      v-model="selectedOptions"
      @change="handleChange"></el-cascader>
  </div>
</template>
<script>
export default {
  name:'yArea',
  props:{

  },
  data(){
    return {

    }
  },
  created(){

  },
  mounted(){

  },
  methods:{
    handleChange(value){
      console.log(value)
    }
  }
}
</script>
