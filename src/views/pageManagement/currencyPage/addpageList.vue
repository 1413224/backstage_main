<template>
  <div class="bg-white py-2 px-1 rounded wrap box-shadow-page">
    <yTitle>新增列表</yTitle>
    <div class="content bg-gray rounded mt-2 p-1">
      <div class="form-wrap bg-white pt-3">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
          <el-form-item label="页面标题" prop="name">
            <el-input size="small" class="item" 
              v-model="ruleForm.name" placeholder="请输入标题"
              maxlength="60" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="页面类型" prop="type">
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
          <el-form-item label="Apiurl" prop="Apiurl">
            <el-input size="small" class="item" 
              v-model="ruleForm.Apiurl" placeholder="请输入Apiurl"></el-input>
          </el-form-item>
          <el-form-item label="申请信息" prop="info">
            <el-input size="small" class="item" 
              v-model="ruleForm.info" placeholder="请输入..." 
              type="textarea"
              :rows="4"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer py-2 bg-white">
      <el-button size="mini" style="padding:7px 35px;">取消</el-button>
      <el-button size="mini" type="primary">保存并下一步</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      ruleForm:{
        name:'',
        Apiurl:'',
        info:'',
        type:1
      },
      rules:{
        name:[
          {required: true, message: '请输入页面标题'}
        ],
        Apiurl:[
          {required: true, message: '请输入Apiurl'}
        ],
        info:[
          {required: true, message: '请输入申请信息'}
        ],
        type:[
          {required: true, message: '请选择页面类型'}
        ]
      }
    }
  },
  created(){

  }
}
</script>
<style lang="less" scoped>
.item{
  width: 400px;
}
.form-wrap{
  padding-bottom: 100px;
}
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
  .el-radio__input{
    visibility: hidden !important;
  }
}

</style>