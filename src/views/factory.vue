<template>
  <div style="height:100%">
    <div class="topTitle">标题</div>
    <div class="bg-gray">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
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
              <ySelect 
                v-if="item.type=='select'"
                v-model="ruleForm[item.field]" 
                :options="item.value"
                placeholder="自定义提示">
              </ySelect>
            </el-col>
          </div>
        </el-row>
      </el-form>


      <MyTable
        :configs="tabaConfigs"
        :tableData="tableData"
        :columns="columns"
        :rowDrop="rowDrop"
        @changeStatus="changeStatus"
        @edit="edit"
        @del="del"
        @detail="goDetail"
        @dropOnEnd="dropOnEnd">
      </MyTable>
      <Pagination
        :totalNums="totalNums"
        :pageSize="pageSize"
        :pageTotalNum="pageTotalNum"
        :curPage="curPage"
        @currentChange="currentChange"
        @sizeChange="sizeChange">
      </Pagination>

      <!-- <ySelect 
        v-model="selData.modelVal" 
        :options="selData.optionData"
        placeholder="自定义提示"></ySelect> -->
      
      <yArea v-model="area"></yArea>
      <el-button @click="aa">测试关联</el-button>
      <!-- <yRadioGroup v-model="radioData.modelVal" :options="radioData.optionData"></yRadioGroup>
      <yCheckBoxGroup v-model="checkBoxData.modelVal" :options="checkBoxData.optionData"></yCheckBoxGroup>
      <datePicker v-model="date" optionsBtn></datePicker>
      <linkageDatePicker v-model="linkDate"></linkageDatePicker>
      <dateTimePicker v-model="datetime"></dateTimePicker>
      <linkageDateTimePicker v-model="datetimerange" optionsBtn></linkageDateTimePicker> -->

    </div>
  </div>
</template>
<script>
// import MyTable from '@/components/table/myTable'
const MyTable = () => ({
  component:import("@/components/table/myTable"),
  // loading:dateTimePicker,// loading时渲染
  // error:dateTimePicker, // 出错时渲染
  // delay: 2000, // 当前组件等待时间
  // timeout: 3000 //   最长等待时间
})
import Pagination from '@/components/pagination/pagination'
import ySelect from '@/components/ySelect/index'
import yArea from '@/components/cascader/yArea'
import yRadioGroup from '@/components/yRadioGroup/yRadioGroup'
import yCheckBoxGroup from '@/components/yCheckBoxGroup/yCheckBoxGroup'
import datePicker from '@/components/datePicker/datePicker'
import linkageDatePicker from '@/components/datePicker/linkageDatePicker'
import dateTimePicker from '@/components/dateTimePicker/dateTimePicker'
import linkageDateTimePicker from '@/components/dateTimePicker/linkageDateTimePicker'

