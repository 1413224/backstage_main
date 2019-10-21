<template>
  <div class="content bg-white box-shadow-page rounded py-2 px-1">
    <yTitle>角色管理</yTitle>
    <div class="bg-gray rounded p-1 mt-2">
      <div class="search bg-white rounded p-1">
        <el-form
          :model="searchForm" 
          :rules="searchRules" 
          ref="searchForm" 
          label-width="80px"
          class="border-bottom">
          <el-row>
            <el-col :span="6">
              <el-form-item label="关键字" prop="keyword">
                <el-input size="small" v-model="searchForm.keyword" placeholder="角色名称"></el-input>
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
        <el-row class="mt-2 pb-1">
          <el-col :span="20">
            <div class="btn-wrap">
              <el-button style="margin-left:20px;" @click="addPage()" type="primary" size="mini">新增角色</el-button>
              <!-- <el-button @click="delPage()" plain size="mini">批量删除</el-button> -->
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="table-wrap">
        <el-table
          :data="tableData"
          stripe
          @selection-change="selectionChange"
          style="width:100%;">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色名称">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="角色描述"
            width="300">
          </el-table-column>
          <el-table-column
            prop="nums"
            label="人数">
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
            label="操作">
            <template slot-scope="scope">
              <el-button @click="goDetail(scope.row.id,scope.row)" type="text" size="small">详情</el-button>
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
export default {
  data(){
    return {
      searchForm:{
        keyword:'',
        status:'-1'
      },
      searchRules:{},
      statusOptions:[
        { label:'全部',value:'-1' },
        { label:'启用',value:'1' },
        { label:'禁用',value:'0' },
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
  methods:{
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
    },
    addPage(){
      this.$router.push({
        path:'/settings/roleConfig/addRole'
      })
    },
    goDetail(id){
      this.$router.push({
        path:'/settings/roleConfig/roleDetail'
      })
    }
  },
  components:{
    ySelect
  }
}
</script>
<style lang="less" scoped>

</style>