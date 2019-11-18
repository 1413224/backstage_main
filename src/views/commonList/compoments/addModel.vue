<template>
  <div class="add-wrap">
    <div class="bg-gray content">
      <el-form :model="addEditForm" :rules="addEditRules" ref="addEditForm" label-width="110px">
        <div>
          <el-row v-for="(item,index) in dataList.head" :key="index">
            <el-col :span="item.width">
              <el-form-item 
                v-if="item.type=='input'" 
                :label="item.name" 
                :prop="item.field">
                  <el-input 
                  :placeholder="item.placeholder" 
                  v-model="addEditForm[item.field]"
                  size="small">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="item.width">
              <el-form-item
                v-if="item.type=='select'"
                :label="item.name"
                :prop="item.field">
                <ySelect
                  v-model="addEditForm[item.field]"
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
                  v-model="addEditForm[item.field]"
                  :options="item.value"></yRadioGroup>
              </el-form-item>
            </el-col>
            <el-col :span="item.width">
              <el-form-item
                v-if="item.type=='diyAreaList'"
                :label="item.name"
                :prop="item.field">
                <yArea v-model="addEditForm[item.field]"></yArea>
              </el-form-item>
            </el-col>
            <el-col :span="item.width">
              <el-form-item
                v-if="item.type=='diyDate'"
                :label="item.name"
                :prop="item.field">
                <datePicker v-model="addEditForm[item.field]"></datePicker>
              </el-form-item>
            </el-col>
            <el-col :span="item.width">
              <el-form-item
                v-if="item.type=='diyDateTime'"
                :label="item.name"
                :prop="item.field">
                <dateTimePicker v-model="addEditForm[item.field]"></dateTimePicker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>

    <div class="footer-bar">
      <div class="btn-wrap">
        <el-button size="mini">取消</el-button>
        <el-button type="primary" size="mini" @click="addEditSubmit('addEditForm')">保存</el-button>
      </div>
    </div>

  </div>
</template>
<script>
const ySelect = () => ({component:import("@/components/ySelect/index"),})
const yRadioGroup = () => ({component:import("@/components/yRadioGroup/yRadioGroup")})
const yArea = () => ({component:import("@/components/cascader/yArea")})
const datePicker = () => ({component:import("@/components/datePicker/datePicker")})
const dateTimePicker = () => ({component:import("@/components/dateTimePicker/dateTimePicker")})
import dataList from '@/config/data.js'
import { getValid } from '@/utils/valid'
import actions from './actions/addModel'
export default {
  name:'addModel',
  data(){
    return {
      addEditForm:{},
      addEditRules:{},
      dataList:dataList
    }
  },
  created(){
    let _this = this
    _this.dataList.head.map((item,index)=>{
      _this.$set(_this.addEditForm,item.field,item.defaultValue)
      if(item.require==true){
        _this.addEditRules[item.field] = [
          {required:true,message:item.message,trigger: 'blur'}
        ]
      }
    })
    getValid(_this.addEditRules)
  },
  methods:{
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
.content{
  // border: 1px solid #333;
  margin-top: 30px;
  border-radius: 10px;
  padding-left: 200px;
  padding-top: 20px;
}

.footer-bar{
  width: calc(100% - 248px);
  height: 67px;
  position: fixed;
  bottom: 0;
  left: 235px;
  // right: 120px;
  background-color: #fff;
  // border: 1px solid #333;
  .btn-wrap{
    text-align: center;
    line-height: 62px;
  }
}
</style>
