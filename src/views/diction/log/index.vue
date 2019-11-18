<template>
  <div class=" bg-white py-2 px-1 rounded box-shadow-page">
    <yTitle>日志类型</yTitle> 
    <div class="content bg-gray rounded p-1 mt-2">
      <div class="search bg-white rounded p-1">
        <el-form
          :model="searchForm" 
          ref="searchForm" 
          label-width="80px"
          class="border-bottom mt-1 d-flex">
          <el-form-item label="适用场景" prop="roleType">
            <ySelect
              v-model="searchForm.roleType" 
              :options="roleTypeOptions"></ySelect>
          </el-form-item>
          <div class="pl-5 pt">
            <el-button class="search-btn" type="primary" size="mini" @click="searchSubmit('searchForm')">搜索</el-button>
            <el-button class="search-btn" size="mini" @click="resetForm('searchForm')">清空</el-button>
          </div>
        </el-form>
        <div class="btn-wrap mt-2 mb-1">
          <el-button style="margin-left:20px;" @click="addType()" type="primary" size="mini">新增类型</el-button>
          <el-button @click="delTypepl()" plain size="mini">批量删除</el-button>
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
            label="名称">
          </el-table-column>
          <el-table-column
            prop="code"
            label="日志标识">
          </el-table-column>
          <el-table-column
            label="适用场景">
            <template slot-scope="scope">
              <el-breadcrumb separator="/" class="breadcrumb-tab">
                <el-breadcrumb-item v-for="(item,index) in scope.row.role_type_list" :key="index">{{item.role_type_name}}</el-breadcrumb-item>
              </el-breadcrumb>
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
              <div>
                <el-button 
                  v-if="scope.row.status==1" 
                  @click="changeStatus(Number(scope.row.status),scope.row.id)"
                  class="status" type="success" size="small" plain>显示</el-button>
                <el-button 
                  v-if="scope.row.status==0" 
                  @click="changeStatus(Number(scope.row.status),scope.row.id)"
                  class="status" size="small" plain>隐藏</el-button>
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

    <el-dialog
      :title="dialogText"
      :visible.sync="dialog"
      :before-close="closeDialog"
      width="640px">
      <el-form
        label-width="110px" 
        :model="rulesForm" :rules="rules" ref="rulesForm">
        <el-form-item label="适用场景" prop="cjin">
          <el-checkbox-group v-model="rulesForm.cjin" class="rolelist" style="margin-top:2px;">
            <el-checkbox
              v-for="(item,index) in roleList"
              :key="index"
              :label="item.role_type">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="日志名称" prop="name">
          <el-input size="small" style="width:346px;" v-model="rulesForm.name" placeholder="请输入日志名称"></el-input>
        </el-form-item>
        <el-form-item label="日志标识" prop="code">
          <el-input size="small" style="width:346px;" v-model="rulesForm.code" placeholder="请输入日志标识"></el-input>
          <p class="font-sm" style="color:#999999FF;">只填写当层标识即可，系统将自动补全日志标识</p>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="rulesForm.status">
            <el-radio label="1">显示</el-radio>
            <el-radio label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialog = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitEdit('rulesForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'
import actions from './actions/index'
export default {
  data(){
    return {
      isEdit:null,
      logId:'',
      searchForm:{
        roleType:-2
      },
      roleTypeOptions:[],
      tableData:[{}],
      selection:[],
      dialogText:'',
      dialog:false,
      rulesForm:{
        cjin:[],
        name:'',
        code:'',
        status:'1'
      },
      rules:{
        cjin:[
          {required: true, message: '请选择适用场景',trigger:'blur'}
        ],
        name:[
          {required: true, message: '请输入日志名称',trigger:'blur'}
        ],
        code:[
          {required: true, message: '请输入日志标识',trigger:'blur'}
        ]
      },
      roleList:[]

    }
  },
  created(){
    let _this = this
    _this.GetRoleType().then(()=>{
      _this.getList()
    })
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
    closeDialog(done){
      this.$refs['rulesForm'].resetFields()
      this.showEdit = false
      done()
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
.rolelist{
  .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
}
</style>