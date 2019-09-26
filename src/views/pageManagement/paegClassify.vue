<template>
  <div>
    <yTitle>系统页面分类</yTitle>

    <div class="content bg-gray">
      <div class="search clearfix">
        <ySelect
          v-if="options.length!=0" 
          v-model="scene" 
          :options="options" :configs="configs"
          @changeSel="changeSel"></ySelect>
        <span style="margin-left:20px;">状态：</span>
        <!-- <el-radio-group v-model="status" @change="changeStatus">
          <el-radio label="1">可用</el-radio>
          <el-radio label="0">禁用</el-radio>
        </el-radio-group> -->
        <el-select size="small" v-model="status" @change="changeStatusSearch">
          <el-option :value="Number(-1)" label="全部"></el-option>
          <el-option :value="Number(1)" label="可用"></el-option>
          <el-option :value="Number(0)" label="禁用"></el-option>
        </el-select>
        <el-button style="margin-left:20px;" @click="addClassify()" type="primary" plain size="small">新增分类</el-button>
        <el-button @click="delBatch()" type="danger" plain size="small">批量删除</el-button>

        <el-input size="small" class="search-input fr" placeholder="请输入内容" v-model="keyword">
          <el-button @click="getList()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>

      <div class="table-wrap">
        <el-table
          :data="tableData"
          stripe
          @selection-change="selectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="分类名称">
          </el-table-column>
          <el-table-column
            label="所属角色">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.role_type_list" :key="index">{{item.role_type_name}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <div @click="changeStatus(Number(scope.row.status),scope.row.id)">
                <el-button v-if="scope.row.status==1" class="status" type="success" size="small">可用</el-button>
                <el-button v-if="scope.row.status==0" class="status" type="danger" size="small">禁用</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="editManage(scope.row.id)" type="text" size="small">编辑</el-button>
              <el-button @click="delManage(scope.row.id)" type="text" size="small">删除</el-button>
              <el-button @click="goPage(scope.row)" type="text" size="small">分类页面</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="tableData.length > 0" 
          ref="paging" 
          class="pagination"
          @size-change="handleSize" 
          @current-change="handleCurrent" 
          :current-page.sync="curPage" 
          :page-sizes="[10, 20, 30, 50]" 
          :page-size="pageSize" 
          layout="sizes, prev, slot, next" 
          prev-text="上一页" next-text="下一页" 
          :total="totalNums">
          <span style="text-align: center;">{{curPage}}/{{totalPages}}</span>
        </el-pagination>
      </div>
    </div>

    <el-dialog
      :title="dialogClassifyText"
      :visible.sync="dialogClassify"
      width="30%"
      :before-close="handleClose">
      <el-form :model="classifyForm" :rules="classifyRules" ref="classify" label-width="100px">
        <el-form-item label="所属角色：">
          <el-radio-group v-model="changeAll" @change="chageRoleType">
            <el-radio label="1">全部</el-radio>
            <el-radio label="0">部分</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="role-wrap" v-show="!showAll">
          <el-checkbox-group v-model="classifyForm.roleType">
            <el-checkbox 
              v-for="(item,index) in roleTypeList" 
              :key="index"
              :disabled="allRoleType"
              :label="item.value">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="分类名称：" prop="name">
          <el-input size="small" class="item-input" v-model="classifyForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio-group v-model="classifyForm.status">
            <el-radio label="1">可用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogClassify = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitClassify('classify')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'

