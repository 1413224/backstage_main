<template>
  <div class="content bg-white rounded box-shadow-page p-1">
    <div class=" bg-gray rounded p-1">
      <div class=" bg-white rounded py-2 px-1">
        <el-form
          :model="rulesForm" :rules="rules" ref="rulesForm"
          label-width="130px" class="mt-2">
          <el-form-item label="所属上级权限组" v-if="showQX">
            <p class="font-sm" style="margin-top:2px;">{{Info.parent_name}}</p>
          </el-form-item>
          <el-form-item label="权限组名" prop="groupName" class="ruleInput">
            <el-input size="small" placeholder="请输入权限组名" v-model="rulesForm.groupName"></el-input>
          </el-form-item>
          <el-form-item label="标识" prop="code" class="ruleInput">
            <el-input size="small" placeholder="请输入标识" v-model="rulesForm.code"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="rulesForm.type">
              <el-radio label="0">功能</el-radio>
              <el-radio label="1">页面</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 页面 -->
          <div v-show="rulesForm.type==1">
            <el-form-item label="选择页面" prop="page">
              <el-button size="small" icon="el-icon-plus" @click="addPage()">点击添加</el-button>
              <div class=" bg-gray rounded p-1 mt-1" style="width:700px;">
                <el-table
                  :data="tableData"
                  stripe
                  style="width: 700px;">
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
                    label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        @click="unBind(scope.row)">解除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-form-item>
          </div>
          <!-- 页面end -->

          <el-form-item label="属性" prop="attribute">
            <el-radio-group v-model="rulesForm.attribute">
              <el-radio label="0">可选</el-radio>
              <el-radio label="1">默认</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="rulesForm.status">
              <el-radio label="1">显示</el-radio>
              <el-radio label="0">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom">
      <el-button @click="goBackList()" size="small">取消</el-button>
      <el-button @click="submitPermGroup('rulesForm')" size="small" type="primary">确定</el-button>
    </div>

    <!-- 页面弹框 -->
    <el-dialog
      title="页面"
      :visible.sync="dialogPage"
      class="pageDialog"
      width="740px">
      <el-form
        :model="pageForm"
        ref="pageForm" label-width="50px" class=" d-flex">
        <el-form-item  label="关键字" prop="keyWork">
          <el-input size="small" style="width:166px;" v-model="pageForm.keyWork" placeholder="页面名称/路径"></el-input>
        </el-form-item>
        <div class="pl-5 pt">
          <el-button class="search-btn" type="primary" size="mini" @click="searchSubmit('pageForm')">搜索</el-button>
          <el-button class="search-btn" size="mini" @click="resetForm('pageForm')">清空</el-button>
        </div>
      </el-form>
      <div class=" bg-gray p-1 rounded">
        <el-table
          :data="pageData" stripe height="400"
          @selection-change="selectionChange">
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
        @size-change="handleSize"
        @current-change="handleCurrent"
        :current-page="curPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNums">
      </el-pagination>
      <span slot="footer">
        <el-button size="small" @click="calcelPage()">取 消</el-button>
        <el-button size="small" type="primary" @click="submitEditPage('pageColumn')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 页面弹框end -->

  </div>
</template>
<script>
import actions from './actions/addEditPermGroup'
export default {
  data(){
    return {
      isEdit:null,
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
      pageData:[],
      pageForm:{
        keyWork:''
      },
      tableData:[],
      dialogPage:false,
      rulesForm:{
        groupName:'',
        code:'',
        type:'0',
        attribute:'1',
        status:'1',
      },
      rules:{
        groupName:[
          {required: true, message: '请输入权限组名',trigger:'blur'}
        ],
        code:[
          {required: true, message: '请输入标识',trigger:'blur'}
        ],
        type:[
          {required: true, message: '请选择类型',trigger:'blur'}
        ],
        attribute:[
          {required: true, message: '请选择属性',trigger:'blur'}
        ],
        status:[
          {required: true, message: '请选择状态',trigger:'blur'}
        ]
      },
      roleType:'',
      Info:{},
      selection:[],
      pageSelection:[],
      showQX:null
    }
  },
  created(){
    let _this = this
    _this.roleType = _this.$route.query.roleType
    // console.log(unescape(_this.$route.query.name))

    if(_this.$route.query.id && _this.$route.query.name){
      _this.isEdit = false
      _this.showQX = true
      _this.Info.parent_name = unescape(_this.$route.query.name)
    }else if(_this.$route.query.id && !_this.$route.query.name){
      _this.isEdit = true
      _this.showQX = true
      _this.getInfo()
    }else{
      _this.isEdit = false
      _this.showQX = false
    }
    _this.getPageList()
  },
  methods:{
    ...actions,
    goBackList(){
      this.$router.go(-1)
    },
    handleSize(sizeVal){
      this.pageSize = sizeVal
      this.curPage = 1
      this.getPageList()
    },
    handleCurrent(currentVal){
      this.curPage = currentVal
      this.getPageList()
    },
    resetForm(formName){
      this.$refs[formName].resetFields()
      this.getPageList()
    },
    searchSubmit(){
      this.getPageList()
    }
  },
  components:{

  }
}
</script>
<style lang="less" scoped>
.bottom{
  position: fixed;
  bottom: 0;
  left: 263px;
  width: calc(100% - 274px);
  padding: 10px 0;
  text-align: center;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px 5px 0 0;
  .el-button--small{
    padding: 8px 30px;
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