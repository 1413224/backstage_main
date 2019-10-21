<template>
  <div class="bg-white py-2 px-1 rounded wrap">
    <yTitle>页面列表</yTitle>
    <div class="content bg-gray rounded mt-2 p-1">
      <div class="search rounded bg-white pt-2 p-1">
        <el-form
          :model="searchForm" 
          ref="searchForm" 
          label-width="80px"
          class="border-bottom">
          <el-row>
            <el-col :span="9" class="d-flex">
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
            </el-col>
            <el-col :span="5">
              <el-form-item label="关键字" prop="keyword">
                <el-input size="small" v-model="searchForm.keyword" placeholder="页面名称/页面路径"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="状态" prop="status">
                <ySelect
                  v-model="searchForm.status" 
                  :options="statusOptions"></ySelect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-form-item label="页面类型" prop="status">
                <ySelect
                  v-model="searchForm.type" 
                  :options="typeOptions"></ySelect>
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
              <!-- <linkageTimePicker></linkageTimePicker> -->
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
            label="标题">
          </el-table-column>
          <el-table-column
            prop="path"
            label="页面路径">
          </el-table-column>
          <el-table-column
            prop="cate_name"
            label="页面分类">
          </el-table-column>
          <el-table-column
            prop="type_name"
            label="页面类型">
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
      class="pagination mt-2"
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
// import linkageTimePicker from '@/components/timePicker/linkageTimePicker'
import actions from './actions/pageList'
export default {
  data(){
    return {
      searchForm:{
        keyword:'',
        status:'-1',
        type:'-1',
        roleType:-2,
        pageType:''
      },
      statusOptions:[
        { label:'全部',value:'-1' },
        { label:'显示',value:'1' },
        { label:'隐藏',value:'0' },
      ],
      typeOptions:[
        { label:'全部',value:'-1' },
      ],
      options:[],
      pageTypeOptions:[],
      tableData:[],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
      selection:[],
    }
  },
  created(){
    this.GetRoleType().then(()=>{
      this.getList()
      // this.getPageCates()
    })
  },
  methods:{
    resetForm(formName){
      this.$refs[formName].resetFields()
    },
    searchSubmit(formName){
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
    ...actions
  },
  components:{
    ySelect,
    numberTips,
    // linkageTimePicker
  }
}
</script>
<style lang="less" scoped>
.table-wrap{
  .status{
    padding: 4px 12px;
  }
}
.wrap{
  box-shadow:0px 0px 5px 0px rgba(34,36,47,0.1);
}
.pagination{
  text-align: right;
}
</style>