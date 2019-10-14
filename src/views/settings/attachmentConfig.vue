<template>
  <div class="bg-white py-2 px-1 rounded wrap">
    <yTitle>远程附件管理</yTitle>
    <div class="content bg-gray px-1 py-1 mt-2 rounded">
      <div class="head bg-white p-1 rounded">
        <div class="tit">基本设置</div>
        <div class="head-search mt">
          <el-row class="mt-2">
            <el-col>
              <el-radio-group v-model="platformRadio">
                <el-radio
                  v-for="(item,index) in attachmentTypeLabels"
                  :key="index"
                 :label="item.key">{{item.title}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row class="mt-2">
            <el-col>
              <el-button size="small" type="primary" @click="changeRoleInfo()">保存</el-button>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 表格设置 -->
      <div class="table-wrap mt-1 rounded">
        <div class="table-search bg-white py-1">
          <el-form
            :model="searchForm"
            :rules="searchRules"
            ref="searchFrom"
            label-width="110px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="关键字：" prop="keyword">
                  <el-input size="small" v-model="searchForm.keyword" placeholder="请输入关键字"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="状态：" prop="status">
                  <ySelect
                    v-model="searchForm.status" 
                    :options="statusOptions" :configs="statusConfigs"
                    ></ySelect>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="pl-2">
              <el-col :span="4">
                <el-button style="margin-left:20px;" @click="addConfig()" type="primary" plain size="small">新增页面</el-button>
                <!-- <el-button @click="delConfig()" type="danger" plain size="small">批量删除</el-button> -->
              </el-col>
              <el-col :span="4" style="float:right">
                <el-button size="small" @click="resetForm('searchFrom')">清空</el-button>
                <el-button type="primary" size="small" @click="searchSubmit('searchFrom')">搜索</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 表格开始 -->
        <div class="table-wrap mt-1 rounded bg-white pb-2">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="配置名称"
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
              label="操作">
              <template slot-scope="scope">
                <el-button @click="editManage(scope.row.id,scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="delManage(scope.row.id)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 表格end -->
      </div>
      <!-- 表格设置end -->
    </div>
    <el-pagination v-show="tableData.length > 0" 
      ref="paging" 
      class="pagination mt-2"
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
    <!-- 弹框开始 -->
    <el-dialog
      :title="dialogPageText"
      :visible.sync="dialogPage"
      :before-close="closeDialogPage"
      width="40%">
      <el-form label-width="160px" :model="dialogForm" :rules="dialogRules" ref="dialogForm">
        <el-form-item label="配置名称：" prop="name">
          <el-input class="item-input" size="small" placeholder="请输入配置名称" v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="access key：" prop="accessKey">
          <el-input class="item-input" size="small" placeholder="请输入access key" v-model="dialogForm.accessKey"></el-input>
        </el-form-item>
        <el-form-item label="secret key：" prop="secretKey">
          <el-input class="item-input" size="small" placeholder="请输入secret key" v-model="dialogForm.secretKey"></el-input>
        </el-form-item>
        <el-form-item label="space bucket：" prop="spaceBucket">
          <el-input class="item-input" size="small" placeholder="请输入space bucket" v-model="dialogForm.spaceBucket"></el-input>
        </el-form-item>
        <el-form-item label="space host：" prop="spaceHost">
          <el-input class="item-input" size="small" placeholder="请输入space host" v-model="dialogForm.spaceHost"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio-group v-model="dialogForm.status">
            <el-radio label="1">可用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogPage = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm('dialogForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹框end -->
  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'
// import upLoadPicture from '@/components/uploadPicture/uploadPicture'
import actions from './actions/attachmentConfig'
export default {
  data(){
    return {
      attachmentTypeLabels:[],
      platformRadio:null,
      searchForm:{
        keyword:'',
        status:'-1'
      },
      searchRules:{

      },
      statusConfigs:{},
      statusOptions:[
        { label:'全部',value:'-1' },
        { label:'可用',value:'1' },
        { label:'禁用',value:'0' },
      ],
      tableData:[
        // {}
      ],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
      dialogPageText:'新增',
      configId:null,
      dialogPage:false,
      dialogForm:{
        status:'1',
        name:'',
        accessKey:'',
        secretKey:'',
        spaceBucket:'',
        spaceHost:''
      },
      dialogRules:{
        name:[
          {required: true, message: '请输入配置名称',trigger:'blur'}
        ],
        accessKey:[
          {required: true, message: '请输入access key',trigger:'blur'}
        ],
        secretKey:[
          {required: true, message: '请输入secret key',trigger:'blur'}
        ],
        spaceBucket:[
          {required: true, message: '请输入space bucket',trigger:'blur'}
        ],
        spaceHost:[
          {required: true, message: '请输入space host',trigger:'blur'}
        ]
      }
    }
  },
  created(){
    let _this = this
    _this.GetAttachmentTypeLabels().then(()=>{
      _this.GetRoleCommonSettingInfo().then(()=>{
        _this.getList()
      })
    })
  },
  methods:{
    ...actions,
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
    }
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
.pagination{
  text-align: right;
}
.item-input{
  width: 65%;
}
.status{
  padding: 5px;
}
</style>