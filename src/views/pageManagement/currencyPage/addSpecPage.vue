<template>
  <div class="bg-white py-2 px-1 rounded wrap box-shadow-page pb-5">
    <yTitle>新增页面</yTitle>    
    <div class="content bg-gray mt-2 p-1 rounded">
      <!-- form开始 -->
      <div class="form-wrap bg-white pt-3 rounded">
        <el-form :model="ruleForm" :rules="rules" 
          ref="ruleForm" label-width="150px" class=" pb-3">
          <!-- 新增 -->
          <div v-if="isEdit==false">
            <el-form-item label="当前页面分类" prop="specType" required>
              <span>{{ruleForm.specType}}</span>
            </el-form-item>
          </div>
          <!-- 新增end -->
          <!-- 编辑 -->
          <div class="d-flex" v-if="isEdit==true">
            <el-form-item label="当前页面分类" prop="specType" required v-show="!editSpec">
              <span>{{ruleForm.specType}}</span>
            </el-form-item>
            <div class="d-flex" v-show="editSpec">
              <el-form-item label="页面分类" prop="roleType" required>
                <ySelect
                v-model="ruleForm.roleType" 
                :options="ruleRoleTypeOptions"
                @changeSel="changePageCateSel" placeholder="选择适用场景"></ySelect>
              </el-form-item>
              <el-form-item label="--" prop="pageType" class="merge">
                <ySelect
                  v-model="ruleForm.pageType" 
                  :options="pageTypeOptions"
                  @changeSel="changePageSel"
                  placeholder="选择页面分类"></ySelect>
              </el-form-item>
            </div>
            <div class="btn-wrap">
              <el-button type="text" v-show="!editSpec" @click="editSpecFun()">修改</el-button>
              <el-button type="text" v-show="editSpec" @click="cancelSpec()">取消</el-button>
            </div>
          </div>
          <!-- 编辑end -->
          <el-form-item label="页面名称" prop="name" style="width:40%;">
            <el-input size="small" class="item" 
              v-model="ruleForm.name" placeholder="请输入页面名称"
              maxlength="60" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="页面类型" prop="type" class="hideradio">
            <el-radio-group v-model="ruleForm.type">
              <el-radio :label="1">
                <div class="wrap-item p-1" :class="{'border-blue-solid':ruleForm.type=='1'}">
                  <div class="img">
                    <img src="../../../assets/weimeng.png" alt="">
                  </div>
                  <p class="desc mt-1">通用列表</p>
                </div>
              </el-radio>
              <el-radio :label="2">
                <div class="wrap-item p-1" :class="{'border-blue-solid':ruleForm.type=='2'}">
                  <div class="img">
                    <img src="../../../assets/weimeng.png" alt="">
                  </div>
                  <p class="desc mt-1">通用详情</p>
                </div>
              </el-radio>
              <el-radio :label="3">
                <div class="wrap-item p-1" :class="{'border-blue-solid':ruleForm.type=='3'}">
                  <div class="img">
                    <img src="../../../assets/weimeng.png" alt="">
                  </div>
                  <p class="desc mt-1">通用表单</p>
                </div>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="页面路径" prop="pageUrl" style="width:40%;">
            <el-input size="small" class="item" 
              v-model="ruleForm.pageUrl" placeholder="请输入页面路径"></el-input>
          </el-form-item>
          <el-form-item label="Apiurl" prop="Apiurl" style="width:40%;">
            <el-input size="small" class="item" 
              v-model="ruleForm.Apiurl" placeholder="请输入Apiurl"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="ruleForm.status">
              <el-radio label="1">显示</el-radio>
              <el-radio label="0">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <!-- form end -->
    </div>
    <div class="footer py-2 bg-white">
      <el-button size="mini" style="padding:7px 35px;">取消</el-button>
      <el-button size="mini" type="primary">保存并下一步</el-button>
    </div>
  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'

export default {
  data(){
    return {
      isEdit:true,
      editSpec:false,
      ruleForm:{
        specType:'',//用于展示数据
        pageType:'',//用于编辑
        name:'',
        type:'1',
        Apiurl:'',
        pageUrl:'',
        status:'1',
        roleType:''
      },
      ruleRoleTypeOptions:[],
      pageTypeOptions:[],
      rules:{
        name:[
          {required: true, message: '请输入页面名称'}
        ],
        type:[
          {required: true, message: '请选择页面类型'}
        ],
        Apiurl:[
          {required: true, message: '请输入Apiurl'}
        ],
        pageUrl:[
          {required: true, message: '请输入Apiurl'}
        ],
        status:[
          {required: true, message: '请选择页面状态'}
        ],
      }
    }
  },
  created(){
    // this.isEdit = true
  },
  methods:{
    changePageCateSel(){

    },
    changePageSel(){

    },
    editSpecFun(){
      this.editSpec = true
    },
    cancelSpec(){
      this.editSpec = false
    }
  },
  components:{
    ySelect
  }
}
</script>
<style lang="less" scoped>
.wrap-item{
  border: 1px solid transparent;
  .img{
    width: 100px;
    height: 50px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .desc{
    text-align: center;
  }
}
.border-blue-solid{
  border: 1px solid #2589FF;
}
.footer{
  width: calc(100% - 274px);
  position: fixed;
  left: 263px;
  bottom: 0;
  box-shadow:0px 0px 3px 0px rgba(34,36,47,0.1);
  border-radius: 10px 10px 0 0;
  text-align: center;
}
</style>
<style lang="less">
.wrap{
  .hideradio{
    .el-radio__input{
      visibility: hidden !important;
    }
  }
}
</style>