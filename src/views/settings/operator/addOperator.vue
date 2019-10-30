<template>
  <div class="content bg-white rounded box-shadow-page p-1">
    <div class=" bg-gray rounded p-1">
      <div class=" bg-white py-2 rounded">
        <el-form
          :model="ruleForm" :rules="rules" 
          ref="ruleForm" label-width="120px">
          <el-form-item label="账户名称" prop="accountName" class="ruleInput">
            <el-input size="small" v-model="ruleForm.accountName" placeholder="请输入操作员账户名称"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name" class="ruleInput">
            <el-input size="small" v-model="ruleForm.name" placeholder="请输入操作员姓名"></el-input>
          </el-form-item>
          <el-form-item label="操作员编号" prop="numbers" class="ruleInput">
            <el-input size="small" v-model="ruleForm.numbers" placeholder="请输入操作员编号"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone" class="ruleInput">
            <el-input size="small" v-model="ruleForm.phone" placeholder="请输入操作员手机号"></el-input>
          </el-form-item>
          <el-form-item label="账户密码" prop="pass" class="ruleInput">
            <el-input size="small" v-model="ruleForm.pass" placeholder="请输入操作员账户密码"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="ruleForm.status">
              <el-radio label="1">显示</el-radio>
              <el-radio label="0">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom position-fixed">
      <el-button class="bottom-btn" @click="goBackList" size="small">取消</el-button>
      <el-button class="bottom-btn" @click="submitManage('ruleForm')" size="small" type="primary">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      ruleForm:{
        accountName:'',
        name:'',
        numbers:'',
        phone:'',
        pass:'',
        status:'1'
      },
      rules:{
        accountName:[
          {required: true, message: '请输入操作员账户名称'}
        ],
        name:[
          {required: true, message: '请输入操作员姓名'}
        ],
        phone:[
          {required: true, message: '请输入操作员手机号'}
        ],
        pass:[
          {required: true, message: '请输入操作员账户密码'}
        ],
        status:[
          {required: true, message: '请选择状态'}
        ]
      }
    }
  },
  created(){

  },
  methods:{

  }
}
</script>
<style lang="less" scoped>

.bottom{
  position: fixed;
  bottom: 0;
  left: 262px;
  width: calc(100% - 140px);
  padding: 10px 0;
  text-align: center;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px 5px 0 0;
}
</style>