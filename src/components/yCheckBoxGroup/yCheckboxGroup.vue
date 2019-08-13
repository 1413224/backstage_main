<template>
  <div>
    <el-checkbox 
    v-if="yIndeterminate"
    :indeterminate="Indeterminate" 
    v-model="checkAll" 
    @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group 
      v-model="checkList"
      :min="ymin"
      :max="ymax"
      @change="handleCheckedCitiesChange">
      <template v-if="showStyle=='baisc' || showStyle=='border' || !showStyle">
        <el-checkbox 
          v-for="(item,index) in options" 
          :key="index" 
          :label="item.value" 
          :disabled="item.disabled"
          :border="showStyle=='border'">{{item.label}}
        </el-checkbox>
      </template>
      <template v-if="showStyle=='button'">
        <el-checkbox-button 
          v-for="(item,index) in options" 
          :key="index" 
          :label="item.value" 
          :disabled="item.disabled">{{item.label}}
        </el-checkbox-button>
      </template>
      
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  name:'yCheckBoxGroup',
  props:{
    value:{
      type:Array
    },
    options:{
      type:Array,
      default:[]
    },
    configs:[Object]
  },
  data(){
    return {
      checkList:this.value,
      checkAll:false,
      Indeterminate:''
    }
  },
  methods:{
    handleCheckAllChange(val){
      let _this = this
      if(val){
        _this.options.map((item,index)=>{
          _this.checkList.push(item.value)
        })
      }else{
        _this.checkList = []
      }
      this.Indeterminate = false
    },
    handleCheckedCitiesChange(val){
      let checkedCount = val.length
      this.checkAll = checkedCount === this.options.length
      this.Indeterminate = checkedCount > 0 && checkedCount < this.options.length
    }
  },
  computed:{
    ymin(){
      return this.configs.min
    },
    ymax(){
      return this.configs.max
    },
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
    },
    yIndeterminate(){
      return this.configs.indeterminate
    }
  },
  watch:{
    value(val){
      this.checkList = val
    },
    checkList(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
