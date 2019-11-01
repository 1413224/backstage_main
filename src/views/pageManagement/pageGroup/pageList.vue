<template>
  <div class="content bg-white rounded box-shadow-page py-2 px-1">
    <yTitle>页面列表</yTitle> 
    <div class="bg-gray p-1 rounded mt-2">
      <div class="head bg-white rounded p-2">
        <p class="name">{{parentInfo.name}}</p>
        <p class="path font-sm mt">路径：{{parentInfo.path}}</p>
      </div>

      <div class="search bg-white py-2 px-1 rounded mt-1">
        <el-form
          :model="searchForm" 
          ref="searchForm" 
          label-width="80px"
          class="border-bottom mt-1 d-flex">
          <el-form-item label="关键字" prop="keyword">
            <el-input size="small" class="search-input yinput" placeholder="页面名称/路径" v-model="searchForm.keyword"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <ySelect
              v-model="searchForm.status" 
              :options="statusOptions"></ySelect>
          </el-form-item>
          <div class="pl-5 pt">
            <el-button class="search-btn" type="primary" size="mini" @click="searchSubmit('searchForm')">搜索</el-button>
            <el-button class="search-btn" size="mini" @click="resetForm('searchForm')">清空</el-button>
          </div>
        </el-form>
        <div class="btn-wrap mt-2">
          <el-button style="margin-left:20px;" @click="addPage()" type="primary" size="mini">添加页面</el-button>
          <el-button @click="delPagepl()" plain size="mini">批量删除</el-button>
        </div>
      </div>

      <div class="table-wrap">
        <el-table
          :data="tableData"
          stripe
          @selection-change="selectionChange"
          @sort-change="sortChange"
          :default-sort = "{prop: 'create_time', order: 'descending'}"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="page_name"
            label="页面名称">
          </el-table-column>
          <el-table-column
            prop="page_path"
            label="路径">
          </el-table-column>
          <el-table-column
            prop="pageType"
            label="类型">
            <template slot-scope="scope">
              <p v-if="scope.row.pageType==0">通用页面</p>
              <p v-if="scope.row.pageType==1">系统页面</p>
            </template>
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
            label="添加时间"
            sortable="custom"
            prop="create_time"
            :sort-orders="['ascending', 'descending']">
            <template slot-scope="scope">
              <div>{{scope.row.create_time|formatDate}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <!-- <el-button @click="goPage(scope.row)" type="text" size="small">页面</el-button> -->
              <el-button @click="delPage(scope.row.id)" type="text" size="small">删除</el-button>
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
    <el-dialog
      title="页面"
      :visible.sync="dialogPage"
      class="pageDialog"
      width="740px">
      <el-form
        label-width="80px" 
        :model="pageForm" ref="pageForm" class=" d-flex">
        <el-form-item  label="关键字" prop="keyWork">
          <el-input size="small" style="width:166px;" v-model="pageForm.keyWork" placeholder="页面名称/路径"></el-input>
        </el-form-item>
        <div class="pl-5 pt">
          <el-button class="search-btn" type="primary" size="mini" @click="pageSubmit('pageForm')">搜索</el-button>
          <el-button class="search-btn" size="mini" @click="resetPageForm('pageForm')">清空</el-button>
        </div>
      </el-form>
      <div class=" bg-gray p-1 rounded">
        <el-table 
          :data="pageData" stripe height="400"
          @selection-change="selectionPageChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="页面名称">
          </el-table-column>
          <el-table-column
            prop="path"
            label="路径">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型">
            <template slot-scope="scope">
              <p v-if="scope.row.type==0">通用页面</p>
              <p v-if="scope.row.type==1">系统页面</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        ref="paging"
        class="pagination mt-2 text-right"
        @size-change="pageHandleSize"
        @current-change="pageHandleCurrent"
        :current-page="pageCurPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagePageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalNums">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogPage = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitPage('pageForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'
import actions from './actions/pageList'
export default {
  data(){
    return {
      parentInfo:{
        name:'',
        path:'',
        id:''
      },
      searchForm:{
        keyword:'',
        status:'-1'
      },
      statusOptions:[
        { label:'全部',value:'-1' },
        { label:'显示',value:'1' },
        { label:'隐藏',value:'0' },
      ],
      tableData:[],
      selection:[],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
      dialogPage:false,
      pageForm:{
        keyWork:''
      },
      pageData:[],
      selectionPage:[],
      pageCurPage: 1,
      pagePageSize: 10,
      pageTotalNums:1,
    }
  },
  created(){
    let _this = this
    _this.parentInfo.name = unescape(_this.$route.query.name)
    _this.parentInfo.path = _this.$route.query.path
    _this.parentInfo.id = _this.$route.query.id

    _this.getList()
  },
  methods:{
    ...actions,
    addPage(){
      this.dialogPage = true
      this.getPageList()
    },
    resetForm(formName){
      this.$refs[formName].resetFields()
      this.getList()
    },
    searchSubmit(formName){
      this.$refs[formName].validate((valid)=>{
        if(!valid){
          return false
        }
        this.getList()
      })
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
    resetPageForm(formName){
      this.$refs[formName].resetFields()
      this.getPageList()
    },
    pageSubmit(){
      this.getPageList()
    },
    selectionPageChange(selection){
      this.selectionPage = selection
    },
    pageHandleSize(sizeVal){
      this.pagePageSize = sizeVal
      this.pageCurPage = 1
      this.getPageList()
    },
    pageHandleCurrent(currentVal){
      this.pageCurPage = currentVal
      this.getPageList()
    },
  },
  components:{
    ySelect
  }
}
</script>
<style lang="less" scoped>
.head{
  .name{
    font-size: 14px;
    color: #333333FF;
  }
  .path{
    color: #686A73FF;
  }
}
</style>
<style lang="less">
.pageDialog{
  .el-dialog__header{
    border-bottom: 1px solid #E3E2E5FF !important;
  }
  .el-dialog__footer{
    border: none;
  }
  .el-dialog__body{
    padding: 30px 10px;
  }
}
</style>