import dataList from '@/config/data.js'
import {getValid} from '@/utils/valid.js'
export default {
  data(){
    return {
      ceshi:{
        a : ''
      },
      rowDrop:true,
      totalNums:0,
      pageSize:10,
      pageTotalNum:1,
      curPage:1,
      tabaConfigs:{
        tableClass:'border',
        // height:200,
        canCheckBox:true,
        th:[
          {
            minWidth:'100',
            float:'left',
            label:[
              { value:'头部标题' }
            ]
          }
        ]
      },
      configs:{
        type:'selection'
      },
      columns:[
        { 
          prop: "logo", //与表格字段一致（接口字段）
          label: "标题",
          width:'180',
          logo:true
        },
        { prop: "create_name", label: "发布人" },
        { prop: "item_name", label: "栏目" },
        { prop: "create_time", label: "创建时间",width:'100',time:true},
        { prop: "weight", label: "权重" },
        { prop: "status", label: "状态",status:true,isClick:false},//isClick不填，默认可点击
        { 
          label: "操作",
          btnType:'textBtn',
          actions:[
            {label:'编辑',icon:'el-icon-edit-outline',
              type:'primary',operation:'edit',},
            {label:'删除',icon:'el-icon-delete',type:'danger',operation:'del'},
            {label:'详情',icon:'el-icon-document',type:'primary',operation:'detail'}
          ]
        },
      ],
      tableData:[
        
      ],
      selData:{
        modelVal:null,
        optionData:[
          {value:1,label:'黄金糕'},
          {value:2,label:'双皮奶'},
        ]
      },
      area:[],
      radioData:{
        modelVal:2,
        optionData:[
          {value:1,label:'黄金糕'},
          {value:2,label:'双皮奶',disabled:true},
        ]
      },
      checkBoxData:{
        modelVal:[2,3],
        optionData:[
          {value:1,label:'双皮奶',disabled:true},
          {value:2,label:'黄金糕'},
          {value:3,label:'黄金糕'},
          {value:4,label:'双皮奶'},
        ]
      },
      date:this.$utils.getTimestamp(),
      linkDate:[1565193600000,1565280000000 ],
      datetime:'',
      datetimerange:[1565719322000,1565884800000 ],

      ruleForm:{
         
      },
      rules:{
        
      },
      dataList:dataList,
      dataAll:{}
    }
  },
  created(){
    let _this = this
    this.getList()

    _this.dataList.head.map((item,index)=>{

      // _this.dataAll[item.field] = item.defaultValue
      _this.$set(_this.ruleForm,item.field,item.defaultValue)

      _this.rules[item.field] = [
        {required:item.require,message:item.message,trigger: 'blur'}
      ]
    })
    
    // _this.ruleForm = JSON.parse(JSON.stringify(_this.dataAll))


    //自定义公共验证
    getValid(_this.rules)
    //   for(let i in _this.rules){
    //   if(i=="keyword"){
    //     _this.rules[i].push({validator:function(rule, value, callback){
    //       if(_this.$utils.testPhone(value)){
    //         callback(new Error('手机号不正确'))
    //       }else{
    //         callback()
    //       }
    //     }})
    //   }
    // }
  },
  methods:{
    
    getList(){
      let _this = this
      _this.$http.get('http://api.9yetech.com/apigw/plugin/projectManage/Issue/GetList',{
        params:{
          token:_this.$utils.getToken(),
          page_num:_this.curPage,
          page_size:_this.pageSize,
          status:-1
        }
      }).then((res)=>{
        if(res.data.ret==200){
          // console.log(res)
          _this.tableData = res.data.data.list
          _this.totalNums = Number(res.data.data.total_nums)
          _this.pageTotalNum = Number(res.data.data.total_pages)
        }
      })
    },
    currentChange(currentVal){
      this.curPage = currentVal
      this.getList()
    },
    sizeChange(sizeVal){
      this.pageSize = sizeVal
      this.curPage = 1
      this.getList()
    },
    changeStatus(status,id){
      console.log(status)
      console.log(id)
    },
    edit(id,row){
      console.log(row)
      console.log(id)
    },
    del(id,row){
      console.log(row)
      console.log(id)
    },
    goDetail(id,row){
      console.log(row)
      console.log(id)
    },
    dropOnEnd(ids){
      console.log(ids)
    },
    aa(e,$event){
      // console.log(e)
      // this.ruleForm[e] = $event
      // this.ceshi.a = $event
      // return 'ruleForm.'+ e
      console.log(this.ruleForm)
    }
  },
  components:{
    // MyTable:() => import('@/components/table/myTable'),
    MyTable,
    Pagination,
    ySelect,
    yArea,
    yRadioGroup,
    yCheckBoxGroup,
    datePicker,
    linkageDatePicker,
    dateTimePicker,
    linkageDateTimePicker
  }
}
</script>
<style lang="less" scoped>
.topTitle{
  line-height: 26px;
  margin-bottom: 20px;
  color: #595961;
  font-weight: 700;
  font-size: 14px;
}
.bg-gray{
  padding: 10px;
}
</style>