export default {
  data(){
    return {
      keyword:'',
      status:-1,
      scene:-2,
      options:[],
      configs:{},
      tableData:[],
      keyword:'',
      dialogClassify:false,
      dialogClassifyText:'新增',
      roleTypeList:[],
      changeAll:'0',
      classifyForm:{
        roleType:[],
        name:'',
        status:'1'
      },
      classifyRules:{
        name:[
          {required: true, message: '请输入分类名称',trigger:'blur'}          
        ]
      },
      allRoleType:false,
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
      selection:[],
      classifyId:null,
      showAll:false
    }
  },
  created(){
    this.GetRoleType().then(()=>{
      this.getList()
    })
  },
  methods:{
    GetRoleType(){
      return new Promise((resolve,reject)=>{
        let _this = this
        _this.$http.post(_this.baseUrl + _this.url.common.GetRoleType,{
          role_type:_this.url.role_type,
          token:_this.$utils.getToken()
        }).then((res)=>{
          if(res.data.ret==200){
            // console.log(res.data.data)
            let data = res.data.data
            let arr = []
            _this.options = data.map((item)=>{
              return {
                label:item.name,
                value:Number(item.role_type)
              }
            })
            
            _this.roleTypeList = data.map((item)=>{
              return {
                label:item.name,
                value:Number(item.role_type)
              }
            })
           _this.options.unshift({label:'全部适用',value:-1})
           _this.options.unshift({label:'全部分类信息',value:-2})
            resolve()
          }
        })
      })
    },
    getList(roleType){
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.System.GetCateList,{
        token:_this.$utils.getToken(),
        role_type:roleType || roleType==0 ? roleType : _this.scene,
        status:_this.status,
        keyword:_this.keyword,
        page_size:_this.pageSize,
        page_num:_this.curPage
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          _this.tableData = data.list
          _this.totalNums = Number(data.total_nums)
          _this.totalPages = data.total_pages || 1
        }
      })
    },
    changeSel(value){
      this.getList(value)
    },
    addClassify(){
      let _this = this
      _this.dialogClassifyText = '新增'
      _this.allRoleType = false
      _this.showAll = false

      _this.classifyForm.roleType = []
      _this.classifyForm.name = ''
      _this.classifyForm.status = '1'
      _this.changeAll = '0'
      _this.dialogClassify = true
    },
    submitClassify(formName){
      let _this = this,
          url = '',
          params = {};
      _this.$refs[formName].validate((valid)=>{
        if(!valid){
          return false
        }

        params = {
          token:_this.$utils.getToken(),
          role_type:_this.classifyForm.roleType.toString(),
          name:_this.classifyForm.name,
          status:_this.classifyForm.status
        }
       
        
        if(_this.dialogClassifyText=='新增'){
          url = _this.baseUrl + _this.url.System.AddCate
        }else if(_this.dialogClassifyText=='编辑'){
          url = _this.baseUrl + _this.url.System.EditCateById
          params.id = _this.classifyId
        }

        _this.$http.post(url,params).then((res)=>{
          if(res.data.ret==200){
             _this.$message({
              type: 'success',
              message: '更改成功!'
            })
            _this.dialogClassify = false
            _this.getList()
          }
        })

      })
    },
    handleClose(done){
      done()
    },
    chageRoleType(val){
      let _this = this
      if(val==1){
        _this.allRoleType = true
        _this.classifyForm.roleType = -1
        _this.showAll = true
      }else{
        _this.allRoleType = false
        _this.classifyForm.roleType = []
        _this.showAll = false
      }
    },
    changeStatus(status,id){
      let _this = this
      if(status==1){
        status=0
      }else{
        status=1
      }
      _this.$http.post(_this.baseUrl + _this.url.System.ChangeCateStatusByIds,{
        token:_this.$utils.getToken(),
        ids:id,
        status:status
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '更改成功!'
          })
          _this.getList()
        }
      })
    },
    editManage(id){
      let _this = this
      _this.classifyId = id
      _this.$http.post(_this.baseUrl + _this.url.System.GetCateInfoById,{
        id:id,
        token:_this.$utils.getToken()
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          // let arr = data.role_types.split('|')
          let arrIds = ''
          let arr = []
          data.role_type_list.map(item=>{
            arr.push(item.role_type)
          })

          _this.dialogClassifyText='编辑'

          if(arr[0]==-1){
            _this.changeAll = '1'
            _this.allRoleType = true
            _this.classifyForm.roleType = []
            _this.showAll = true
          }else{
            _this.changeAll = '0'
            _this.showAll = false
            _this.allRoleType = false
            _this.classifyForm.roleType = arr
          }

          _this.classifyForm.name = data.name
          _this.classifyForm.status = data.status
          _this.dialogClassify = true
        }
      })
    },
    delManage(id){
      let _this = this
       _this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
         confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
       }).then(()=>{
         _this.$http.post(_this.baseUrl + _this.url.System.DelCateByIds,{
           token:_this.$utils.getToken(),
            ids:id
         }).then((res)=>{
           if(res.data.ret==200){
              _this.$message({
                type: 'success',
                message: '删除成功!'
              })
              _this.getList()
            }
         })
       }).catch(()=>{
         _this.$message({
          type: 'info',
          message: '已取消删除'
        })
       })
    },
    selectionChange(selection){
      this.selection = selection
    },
    delBatch(){
      let _this = this,
      idsArr = [],
      ids = '';
      if(_this.selection.length==0){
        _this.$message({
          type: 'warning',
          message: '请选择需要删除的数据!'
        })
        return false
      }

      _this.selection.map((item,index)=>{
        idsArr.push(item.id)
      })
      ids = idsArr.toString()

      _this.$confirm('此操作将永久删除该信息, 是否继续?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        _this.$http.post(_this.baseUrl + _this.url.System.DelCateByIds,{
          token:_this.$utils.getToken(),
          ids:ids
        }).then((res)=>{
          if(res.data.ret==200){
            _this.$message({
              type: 'success',
              message: '删除成功!'
            })
            _this.getList()
          }
        })
      }).catch(()=>{
        _this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    goPage(row){
      console.log(row)
      this.$router.push({
        path:'/pageManagement/specPage',
        query:{
          cateId:row.id
        }
      })
    },
    changeStatusSearch(){
      this.getList()
    },
    handleCurrent(currentVal){
      this.curPage = currentVal
      this.getList()
    },

    handleSize(sizeVal){
      this.pageSize = sizeVal
      this.curPage = 1
      this.getList()
    },
  },
  components:{
    ySelect
  }
}
</script>
<style lang="less" scoped>
.content{
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  .search{
    background: #fff;
    padding: 10px;
    .search-input{
      width: 250px;
    }
  }
  .table-wrap{
    margin-top: 10px;
    border: 1px solid #eee;
    border-radius: 10px;
    overflow: hidden;
    .status{
      padding: 5px;
    }
  }
  .pagination{
    text-align: center;
    margin: 30px 0;
  }
}
</style>
<style lang="less">
.item-input{
  width: 65%;
}
.role-wrap{
  .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
}

</style>