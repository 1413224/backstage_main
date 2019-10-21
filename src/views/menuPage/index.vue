<template>
  <div class="bg-white py-2 px-1 rounded wrap">
    <yTitle>导航管理</yTitle>

    <div class="content bg-gray">
      <div class="search clearfix pt-2 px-1 rounded pb-1">
        <el-form
          :model="searchForm" 
          :rules="searchRules" 
          ref="searchForm" 
          label-width="80px"
          class="border-bottom">
          <el-row>
            <el-col :span="6">
              <el-form-item label="应用场景" prop="scene">
                <ySelect
                v-if="options.length!=0" 
                v-model="searchForm.scene" 
                :options="options" :configs="configs"
                @changeSel="changeSel"></ySelect>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="关键字" prop="keyword">
                <el-input size="small" class="search-input" 
                placeholder="导航名称" v-model="searchForm.keyword">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="btn-wrap mt">
                <el-button style="margin-left:20px;" @click="searchSubmit('searchForm')" type="primary" size="mini">搜索</el-button>
                <el-button @click="resetForm('searchForm')" plain size="mini">清空</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <el-row class="mt-2 pb-1">
          <el-col :span="20">
            <div class="btn-wrap">
              <el-button style="margin-left:20px;" @click="goAddMenuPage()" type="primary" size="mini">新增导航</el-button>
              <el-button @click="delNav()" plain size="mini">批量删除</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- <ySelect
          v-if="options.length!=0" 
          v-model="scene" 
          :options="options" :configs="configs"
          @changeSel="changeSel"></ySelect>
        <el-button @click="goAddMenuPage()" type="primary" plain size="small">新增侧边栏组</el-button>
        <el-input size="small" class="search-input fr" placeholder="请输入内容" v-model="keyword">
          <el-button @click="getList()" slot="append" icon="el-icon-search"></el-button>
        </el-input> -->
      </div>

      <numberTips>
        <div class="items d-flex a-center mr-5">
          <span class="tit">符合条件的导航总数：</span>
          <span class="num">{{totalNums}}</span>
        </div>
      </numberTips>

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
            prop="role_type_name"
            label="应用场景">
          </el-table-column>
          <el-table-column
            prop="name"
            label="标题">
          </el-table-column>
          <el-table-column
            label="布局">
            <template slot-scope="scope">
              <div v-if="scope.row.layout=='default'">微盟布局</div>
              <div v-if="scope.row.layout=='youzan'">有赞布局</div>
            </template>
          </el-table-column>
          <el-table-column
            label="主题">
            <template slot-scope="scope">
              <div v-if="scope.row.theme=='red'">胭脂红</div>
              <div v-if="scope.row.theme=='blue'">天空蓝</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="rootFontSize"
            label="根字体">
            <template slot-scope="scope">
              <p>{{scope.row.rootFontSize}}px</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <div @click="changeStatus(Number(scope.row.status),scope.row.id)">
                <el-button v-if="scope.row.status==1" class="status" 
                  type="success" size="small" plain>显示</el-button>
                <el-button v-if="scope.row.status==0" class="status" size="small" plain>隐藏</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="editManage(scope.row.id)" type="text" size="small">详情</el-button>
              <el-button @click="goDetail(scope.row)" type="text" size="small">栏目</el-button>
              <!-- <el-button @click="editManage(scope.row.id)" type="text" size="small">编辑</el-button> -->
              <el-button @click="delManage(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <el-pagination v-show="tableData.length > 0" 
      ref="paging" 
      class="pagination mt-1"
      @size-change="handleSize" 
      @current-change="handleCurrent" 
      :current-page.sync="curPage" 
      :page-sizes="[10, 20, 30, 50]" 
      :page-size="pageSize" 
      layout="sizes, prev, slot, next" 
      prev-text="上一页" next-text="下一页" 
      :total="totalNums">
      <span style="text-align: center;">{{curPage}}/{{totalPages}}</span>
    </el-pagination> -->
    <el-pagination
      ref="paging" 
      class="pagination mt-1"
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
import { resolve, reject } from 'q';
export default {
  data(){
    return {
      searchForm:{
        scene:-1,
        keyword:'',
      },
      searchRules:{},
      
      options:[
        // {label:"全部",value:-1},
        // {label:"总后台",value:0},
        // {label:"联盟企业",value:1},
      ],
      configs:{},
      tableData: [],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
      selection:[]
    }
  },
  created(){
    this.GetRoleType().then(()=>{
      this.getList()
    })
  },
  methods:{
    resetForm(formName){
      this.$refs[formName].resetFields()
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
    goAddMenuPage(){
      this.$router.push({
        path:'/menupage/addMenuPage'
      })
    },
    changeSel(value){
      // console.log(value)
      this.getList(value)
    },
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
           _this.options.unshift({label:'全部',value:-1})
            resolve()
          }
        })
      })
    },
    getList(roleType){
      let _this = this
      // console.log(_this.scene)
      _this.$http.post(_this.baseUrl + _this.url.manageFactory.GetList,{
        token:_this.$utils.getToken(),
        role_type:roleType || roleType==0 ? roleType : _this.searchForm.scene,
        keyword:_this.searchForm.keyword,
        page_size:_this.pageSize,
        page_num:_this.curPage
      }).then((res)=>{
        if(res.data.ret==200){
          // console.log(res.data.data)
          let data = res.data.data
          _this.tableData = data.list
          _this.totalNums = Number(data.total_nums)
          _this.totalPages = data.total_pages || 1
        }
      })
    },
    changeStatus(status,id){
      let _this = this
      if(status==1){
        status=0
      }else{
        status=1
      }
      _this.$http.post(_this.baseUrl + _this.url.manageFactory.ChangeManageStatusById,{
        token:_this.$utils.getToken(),
        id:id,
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
    delNav(){
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
        _this.$http.post(_this.baseUrl + _this.url.manageFactory.DelManageByIds,{
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
    delManage(id){
      let _this = this
      _this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        _this.$http.post(_this.baseUrl + _this.url.manageFactory.DelManageByIds,{
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
    editManage(id){
      this.$router.push({
        path:'/menupage/addMenuPage',
        query:{
          id:id
        }
      })
    },
    goDetail(row){
      this.$router.push({
        path:'/menupage/menuDetail',
        query:{
          id:row.id,
          roleType:row.role_type,
          roleName:encodeURI(row.role_type_name)
        }
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
    }

  },
  components:{
    ySelect,
    numberTips
  }
}
</script>
<style lang="less" scoped>
.wrap{
  box-shadow:0px 0px 5px 0px rgba(34,36,47,0.1);
}
.breadcrumb{
  margin-top: 20px;
}
.content{
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  .search{
    background: #fff;
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
}
.pagination{
  text-align: right;
}
</style>
<style lang="less">
.table-wrap{
  .el-table thead{
    color: #333;
    // font-weight: bold;
  }
}
@media screen and (max-width: 1200px) {
  // .table-wrap{
  //   border: 1px solid #f00 !important;
  //   .el-table__body{
  //     min-width: 1200px !important;
  //     overflow-y: scroll !important;
  //     td{
  //       width: 150px !important;
  //     }
  //   }
  // }
}
</style>