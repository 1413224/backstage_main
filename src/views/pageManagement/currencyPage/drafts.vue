<template>
  <div class="content rounded box-shadow-page px-1 py-2 bg-white">
    <yTitle>草稿箱</yTitle>
    <div class=" bg-gray rounded p-1 mt-2">
      <div class="search bg-white rounded pt-2 px-1">
        <el-form
          :model="searchForm"
          ref="searchForm" 
          label-width="100px"
          class=" d-flex border-bottom">
          <div class=" d-flex">
            <el-form-item label="页面分类" prop="roleType">
              <ySelect
                v-model="searchForm.roleType" 
                :options="options"
                @changeSel="changeSel"></ySelect>
            </el-form-item>
            <el-form-item label="--" prop="pageType" class="merge">
              <ySelect
                v-model="searchForm.pageType" 
                :options="pageTypeOptions"
                placeholder="选择页面分类"></ySelect>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="关键字" prop="keyword">
              <el-input size="small" v-model="searchForm.keyword" placeholder="页面标题/PATH"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="页面类型" prop="status">
              <ySelect
                v-model="searchForm.pageStatus" 
                :options="pageStatusOptions"
                ></ySelect>
            </el-form-item>
          </div>
          <div class="pl-3 pt">
            <el-button class="search-btn" type="primary" size="mini" @click="searchSubmit('searchForm')">搜索</el-button>
            <el-button class="search-btn" size="mini" @click="resetForm('searchForm')">清空</el-button>
          </div>
        </el-form>
        <el-row class="mt-2 pb-1">
          <el-col :span="20">
            <div class="btn-wrap">
              <!-- <el-button style="margin-left:20px;" @click="addPage()" type="primary" size="mini">新增页面</el-button> -->
              <el-button @click="delPage()" plain size="mini">批量删除</el-button>
            </div>
          </el-col>
        </el-row>
      </div>

      <numberTips>
        <div class="items d-flex a-center mr-5">
          <span class="tit">符合条件的草稿总数：</span>
          <span class="num">{{totalNums}}</span>
        </div>
      </numberTips>

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
            label="PATH">
          </el-table-column>
          <el-table-column
            label="适用场景">
            <template slot-scope="scope">
              <!-- <div style="display:inline-block;" v-for="(item,index) in scope.row.role_type_list" :key="index">{{item.role_type_name}}/</div> -->
              <el-breadcrumb separator="/" class="breadcrumb-tab">
                <el-breadcrumb-item v-for="(item,index) in scope.row.role_type_list" :key="index">{{item.role_type_name}}</el-breadcrumb-item>
              </el-breadcrumb>
            </template>
          </el-table-column>
          <el-table-column
            prop="cate_name"
            label="页面分类">
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
      class="pagination mt-1 text-right"
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
      searchForm:{
        roleType:'',
        pageType:'',
        keyword:'',
        pageStatus:''
      },
      options:[],
      pageTypeOptions:[],
      pageStatusOptions:[],
      tableData:[],
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
    changeSel(value){
      this.getPageCates(value)
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

</style>