<template>
  <div class=" bg-white py-2 px-1 rounded box-shadow-page">
    <yTitle>权限组详情列表</yTitle> 
    <div class="content bg-gray rounded p-1 mt-2">
      <div class="search bg-white rounded p-1">
        <el-form
          :model="searchForm" 
          ref="searchForm" 
          label-width="80px"
          class="border-bottom mt-1 d-flex">
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
        <div class="btn-wrap mt-2 mb-1">
          <el-button style="margin-left:20px;" @click="addPerm()" type="primary" size="mini">新增权限组</el-button>
          <el-button @click="delPerm()" plain size="mini">批量删除</el-button>
        </div>
      </div>
    </div>

    <div class="table-wrap">
      <el-table
        :data="tableData"
        row-key="id"
        stripe
        default-expand-all
        @selection-change="selectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="权限组名称">
        </el-table-column>
        <el-table-column
          prop="code"
          label="标识">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
          <template slot-scope="scope">
            <p v-if="scope.row.type==0">功能</p>
            <p v-if="scope.row.type==1">页面</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="attribute"
          label="属性">
          <template slot-scope="scope">
            <p v-if="scope.row.attribute==0">可选</p>
            <p v-if="scope.row.attribute==1">默认</p>
          </template>
        </el-table-column>
        <el-table-column
          label="移动">
          <template slot-scope="scope">
            <i @click="umDisplayOrder(scope.row.id,1)" class="iconfont icon-zhiding"></i>
            <i @click="umDisplayOrder(scope.row.id,2)" class="iconfont icon-xiangshang"></i>
            <i @click="umDisplayOrder(scope.row.id,3)" class="iconfont icon-xiangxia"></i>
            <i @click="umDisplayOrder(scope.row.id,4)" class="iconfont icon-dibu"></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <div @click="changeStatus(Number(scope.row.status),scope.row.id)">
              <el-button v-if="scope.row.status==1" class="status" type="success" size="small" plain>显示</el-button>
              <el-button v-if="scope.row.status==0" class="status" size="small" plain>隐藏</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.row)">编辑
            </el-button>
            <el-button
              v-if="scope.row.is_leaf==false"
              size="mini"
              type="text"
              @click="handleAdd(scope.row)">添加
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDel(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'
import actions from './actions/permGroup'
export default {
  data(){
    return {
      roleType:'',
      searchForm:{
        status:'-1'
      },
      statusOptions:[
        { label:'全部',value:'-1' },
        { label:'显示',value:'1' },
        { label:'隐藏',value:'0' },
      ],
      tableData:[],
      selection:[]
    }
  },
  created(){
    this.roleType = this.$route.query.roleType
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
    selectionChange(selection){
      this.selection = selection
    },
  },
  components:{
    ySelect
  }
}
</script>
<style lang="less" scoped>
.cell{
  .icon{
    font-size: 26px !important;
    &:hover{
      cursor: default !important;
    }
  }
  .iconfont{
    font-size: 20px;
    &:hover{
      cursor: pointer;
    }
  }
}
.iconfont{
  font-size: 32px;
  color: #ccc;
  &:hover{
    cursor: pointer;
  }
}
</style>