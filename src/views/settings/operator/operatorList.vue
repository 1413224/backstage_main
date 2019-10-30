<template>
  <div class="content rounded box-shadow-page px-1 py-2 bg-white">
    <yTitle>操作员管理</yTitle>
    <div class=" bg-gray rounded p-1 mt-2">
      <div class="search bg-white rounded pt-2 px-1">
        <el-form
          :model="searchForm" 
          :rules="searchRules" 
          ref="searchForm" 
          label-width="100px"
          class="border-bottom d-flex">
          <div class="input">
            <el-form-item label="关键字" prop="keyword">
              <el-input size="small" v-model="searchForm.keyword" placeholder="账户名/姓名/手机号"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="所属角色" prop="roleType">
              <ySelect
                v-model="searchForm.roleType" 
                :options="options"></ySelect>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="状态" prop="status">
              <ySelect
                v-model="searchForm.status" 
                :options="statusOptions" placeholder="请选择账户状态"></ySelect>
            </el-form-item>
          </div>
          <div class="pl-5 pt">
            <el-button class="search-btn" type="primary" size="mini" @click="searchSubmit('searchForm')">搜索</el-button>
            <el-button class="search-btn" size="mini" @click="resetForm('searchForm')">清空</el-button>
          </div>
        </el-form>
        <el-row>
          <div class="btn-wrap my-2">
            <el-button style="margin-left:20px;" @click="addOperator()" type="primary" size="mini">新增操作员</el-button>
            <el-button @click="delPage()" plain size="mini">批量删除</el-button>
          </div>
        </el-row>
      </div>

      <div class="table-wrap">
        <el-table
          :data="tableData"
          stripe
          @selection-change="selectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="countName"
            label="账户名">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="role"
            label="所属角色">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <div @click="changeStatus(Number(scope.row.status),scope.row.id)">
                <el-button v-if="scope.row.status==1" class="status" type="success" plain size="small">显示</el-button>
                <el-button v-if="scope.row.status==0" class="status" plain size="small">隐藏</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="addRole"
            label="添加人">
          </el-table-column>
          <el-table-column
            label="创建时间">
            <template slot-scope="scope">
              <div>{{scope.row.create_time|formatDate}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="goEdit(scope.row.id,scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="delManage(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination
      ref="paging" 
      class="pagination mt-2 text-right"
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

export default {
  data(){
    return {
      searchForm:{
        keyword:'',
        roleType:'',
        status:null
      },
      searchRules:{},
      options:[
        { label:'全部',value:'-1' },
      ],
      statusOptions:[
        { label:'全部',value:-1 },
      ],
      tableData:[
        {}
      ],
      selection:[],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
    }
  },
  created(){

  },
  methods:{
    selectionChange(selection){
      this.selection = selection
    },
    addOperator(){
      this.$router.push({
        path:'/settings/operator/addOperator'
      })
    },
    goEdit(id){
      this.$router.push({
        path:'/settings/operator/operatorDetail'
      })
    },
    searchSubmit(){
      this.getList()
    },
    resetForm(formName){
      this.$refs[formName].resetFields()
      this.getList()
    },
    handleSize(sizeVal){
      this.pageSize = sizeVal
      this.curPage = 1
      this.getList()
    },
    handleCurrent(currentVal){
      this.curPage = currentVal
      this.getList()
    }
  },
  components:{
    ySelect
  }
}
</script>
<style lang="less" scoped>

</style>