<template>
  <div class="search">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
      <el-row>
        <div v-for="(item,index) in dataList.head" :key="index">
          <el-col :span="item.width">
            <el-form-item 
              v-if="item.type=='input'" 
              :label="item.name" 
              :prop="item.field">
                <el-input 
                :placeholder="item.placeholder" 
                v-model="ruleForm[item.field]">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="item.width">
            <el-form-item
              v-if="item.type=='select'"
              :label="item.name"
              :prop="item.field">
              <ySelect
                v-model="ruleForm[item.field]"
                :options="item.value"
                :placeholder="item.placeholder ? item.placeholder : '自定义提示'">
              </ySelect>
            </el-form-item>
          </el-col>
          <el-col :span="item.width">
            <el-form-item
              v-if="item.type=='radio'"
              :label="item.name"
              :prop="item.field">
              <yRadioGroup 
                v-model="ruleForm[item.field]"
                :options="item.value"></yRadioGroup>
            </el-form-item>
          </el-col>
          <el-col :span="item.width">
            <el-form-item
              v-if="item.type=='diyAreaList'"
              :label="item.name"
              :prop="item.field">
              <yArea v-model="ruleForm[item.field]"></yArea>
            </el-form-item>
          </el-col>
          <el-col :span="item.width">
            <el-form-item
              v-if="item.type=='diyDate'"
              :label="item.name"
              :prop="item.field">
              <datePicker v-model="ruleForm[item.field]"></datePicker>
            </el-form-item>
          </el-col>
          <el-col :span="item.width">
            <el-form-item
              v-if="item.type=='diyDateTime'"
              :label="item.name"
              :prop="item.field">
              <dateTimePicker v-model="ruleForm[item.field]"></dateTimePicker>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
      <el-button type="primary" size="small">搜索</el-button>
      <el-button size="small" @click="resetForm('ruleForm')">清空</el-button>
    </el-form>
    <el-button @click="aa">按钮</el-button>
  </div>
</template>
<script>
import dataList from '@/config/data.js'
const ySelect = () => ({
  component:import("@/components/ySelect/index"),
  // loading:dateTimePicker,// loading时渲染
  // error:dateTimePicker, // 出错时渲染
  // delay: 2000, // 当前组件等待时间
  // timeout: 3000 //   最长等待时间
})
const yRadioGroup = () => ({
  component:import("@/components/yRadioGroup/yRadioGroup")
})
const yArea = () => ({
  component:import("@/components/cascader/yArea")
})
const datePicker = () => ({
  component:import("@/components/datePicker/datePicker")
})
const dateTimePicker = () => ({
  component:import("@/components/dateTimePicker/dateTimePicker")
})
import actions from './actions/search'
export default {
  name:'search',
  props:{

  },
  data(){
    return {
      dataList:dataList,
      dataAll:{},
      ruleForm:{},
      rules:{}
    }
  },
  created(){
    let _this = this
    _this.dataList.head.map((item,index)=>{
      // _this.dataAll[item.field] = item.defaultValue
      _this.$set(_this.ruleForm,item.field,item.defaultValue)
      _this.rules[item.field] = [
        {required:item.require,message:item.message,trigger: 'blur'}
      ]
    })
    // _this.ruleForm = JSON.parse(JSON.stringify(_this.dataAll))
  },
  methods:{
    aa(){
      console.log(this.ruleForm)
    },
    ...actions
  },
  components:{
    ySelect,
    yRadioGroup,
    yArea,
    datePicker,
    dateTimePicker
  }
}
</script>
<style lang="less" scoped>
.el-button--small{
  padding: 9px 20px;
}
.search /deep/ .el-form-item__content{
  width: 60%;
}
</style>



