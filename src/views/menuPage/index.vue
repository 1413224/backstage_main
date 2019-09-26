<template>
  <div>
    <!-- <div class="tit">侧边栏管理</div> -->
    <yTitle>侧边栏管理</yTitle>

    <div class="content bg-gray">
      <div class="search clearfix">
        <ySelect
          v-if="options.length!=0" 
          v-model="scene" 
          :options="options" :configs="configs"
          @changeSel="changeSel"></ySelect>
        <el-button @click="goAddMenuPage()" type="primary" plain size="small">新增侧边栏组</el-button>
        <el-input size="small" class="search-input fr" placeholder="请输入内容" v-model="keyword">
          <el-button @click="getList()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="table-wrap">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
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
              <el-button @click="editManage(scope.row.id)" type="text" size="small">详情</el-button>
              <el-button @click="goDetail(scope.row)" type="text" size="small">栏目</el-button>
              <!-- <el-button @click="editManage(scope.row.id)" type="text" size="small">编辑</el-button> -->
              <el-button @click="delManage(scope.row.id)" type="text" size="small">删除</el-button>
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
  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'
import { resolve, reject } from 'q';
export default {
  data(){
    return {
      scene:-1,
      options:[
        // {label:"全部",value:-1},
        // {label:"总后台",value:0},
        // {label:"联盟企业",value:1},
      ],
      configs:{},
      keyword:'',
      tableData: [],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1
    }
  },
  created(){
    this.GetRoleType().then(()=>{
      this.getList()
    })
  },
  methods:{
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
        role_type:roleType || roleType==0 ? roleType : _this.scene,
        keyword:_this.keyword,
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
    delManage(id){
      let _this = this
      _this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        _this.$http.post(_this.baseUrl + _this.url.manageFactory.DelManageById,{
          token:_this.$utils.getToken(),
          id:id
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
    ySelect
  }
}
</script>
<style lang="less" scoped>
.breadcrumb{
  margin-top: 20px;
}
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
.table-wrap{
  .el-table thead{
    color: #333;
    font-weight: bold;
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