<template>
  <div>
    <el-radio-group v-model="radio">
      <template v-if="showStyle=='baisc' || showStyle=='border' || !showStyle">
        <el-radio
          v-for="(item,index) in options" 
          :key="index" 
          :label="item.value"
          :border="showStyle=='border'">{{item.label}}
        </el-radio>
      </template>
      <template v-if="showStyle=='button'">
        <el-radio-button
          v-for="(item,index) in options" 
          :key="index" 
          :label="item.value"
          :disabled="item.disabled">{{item.label}}
        </el-radio-button>
      </template>
      
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name:'yRadioGroup',
  // model:{
  //   prop:'radio',
  //   event:'input'
  // },
  props:{
    value:{
      type:[String,Number]
    },
    options:{
      type:Array,
      default:[]
    },
    configs:[Object]
  },
  data(){
    return {
      radio:this.value
    }
  },
  computed:{
    showStyle(){
      switch(this.configs.showStyle){
        case 'baisc':
          return 'baisc'
          break;
        case 'button':
          return 'button'
          break;
        case 'border':
          return 'border'
          break
      }
    }
  },
  watch:{
    value(val){
      this.radio = val
    },
    radio(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-radio-group{
  width: 100%;
}
</style>

