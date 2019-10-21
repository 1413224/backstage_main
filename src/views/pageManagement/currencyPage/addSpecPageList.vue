<template>
  <div class="bg-white py-2 px-1 rounded wrap box-shadow-page">
    <yTitle>页面列表</yTitle>
    <div class="content bg-gray mt-2 p-1 rounded">
      <div class="bg-white rounded mb-2 p-2">
        <p style="font-size:14px;color:#333;font-weight:bold;">{{specName}}页面</p>
        <p style="font-size:12px;color:#686A73;" class="mt-1 d-flex">
          <span style="font-size:12px;">适用场景：</span>
          <el-breadcrumb separator="/" class="bread">
            <el-breadcrumb-item 
              v-for="(item,index) in specRoleList"
              :key="index">{{item.role_type_name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </p>
      </div>
      <div class="search rounded bg-white pt-2 p-1">
        <el-form
          :model="searchForm" 
          :rules="searchRules" 
          ref="searchForm" 
          label-width="110px"
          class=" border-bottom">
          <el-row>
            <el-col :span="6">
              <el-form-item label="页面类型：" prop="type">
                <ySelect
                  v-model="searchForm.type" 
                  :options="typeOptions" placeholder="请选择页面类型"></ySelect>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="关键字：" prop="keyword">
                <el-input size="small" v-model="searchForm.keyword" placeholder="请输入页面关键字"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="状态" prop="status">
                <ySelect
                  v-model="searchForm.status" 
                  :options="statusOptions"></ySelect>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="pl-3 pt">
              <el-button type="primary" size="mini" @click="searchSubmit('searchForm')">搜索</el-button>
              <el-button size="mini" @click="resetForm('searchForm')">清空</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-row class="mt-2 pb-2">
          <el-col :span="20">
            <div class="btn-wrap">
              <el-button style="margin-left:20px;" @click="addPage()" type="primary" size="mini">新增页面</el-button>
              <el-button @click="delPage()" plain size="mini">批量删除</el-button>
            </div>
          </el-col>
        </el-row>
      </div>

      <numberTips>
        <div class="items d-flex a-center mr-5">
          <span class="tit">符合条件的页面总数：</span>
          <span class="num">{{totalNums}}</span>
        </div>
      </numberTips>

      <div class="table-wrap mt-1 rounded">
        <el-table
          :data="tableData"
          stripe
          @selection-change="selectionChange"
          @sort-change="sortChange"
          :default-sort = "{prop: 'update_time', order: 'descending'}"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="页面名称">
          </el-table-column>
          <el-table-column
            prop="type"
            label="页面类型">
          </el-table-column>
          <el-table-column
            prop="path"
            label="页面路径">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <div>
                <el-button v-if="scope.row.status==1" 
                  class="status" type="success" plain size="small"
                  @click="changeStatus(Number(scope.row.status),scope.row.id)">显示</el-button>
                <el-button v-if="scope.row.status==0" 
                  class="status" plain size="small"
                  @click="changeStatus(Number(scope.row.status),scope.row.id)">隐藏</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="更新时间"
            sortable="custom"
            prop="update_time"
            :sort-orders="['ascending', 'descending']">
            <template slot-scope="scope">
              <div>{{scope.row.update_time|formatDate}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="editManage(scope.row.id,scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="delManage(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination
      ref="paging" 
      class="pagination mt-1"
      @size-change="handleSize"
      @current-change="handleCurrent"
      :current-page="curPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNums">
    </el-pagination>
  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'
import numberTips from '@/components/numberTips/numberTips'
export default {
  data(){
    return {
      specName:'待修改',
      specRoleList:[
        {role_type_name:'待修改'}
      ],
      searchForm:{
        type:'-1',
        keyword:'',
        status:'-1'
      },
      searchRules:{

      },
      typeOptions:[
        {label:'全部',value:'-1'}
      ],
      statusOptions:[
        { label:'全部',value:'-1' },
        { label:'显示',value:'1' },
        { label:'隐藏',value:'0' },
      ],
      tableData:[],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
      selection:[],
    }
  },
  methods:{
    searchSubmit(){
      this.getList()
    },
    resetForm(formName){
      this.$refs[formName].resetFields()
    },
    selectionChange(selection){
      this.selection = selection
    },
    sortChange(column){
      // console.log(column)
      let _this = this
      if(column.order=='descending'){
        _this.getList(null,2)
      }
      if(column.order=='ascending'){
        _this.getList(null,1)
      }
    },
    handleSize(sizeVal){
      this.pageSize = sizeVal
      this.curPage = 1
      this.getList()
    },
    handleCurrent(currentVal){
      this.curPage = currentVal
      this.getList()
    },
    addPage(){
      this.$router.push({
        path:'/pageManagement/currencyPage/addSpecPage'
      })
    },
    getList(){

    }
  },
  components:{
    ySelect,
    numberTips
  }
}
</script>
<style lang="less" scoped>
.pagination{
  text-align: right;
}
</style>