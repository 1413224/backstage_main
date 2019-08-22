<template>
  <div class="search">
    <el-form 
      :model="ruleForm" 
      :rules="rules" 
      ref="ruleForm" 
      label-width="110px"
      class="">
<!--  dataList.head-->
        <div class="clearfix">
          <div 
            v-for="(item,index) in headerConfigs.basic" 
            :key="index"
            class="item"
            :style="{float:item.float}">

              <el-form-item 
                v-if="item.type=='input' || item.type=='textarea'" 
                :style="{width:item.minWidth+'px'}"
                :label="item.name" 
                :prop="item.field">
                <yInput
                  v-model="ruleForm[item.field]"
                  :configs="item">
                </yInput>
              </el-form-item>

              <!-- <br v-if="item.type=='line-break'"/> -->
              <div v-if="item.type=='line-break'" style="height:65px"></div>

              <el-form-item
                v-if="item.type=='select'"
                :label="item.name"
                :prop="item.field">
                <ySelect
                  v-model="ruleForm[item.field]"
                  :options="item.options"
                  :placeholder="item.placeholder ? item.placeholder : '自定义提示'"
                  @change="bb"
                  :style="{width:item.minWidth+'px'}"
                  :configs="item">
                </ySelect>
              </el-form-item>

              <el-form-item
                v-if="item.type=='radio'"
                :label="item.name"
                :prop="item.field">
                <yRadioGroup 
                  v-model="ruleForm[item.field]"
                  :options="item.options"
                  :configs="item"
                  :style="{width:item.minWidth+'px'}"></yRadioGroup>
              </el-form-item>

              <el-form-item
                v-if="item.type=='checkbox'"
                :label="item.name"
                :prop="item.field">
                <yCheckBoxGroup 
                  v-model="ruleForm[item.field]"
                  :options="item.options"
                  :configs="item">
                </yCheckBoxGroup>
              </el-form-item>

              <el-form-item
                v-if="item.type=='inputNumber'"
                :label="item.name"
                :prop="item.field">
                <yInputNumber 
                  v-model="ruleForm[item.field]"
                  :configs="item">
                </yInputNumber>
              </el-form-item>

              <el-form-item 
                v-if="item.type=='switch'"
                :label="item.name">
                <ySwitch 
                  v-model="ruleForm[item.field]"
                  :configs="item"></ySwitch>
              </el-form-item>

              <el-form-item
                v-if="item.type=='diyAreaList'"
                :label="item.name"
                :prop="item.field">
                <yArea v-model="ruleForm[item.field]" :style="{width:item.minWidth+'px'}"></yArea>
              </el-form-item>

              <el-form-item
                v-if="item.type=='datePicker'"
                :label="item.name"
                :prop="item.field">
                <datePicker 
                  v-model="ruleForm[item.field]" 
                  :style="{width:item.minWidth+'px'}"
                  :configs="item"></datePicker>
              </el-form-item>

              <el-form-item
                v-if="item.type=='datePickerRange'"
                :label="item.name"
                :prop="item.field">
                <linkageDatePicker
                  v-model="ruleForm[item.field]" 
                  :style="{width:item.minWidth+'px'}"
                  :configs="item"></linkageDatePicker>
              </el-form-item>

              <!-- <el-form-item
                v-if="item.type=='diyDateTime'"
                :label="item.name"
                :prop="item.field">
                <dateTimePicker v-model="ruleForm[item.field]" :style="{width:item.minWidth+'px'}"></dateTimePicker>
              </el-form-item> -->

              <el-form-item
                v-if="item.type=='timePicker'"
                :label="item.name"
                :prop="item.field">
                <timePicker 
                  v-model="ruleForm[item.field]"
                  :configs="item">
                </timePicker>
              </el-form-item>
              

              <el-form-item
                v-if="item.type=='timePickerRange'"
                :label="item.name"
                :prop="item.field">
                <linkageTimePicker
                  v-model="ruleForm[item.field]"
                  :configs="item"></linkageTimePicker>
              </el-form-item>

              <el-form-item
                v-if="item.type=='ueditor'"
                :label="item.name"
                :prop="item.field">
                <yUeditor  ref="editor" v-model="ruleForm[item.field]"></yUeditor>
              </el-form-item>

              <yText 
                v-if="item.type=='text'"
                :configs="item">
              </yText>

                <yButton
                  v-if="item.type=='button'"
                  :configs="item"
                  :style="{width:item.minWidth+'px'}">
                </yButton>

              <div class="btnwrap" v-if="item.type=='search'">
                <el-button v-if="item.clearable" size="small" @click="resetForm('ruleForm')">清空</el-button>
                <el-button type="primary" size="small" @click="searchSubmit('ruleForm')">搜索</el-button>
              </div>

          </div>
        </div>
      <el-button @click="aa" class="fl">测试</el-button>
      <!-- <div class="btnwrap">
        <el-button size="small" @click="resetForm('ruleForm')">清空</el-button>
        <el-button type="primary" size="small" @click="searchSubmit('ruleForm')">搜索</el-button>
      </div> -->
    </el-form>
    <!-- <el-button @click="aa">按钮</el-button> -->
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
const linkageDatePicker = () => ({
  component:import("@/components/datePicker/linkageDatePicker")
})
const dateTimePicker = () => ({
  component:import("@/components/dateTimePicker/dateTimePicker")
})
const yInput = () => ({
  component:import("@/components/yInput/yInput")
})
const yText = () => ({
  component:import("@/components/yText/yText")
})
const yCheckBoxGroup = () => ({
  component:import("@/components/yCheckBoxGroup/yCheckBoxGroup")
})
const yInputNumber = () => ({
  component:import("@/components/yInputNumber/yInputNumber")
})
const ySwitch = () => ({
  component:import("@/components/ySwitch/ySwitch")
})
const timePicker = () => ({
  component:import("@/components/timePicker/timePicker")
})
const linkageTimePicker = () => ({
  component:import("@/components/timePicker/linkageTimePicker")
})
const yUeditor = () =>({
  component:import("@/components/yUeditor/yUeditor")
})
const yButton = () =>({
  component:import("@/components/yButton/yButton")
})
// import yUeditor from '@/components/yUeditor/yUeditor'
// import themePicker from '@/components/ThemePicker/ThemePicker'
import { mapState } from 'vuex'
import { getValid } from '@/utils/valid'
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
  computed:{
    ...mapState({
      headerConfigs: state => state.diypage.headerData,
      ruleFormData: state => state.diypage.ruleForm
    })
  },
  // watch:{
  //   'ruleForm':{
  //     deep:true,
  //     handler(val){
  //       this.$store.commit('setRuleForm',val)
  //       console.log(val)
  //     }
  //   }
  // },
  created(){
    let _this = this
    _this.headerConfigs.basic.map((item,index)=>{
      if(item.field){//剔除不需要传参的数据
        _this.$set(_this.ruleForm,item.field,item.defaultValue)
        if(item.require==true){
          _this.rules[item.field] = [
            {required:true,message:item.message,trigger: 'blur'}
          ]
        }
      }
    })
    //动态保存ruleForm数据,严格模式下打开watch监听,待处理
    _this.$store.commit('setRuleForm',_this.ruleForm)
    
    getValid(_this.rules)
  },
  methods:{
    aa(){
      console.log(this.ruleForm)
      // console.log(this.$store.state.diypage.ruleForm)
    },
    bb(val){
      console.log(val)
    },
    ...actions
  },
  components:{
    ySelect,
    yRadioGroup,
    yArea,
    datePicker,
    dateTimePicker,
    yInput,
    yText,
    yCheckBoxGroup,
    yInputNumber,
    ySwitch,
    timePicker,
    linkageTimePicker,
    linkageDatePicker,
    yUeditor,
    yButton
    // themePicker,
  }
}
</script>
<style lang="less" scoped>
.el-button--small{
  padding: 9px 20px;
}
.search /deep/ .el-form-item__content{
  // width: 60%;
}
.search{
  .btnwrap{
    padding-left: 20px;
    margin-top: 20px;
  }
  .item{
    // display: inline-block;
  }
}
</style>



