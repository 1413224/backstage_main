<template>
<div class="bg-white py-2 px-1 rounded wrap">
  <yTitle>页面列表</yTitle>
  <div class="content bg-gray">
    <div class="bg-white rounded mb-2 p-2">
      <p style="font-size:14px;color:#333;font-weight:bold;">{{specName}}页面</p>
      <p style="font-size:12px;color:#686A73;" class="mt-1 d-flex">
        <span style="font-size:12px;">适用场景：</span>
        <el-breadcrumb separator="/" class="bread">
          <el-breadcrumb-item 
            v-for="(item,index) in specRoleList"
            :key="index">{{item.role_type_name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </p>
    </div>
    <div class="search rounded">
      <el-form
        :model="searchForm" 
        :rules="searchRules" 
        ref="searchForm" 
        label-width="110px"
        class=" border-bottom">
        <el-row>
          <!-- <el-col :span="6">
            <el-form-item label="角色类型：" prop="roleType">
              <ySelect
                v-model="searchForm.roleType" 
                :options="options" :configs="configs"
                @changeSel="changeSel"></ySelect>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="6">
            <el-form-item label="页面分类：" prop="pageType">
              <ySelect
                v-model="searchForm.pageType" 
                :options="pageTypeOptions" :configs="pageTypeConfigs"
                @changeSel="changePageSel"></ySelect>
            </el-form-item>
          </el-col> -->
          
          <el-col :span="6">
            <el-form-item label="页面状态：" prop="status">
              <ySelect
                v-model="searchForm.status" 
                :options="statusOptions" :configs="statusConfigs"
                ></ySelect>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="关键字：" prop="keyword">
              <el-input size="small" v-model="searchForm.keyword" placeholder="请输入页面关键字"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="页面路径：" prop="pagePath">
              <el-input size="small" v-model="searchForm.pagePath" placeholder="请输入页面路径"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="3" class=" mt ml-4">
            <el-button type="primary" size="mini" @click="searchSubmit('searchForm')">搜索</el-button>
            <el-button size="mini" @click="resetForm('searchForm')">清空</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="8">
          <div class="btn-wrap mt-2 pb-1">
            <el-button style="margin-left:20px;" @click="addPage()" type="primary" size="mini">新增页面</el-button>
            <el-button @click="delPage()" size="mini">批量删除</el-button>
          </div>
        </el-col>
      </el-row>
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
          label="页面名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="path"
          label="页面路径"
          width="180">
        </el-table-column>
        <el-table-column
          label="所属角色"
          width="180">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.role_type_list" :key="index">{{item.role_type_name}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="cate_name"
          label="角色分类名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="180">
          <template slot-scope="scope">
            <div @click="changeStatus(Number(scope.row.status),scope.row.id)">
              <el-button v-if="scope.row.status==1" class="status" type="success" plain size="small">可用</el-button>
              <el-button v-if="scope.row.status==0" class="status" plain size="small">禁用</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="180">
          <template slot-scope="scope">
            <div>{{scope.row.create_time|formatDate}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          width="180">
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
  <!-- <el-pagination v-show="tableData.length > 0" 
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
  <el-dialog
    :title="dialogPageText"
    :visible.sync="dialogPage"
    :before-close="closeDialogPage"
    width="40%">
    <el-form label-width="110px" 
      :model="pageForm" :rules="pageRules" ref="pageForm" class="pl-7">
      <div class="d-flex">
        <el-form-item 
          v-show="showEdit==false"
          label="页面分类：" prop="roleType" style="width:40%;" required>
          <ySelect
            v-model="pageForm.roleType" 
            :options="pageRoleTypeOptions" :configs="pageRoleTypeConfigs"
            @changeSel="changePageCateSel"></ySelect>
        </el-form-item>
        <el-form-item
          v-show="showEdit==false"
          label="--" prop="pageCate"
          class="merge" style="width:30%;">
          <ySelect
            v-show="pageOptions.length!=0"
            v-model="pageForm.pageCate" 
            :options="pageOptions" :configs="pageConfigs"
            @changeSel="changeCate"
            placeholder="选择页面分类">
          </ySelect>
          <span style="color:#f00;" v-show="pageOptions.length==0">该场景仍未有有效分类</span>
        </el-form-item>
        <div class="edit d-flex" v-show="editBtn">
          <el-form-item label="当前页面分类：" v-show="!showEditBtnCate">
            <span style="font-weight:bold;">{{showEditPageText}}</span>
          </el-form-item>
          <el-button v-show="!showEditBtnCate" style="margin-left:30px;margin-top:-25px;" 
            type="text" size="mini" @click="editBtnCate('edit')">修改</el-button>
          <el-button v-show="showEditBtnCate" style="margin-left:30px;margin-top:-25px;" 
            type="text" size="mini" @click="editBtnCate()">取消</el-button>
        </div>
      </div>
      <el-form-item label="页面名称：" prop="name">
        <el-input size="small" class="item-input" v-model="pageForm.name" placeholder="请输入页面名称"></el-input>
      </el-form-item>
      <el-form-item label="页面路径：" prop="path">
        <el-input size="small" class="item-input" v-model="pageForm.path" placeholder="请输入页面路径"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-radio-group v-model="pageForm.status">
          <el-radio label="1">可用</el-radio>
          <el-radio label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogPage = false">取 消</el-button>
      <el-button size="small" type="primary" @click="submitEditPage('pageForm')">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import ySelect from '@/components/ySelect/index'
import actions from './actions/specPage'
export default {
  data(){
    return {
      specName:'',
      specRoleList:[],
      showEditBtnCate:false,
      selection:[],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
      pageId:'',
      cateId:'',
      options:[],
      configs:{
        // clearable:true
      },
      pageTypeOptions:[],
      pageTypeConfigs:{},
      pageOptions:[],
      pageConfigs:{},
      pageRoleTypeOptions:[],
      pageRoleTypeConfigs:{},
      searchForm:{
        roleType:-2,
        status:'-1',
        pageType:'',
        keyword:'',
      },
      searchRules:{

      },
      statusOptions:[
        { label:'全部',value:'-1' },
        { label:'可用',value:'1' },
        { label:'禁用',value:'0' },
      ],
      statusConfigs:{},
      tableData:[],
      dialogPageText:'新增',
      dialogPage:false,
      pageForm:{
        roleType:-1,
        pageCate:null,
        name:'',
        path:'',
        status:'1'
      },
      pageRules:{
        name:[
          {required: true, message: '请输入页面名称',trigger:'blur'}
        ],
        path:[
          {required: true, message: '请输入页面路径',trigger:'blur'}
        ],
        // pageCate:[
        //   {required: true, message: '请选择页面分类',trigger:'blur'}
        // ]
      },
      showEdit:false,
      editBtn:false,
      showEditPageText:'',
      cateId:this.$route.query.cateId
    }
  },
  created(){
    // console.log(this.cateId)
    this.GetRoleType().then(()=>{
      this.getList()
      // this.getPageCates()
    })
    this.getSpecDetail()
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
    getSpecDetail(){
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.System.GetCateInfoById,{
        id:_this.cateId,
        token:_this.$utils.getToken()
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          // console.log(data)
          _this.specRoleList = data.role_type_list
          _this.specName = data.name
        }
      })
    },
    ...actions
  },
  components:{
    ySelect
  }
}
</script>
<style lang="less" scoped>
.wrap{
  box-shadow:0px 0px 5px 0px rgba(34,36,47,0.1);
}
.content{
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  // .btn-wrap{
  //   background: #fff;
  //   padding: 10px;
  //   margin-bottom: 10px;
  // }
  .search{
    background: #fff;
    padding: 20px 10px 10px 10px;
    .search-input{
      width: 250px;
    }
  }
  .fr{
    float: right !important;
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
.item-input{
  width: 65%;
}
.bread{
  font-size: 12px !important;
}
</style>