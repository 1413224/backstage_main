<template>
<div>
  <yTitle>系统页面</yTitle>
  <div class="content bg-gray">
    <div class="search">
      <el-form
        :model="searchForm" 
        :rules="searchRules" 
        ref="searchForm" 
        label-width="110px"
        class="">
        <el-row>
          <el-col :span="6">
            <el-form-item label="角色类型：" prop="roleType">
              <ySelect
                v-model="searchForm.roleType" 
                :options="options" :configs="configs"
                @changeSel="changeSel"></ySelect>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="页面分类：" prop="pageType">
              <ySelect
                v-model="searchForm.pageType" 
                :options="pageTypeOptions" :configs="pageTypeConfigs"
                @changeSel="changePageSel"></ySelect>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="页面状态：" prop="status">
              <ySelect
                v-model="searchForm.status" 
                :options="statusOptions" :configs="statusConfigs"
                ></ySelect>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关键字：" prop="keyword">
              <el-input size="small" v-model="searchForm.keyword" placeholder="请输入页面关键字"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="页面路径：" prop="pagePath">
              <el-input size="small" v-model="searchForm.pagePath" placeholder="请输入页面路径"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="4">
            <div class="btn-wrap">
              <el-button style="margin-left:20px;" @click="addPage()" type="primary" plain size="small">新增页面</el-button>
              <el-button @click="delPage()" type="danger" plain size="small">批量删除</el-button>
            </div>
          </el-col>
          <el-col :span="3" class="fr">
            <el-button size="small" @click="resetForm('searchForm')">清空</el-button>
            <el-button type="primary" size="small" @click="searchSubmit('searchForm')">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
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
              <el-button v-if="scope.row.status==1" class="status" type="success" size="small">可用</el-button>
              <el-button v-if="scope.row.status==0" class="status" type="danger" size="small">禁用</el-button>
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

    <el-dialog
    :title="dialogPageText"
    :visible.sync="dialogPage"
    :before-close="closeDialogPage"
    width="40%">
      <el-form label-width="110px" :model="pageForm" :rules="pageRules" ref="pageForm">
        <el-form-item label="页面分类：" v-show="showEdit || editBtn">
          <span>{{showEditPageText}}</span>
          <el-button v-show="!showEditBtnCate" style="margin-left:30px;" size="mini" @click="editBtnCate('edit')">修改</el-button>
          <el-button v-show="showEditBtnCate" style="margin-left:30px;" size="mini" @click="editBtnCate()">取消</el-button>
        </el-form-item>
        <el-form-item 
          v-show="showEdit==false"
          label="适用场景：" prop="roleType">
          <ySelect
            v-model="pageForm.roleType" 
            :options="pageRoleTypeOptions" :configs="pageRoleTypeConfigs"
            @changeSel="changePageCateSel"></ySelect>
        </el-form-item>
        <el-form-item
          v-show="showEdit==false"
           label="页面分类：" prop="roleType">
          <ySelect
            v-show="pageOptions.length!=0"
            v-model="pageForm.pageCate" 
            :options="pageOptions" :configs="pageConfigs"
            @changeSel="changeCate">
          </ySelect>
          <span style="color:#f00;" v-show="pageOptions.length==0">该适用场景暂无页面分类，请选择其他适用场景</span>
        </el-form-item>
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
</div>
</template>
<script>
import ySelect from '@/components/ySelect/index'
import actions from './actions/systemPage'
export default {
  data(){
    return {
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
        ]
      },
      showEdit:false,
      editBtn:false,
      showEditPageText:''
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
      this.$refs[formName].validate((valid)=>{
        if(!valid){
          return false
        }
        this.getList()
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
    padding: 10px;
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
</style>