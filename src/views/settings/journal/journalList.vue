<template>
  <div class="content rounded box-shadow-page px-1 py-2 bg-white">
    <yTitle>操作日志</yTitle>
    <div class=" bg-gray rounded p-1 mt-2">
      <div class="search bg-white rounded pt-2 px-1">
        <el-form
          :model="searchForm"
          ref="searchForm" 
          label-width="100px"
          class=" d-flex">
          <div>
            <el-form-item label="操作人" prop="roleName">
              <ySelect
                v-model="searchForm.roleName" 
                :options="options" placeholder="请选择操作人"></ySelect>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="操作模块" prop="model">
              <ySelect
                v-model="searchForm.model" 
                :options="modelOptions"></ySelect>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="操作时间" prop="linkTime">
              <linkageDateTimePicker v-model="searchForm.linkTime"></linkageDateTimePicker>
            </el-form-item>
          </div>
          <div class="pl-5 pt">
            <el-button class="search-btn" type="primary" size="mini" @click="searchSubmit('searchForm')">搜索</el-button>
            <el-button class="search-btn" size="mini" @click="resetForm('searchForm')">清空</el-button>
          </div>
        </el-form>
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
            prop="model"
            label="操作模块">
          </el-table-column>
          <el-table-column
            prop="sysPage"
            label="系统页面">
          </el-table-column>
          <el-table-column
            label="操作时间">
            <template slot-scope="scope">
              <div>{{scope.row.create_time|formatDate}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="conts"
            label="操作内容">
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
import linkageDateTimePicker from '@/components/dateTimePicker/linkageDateTimePicker'
export default {
  data(){
    return {
      searchForm:{
        roleName:'',
        model:-1,
        linkTime:[]
      },
      options:[
        { label:'ds',value:0}
      ],
      modelOptions:[
        { label:'全部',value:-1}
      ],
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
    searchSubmit(){
      this.getList()
    },
    resetForm(formName){
      this.$refs[formName].resetFields()
      this.getList()
    },
    selectionChange(selection){
      this.selection = selection
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
    ySelect,
    linkageDateTimePicker
  }
}
</script>
<style lang="less" scoped>

</style>