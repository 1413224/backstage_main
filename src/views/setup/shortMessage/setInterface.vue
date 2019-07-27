<template>
  <div class="setInterface-wrapper">
    <div class="toptip"></div>
    <div class="content">
      <el-form 
        :model="interfaceForm" 
        :rules="interfaceFormRules" 
        ref="interfaceForm"
        label-width="180px"
        class="interfaceForm">
        <div class="item">
          <div class="head">
              <span class="lab"></span>
            <span class="headcont">
              <span class="tittext">阿里云短信(新版)</span>
              <span class="apply">立即申请</span>
              <el-switch @change="changeAliyun" v-model="interfaceForm.aliyunNew" class="fr"></el-switch>
            </span>
          </div>
          <div v-if="interfaceForm.aliyunNew">
            <el-form-item label="Access Key ID：" prop="aliyunAccessKeyID">
              <el-input v-model="interfaceForm.aliyunAccessKeyID" placeholder="请输入Access Key ID"></el-input>
            </el-form-item>
            <el-form-item label="Access Key Secret：" prop="aliyunAccessKeySecret">
              <el-input v-model="interfaceForm.aliyunAccessKeySecret" placeholder="请输入Access Key Secret"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="item">
          <div class="head">
              <span class="lab"></span>
            <span class="headcont">
              <span class="tittext">聚合数据</span>
              <span class="apply">立即申请</span>
              <el-switch @change="changeJuhe" v-model="interfaceForm.juhe" class="fr"></el-switch>
            </span>
          </div>
          <div v-if="interfaceForm.juhe">
            <el-form-item label="App Key：" prop="juhekey">
              <el-input v-model="interfaceForm.juhekey" placeholder="请输入App Key"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="item">
          <div class="head">
              <span class="lab"></span>
            <span class="headcont">
              <span class="tittext">互亿无线</span>
              <span class="apply">立即申请</span>
              <el-switch @change="changeHuyi" v-model="interfaceForm.huyi" class="fr"></el-switch>
            </span>
          </div>
          <div v-if="interfaceForm.huyi">
            <el-form-item label="App Key：" prop="huyiAppkey">
              <el-input v-model="interfaceForm.huyiAppkey" placeholder="请输入App Key"></el-input>
            </el-form-item>
            <el-form-item label="App ID：" prop="huyiAppID">
              <el-input v-model="interfaceForm.huyiAppID" placeholder="请输入App ID"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="item">
          <div class="head">
              <span class="lab"></span>
            <span class="headcont">
              <span class="tittext">有容联云</span>
              <span class="apply">立即申请</span>
              <el-switch @change="changeYuntongxun" v-model="interfaceForm.yuntongxun" class="fr"></el-switch>
            </span>
          </div>
          <div v-if="interfaceForm.yuntongxun">
            <el-form-item label="App Key：" prop="yuntongxunAppID">
              <el-input v-model="interfaceForm.yuntongxunAppID" placeholder="请输入App ID"></el-input>
            </el-form-item>
            <el-form-item label="Account SID：" prop="yuntongxunAccountSID">
              <el-input v-model="interfaceForm.yuntongxunAccountSID" placeholder="请输入Account SID"></el-input>
            </el-form-item>
            <el-form-item label="Account Token：" prop="yuntongxunAccountToken">
              <el-input v-model="interfaceForm.yuntongxunAccountToken" placeholder="请输入Account Token"></el-input>
            </el-form-item>
          </div>
        </div>
         <el-button @click="saveConfig('interfaceForm')" type="primary" style="margin-left:50px;margin-top:30px;">保存</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import actions from './actions/setInterface'
export default {
  data(){
    return {
      interfaceForm:{
        aliyunNew:true,
        aliyunAccessKeyID:'',
        aliyunAccessKeySecret:'',
        juhekey:'',
        juhe:true,
        huyi:true,
        huyiAppkey:'',
        huyiAppID:'',
        yuntongxun:true,
        yuntongxunAppID:'',
        yuntongxunAccountSID:'',
        yuntongxunAccountToken:''
      },
      interfaceFormRules:{
        aliyunAccessKeyID:[{required: true, message: '请输入Access Key ID', trigger: 'blur'}],
        aliyunAccessKeySecret:[{required: true, message: '请输入Access Key Secret', trigger: 'blur'}],
        juhekey:[{required: true, message: '请输入App Key', trigger: 'blur'}],
        huyiAppkey:[{required: true, message: '请输入App Key', trigger: 'blur'}],
        huyiAppID:[{required: true, message: '请输入App ID', trigger: 'blur'}],
        yuntongxunAppID:[{required: true, message: '请输入App ID', trigger: 'blur'}],
        yuntongxunAccountSID:[{required: true, message: '请输入Account SID', trigger: 'blur'}],
        yuntongxunAccountToken:[{required: true, message: '请输入Account Token', trigger: 'blur'}],
      }
    }
  },
  created(){
    this.getConfig()
  },
  methods:{
    ...actions
  }
}
</script>
<style lang="less" scoped>
@import url('./styles/setInterface.less');
</style>
<style lang="less">
.interfaceForm{
  .el-input{
    width: 80%;
    .el-input__inner{
      height: 34px;
      line-height: 34px;
    }
  }
  .el-form-item__label{
    // line-height: 34px;
    color: #333;
    font-weight: bold;
  }
}
</style>

