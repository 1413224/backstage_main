<template>
  <div class="content bg-white rounded box-shadow-page py-2 px-1">
    <yTitle>页面组</yTitle> 
    <div class="content bg-gray p-1 rounded mt-2">
      <div class="search bg-white px-1 py-2 rounded">
        <el-form
          :model="searchForm" 
          ref="searchForm" 
          label-width="80px"
          class="border-bottom mt-1 d-flex">
          <el-form-item label="关键字" prop="keyword">
            <el-input size="small" class="search-input yinput" placeholder="分类名称" v-model="searchForm.keyword"></el-input>
          </el-form-item>
          <div class="pl-5 pt">
            <el-button class="search-btn" type="primary" size="mini" @click="searchSubmit('searchForm')">搜索</el-button>
            <el-button class="search-btn" size="mini" @click="resetForm('searchForm')">清空</el-button>
          </div>
        </el-form>
        <div class="btn-wrap mt-2">
          <el-button style="margin-left:20px;" @click="addPage()" type="primary" size="mini">新增页面组</el-button>
          <el-button @click="delPagepl()" plain size="mini">批量删除</el-button>
        </div>
      </div>

      <div class="table-wrap">
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
            prop="path"
            label="路径">
          </el-table-column>
          <el-table-column
            prop="page_nums"
            label="页面数">
            <template slot-scope="scope">
              <p class="pagenums" @click="goPage(scope.row)">{{scope.row.page_nums}}</p>
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
              <el-button @click="goPage(scope.row)" type="text" size="small">页面</el-button>
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
      :title="dialogPageText"
      :visible.sync="dialogPage"
      :before-close="closeDialogPage"
      class="pageDialog"
      width="640px">
      <el-form
        label-width="80px" 
        :model="pageForm" :rules="pageRules" ref="pageForm" class=" d-flex">
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
          :data="pageData" stripe height="400">
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
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="selPage(scope.row)">选择
                </el-button>
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
      <!-- <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogPage = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitEditPage('pageForm')">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
import actions from './actions/pageGroup'
export default {
  data(){
    return {
      searchForm:{
        keyword:''
      },
      tableData:[],
      selection:[],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
      dialogPageText:'新增页面组',
      dialogPage:false,
      pageForm:{
        keyWork:''
      },
      pageRules:{
      },
      isEdit:null,
      GroupId:null,
      pageData:[],
      // totalNums:0,
      pageCurPage: 1,
      pagePageSize: 10,
      pageTotalNums:1,
    }
  },
  created(){
    this.getList()
  },
  methods:{
    ...actions,
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
    goPage(row){
      this.$router.push({
        path:'/pageManagement/pageGroup/pageList',
        query:{
          id:row.id,
          name:escape(row.name),
          path:row.path
        }
      })
    },
    resetPageForm(formName){
      this.$refs[formName].resetFields()
      this.getPageList()
    },
    pageSubmit(){
      this.getPageList()
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
  }
}
</script>
<style lang="less" scoped>
.pagenums{
  &:hover{
    cursor: pointer;
    color: #2589FFFF;
  }
}
.search-input{
  width: 300px;
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